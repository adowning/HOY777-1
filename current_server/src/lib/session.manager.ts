/* eslint-disable style/indent-binary-ops */
// src/lib/session.manager.ts
import type { Context } from 'hono'

import chalk from 'chalk'
import { and, eq } from 'drizzle-orm'

import type { AuthSessionType, GameSessionType, UserType } from '#/db/schema'

import db from '#/db'
import { AuthSession, Game, GameSession, GameSpin, User } from '#/db/schema'
import {
    deleteAuthSessionFromCache,
    deleteGameSessionFromCache,
    deleteSpinsFromCache,
    getAuthSessionFromCache,
    getGameSessionFromCache,
    getSpinsFromCache,
    saveAuthSessionToCache,
    saveGameSessionToCache,
} from '#/lib/cache'
import { triggerUserUpdate } from '#/lib/websocket.service'
import { nanoid } from '#/utils/nanoid'

const IDLE_TIMEOUT = 10 * 60 * 1000 // 10 minutes

export class SessionManager {
    static async startAuthSession(user: UserType): Promise<AuthSessionType> {
        const [authSession] = await db
            .insert(AuthSession)
            .values({
                userId: user.id,
                status: 'ACTIVE',
            })
            .returning()
        await saveAuthSessionToCache(authSession)
        return authSession
    }

    static async endAuthSession(
        authSessionId: string,
        userId: string
    ): Promise<void> {
        await db
            .update(AuthSession)
            .set({ status: 'EXPIRED' })
            .where(eq(AuthSession.id, authSessionId))
        await deleteAuthSessionFromCache(authSessionId)
        await this.endCurrentGameSession(userId)
    }

    static async endAllUserSessions(userId: string): Promise<void> {
        console.log(
            chalk.yellow(`Ending all previous sessions for user ${userId}...`)
        )
        await this.endCurrentGameSession(userId)
        const activeSessions = await db
            .select({ id: AuthSession.id })
            .from(AuthSession)
            .where(
                and(
                    eq(AuthSession.userId, userId),
                    eq(AuthSession.status, 'ACTIVE')
                )
            )

        for (const session of activeSessions) {
            await db
                .update(AuthSession)
                .set({ status: 'EXPIRED' })
                .where(eq(AuthSession.id, session.id))
            await deleteAuthSessionFromCache(session.id)
        }
    }

    static async getAuthSession(
        sessionId: string
    ): Promise<AuthSessionType | null> {
        let session: any = await getAuthSessionFromCache(sessionId)
        if (session) {
            return session
        }

        session = await db.query.AuthSession.findFirst({
            where: and(
                eq(AuthSession.id, sessionId),
                eq(AuthSession.status, 'ACTIVE')
            ),
        })

        if (session) {
            await saveAuthSessionToCache(session)
        }

        return session || null
    }

    static async startGameSession(
        c: Context,
        gameName: string
    ): Promise<GameSessionType> {
        const user = c.get('user') as UserType
        const authSession = c.get('authSession') as AuthSessionType

        if (!user || !authSession) {
            throw new Error('User not authenticated.')
        }

        await this.endCurrentGameSession(user.id)

        const game = await db.query.Game.findFirst({
            where: eq(Game.name, gameName),
        })
        if (!game) {
            throw new Error(`Game with name "${gameName}" not found.`)
        }

        const newSessionData: GameSessionType = {
            id: nanoid(),
            userId: user.id,
            authSessionId: authSession.id,
            gameId: game.id,
            status: 'ACTIVE',
            createdAt: new Date(),
            endedAt: null,
            duration: 0,
            totalWagered: 0,
            totalWon: 0,
            rtp: null,
            totalXpGained: 0,
        }

        await db.insert(GameSession).values(newSessionData)
        await db
            .update(User)
            .set({ currentGameSessionDataId: newSessionData.id })
            .where(eq(User.id, user.id))

        await saveGameSessionToCache(newSessionData)
        c.set('user', { ...user, currentGameSessionDataId: newSessionData.id })
        triggerUserUpdate(user.id)

        return newSessionData
    }

    static async endCurrentGameSession(userId: string): Promise<void> {
        const activeSession = await db.query.GameSession.findFirst({
            where: and(
                eq(GameSession.userId, userId),
                eq(GameSession.status, 'ACTIVE')
            ),
        })

        if (!activeSession) {
            return
        }

        const sessionSpins = await getSpinsFromCache(activeSession.id)
        const sessionFromCache =
            (await getGameSessionFromCache(activeSession.id)) || activeSession

        await db.transaction(async (tx) => {
            const now = new Date()
            const finalRtp =
                sessionFromCache.totalWagered > 0
                    ? (sessionFromCache.totalWon /
                          sessionFromCache.totalWagered) *
                      100
                    : 0
            const duration = Math.round(
                (now.getTime() -
                    new Date(sessionFromCache.createdAt).getTime()) /
                    1000
            )

            await tx
                .update(GameSession)
                .set({
                    status: 'COMPLETED',
                    endedAt: now,
                    duration,
                    totalWagered: sessionFromCache.totalWagered,
                    totalWon: sessionFromCache.totalWon,
                    totalXpGained: sessionFromCache.totalXpGained,
                    rtp: finalRtp.toFixed(2),
                })
                .where(eq(GameSession.id, activeSession.id))

            if (sessionSpins.length > 0) {
                const spinsToCreate = sessionSpins.map((spin, i) => ({
                    ...spin,
                    // The spin.id from the cache (provider's roundId) must be preserved
                    // to maintain relations (e.g., to jackpot wins).
                    sessionId: activeSession.id,
                    spinNumber: i + 1,
                    grossWinAmount: spin.grossWinAmount ?? 0,
                    wagerAmount: spin.wagerAmount ?? 0,
                    occurredAt: spin.createdAt ?? new Date(),
                }))
                await tx.insert(GameSpin).values(spinsToCreate)
            }

            await tx
                .update(User)
                .set({ currentGameSessionDataId: null })
                .where(eq(User.id, userId))
        })

        await deleteGameSessionFromCache(activeSession.id)
        await deleteSpinsFromCache(activeSession.id)
        triggerUserUpdate(userId)
    }

    static async getGameSession(
        sessionId: string
    ): Promise<GameSessionType | null> {
        let session: any = await getGameSessionFromCache(sessionId)
        if (session) {
            return session
        }

        session = await db.query.GameSession.findFirst({
            where: eq(GameSession.id, sessionId),
        })

        if (session) {
            await saveGameSessionToCache(session)
        }

        return session || null
    }

    static async handleIdleSession(c: Context): Promise<void> {
        const user = c.get('user') as UserType
        if (!user?.currentGameSessionDataId) {
            return
        }

        const gameSession = await this.getGameSession(
            user.currentGameSessionDataId
        )

        if (gameSession) {
            const now = new Date()
            const lastSeenValue = (gameSession as any).lastSeen
            const lastSeen = lastSeenValue ? new Date(lastSeenValue) : now
            const timeDiff = now.getTime() - lastSeen.getTime()

            if (timeDiff > IDLE_TIMEOUT) {
                await this.endCurrentGameSession(user.id)
                c.set('gameSession', null)
            } else {
                ;(gameSession as any).lastSeen = now
                await saveGameSessionToCache(gameSession)
            }
        }
    }
}
