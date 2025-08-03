import type { Context, Next } from 'hono'
import chalk from 'chalk'
import { and, eq } from 'drizzle-orm'
import { getCookie } from 'hono/cookie'
import * as jose from 'jose'

import db from '#/db'
import { AuthSession, User } from '#/db/schema'
import env from '#/env'

export async function authMiddleware(c: Context, next: Next) {
    console.log(chalk.green('--- Auth middleware begin ---'))
    let token: string | undefined
    if (c.req.url.includes('/updates/check')) {
        return next()
    }

    const authHeader = c.req.header('Authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
    }

    if (!token) {
        token = getCookie(c, 'access_token')
    }

    if (!token) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    try {
        const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
        const { payload } = await jose.jwtVerify(token, secret, {
            algorithms: ['HS256'],
        })

        if (!payload || !payload.userId || !payload.sessionId) {
            return c.json({ error: 'Invalid token' }, 401)
        }

        const authSession = await db.query.AuthSession.findFirst({
            where: and(
                eq(AuthSession.id, payload.sessionId as string),
                eq(AuthSession.status, 'ACTIVE')
            ),
        })

        if (!authSession) {
            return c.json({ error: 'Session not found or has expired' }, 401)
        }

        const userId = payload.userId as string
        const [user] = await db
            .update(User)
            .set({
                lastSeen: new Date(),
                currentAuthSessionDataId: authSession.id,
            })
            .where(eq(User.id, userId))
            .returning({ id: User.id })

        if (!user) {
            return c.json({ error: 'User not found' }, 401)
        }

        const userWithRelations = await db.query.User.findFirst({
            where: eq(User.id, user.id),
            with: {
                vipInfo: true,
                activeWallet: {
                    with: {
                        operator: true,
                    },
                },
            },
        })

        if (
            !userWithRelations ||
            !userWithRelations.activeWalletId ||
            !userWithRelations.vipInfoId ||
            !userWithRelations.activeWallet?.operator
        ) {
            return c.json({ error: 'User account is not fully configured.' }, 401)
        }

        c.set('vipInfo', userWithRelations.vipInfo)
        c.set('wallet', userWithRelations.activeWallet)
        c.set('operator', userWithRelations.activeWallet.operator)
        c.set('token', token)
        c.set('authSession', authSession)
        c.set('user', userWithRelations)

        console.log(chalk.green('--- Auth middleware end ---'))
        return next()
    } catch (e) {
        console.error(e)
        return c.json({ error: 'Invalid token' }, 401)
    }
}