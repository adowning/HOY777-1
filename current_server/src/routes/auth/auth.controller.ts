import type { Context } from 'hono'
import { setCookie } from 'hono/cookie'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

import db from '#/db'
import type { Newusers, UserType } from '#/db/schema'
import { userResponseSchema } from '#/db/schema'
import { users } from '#/db/schema/schema'
import env from '#/env'
import { SessionManager } from '#/lib/session.manager'
import type { AppRouteHandler } from '#/lib/types'
import { eq } from 'drizzle-orm'
import * as jose from 'jose'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import type { LoginRoute, SessionRoute, SignUpRoute } from './auth.router'
import * as service from './auth.service'

const ACCESS_TOKEN_EXPIRES_IN = '7 days'

export const login: AppRouteHandler<LoginRoute> = async (c) => {
    const { username, password, uid } = c.req.valid('json')
    if (!password || !username || !uid) {
        return c.json(
            {
                message: HttpStatusPhrases.BAD_REQUEST,
            },
            HttpStatusCodes.BAD_REQUEST
        )
    }
    let userRecord: UserType | undefined
    try {
        if (username) {
            userRecord = await db.query.users.findFirst({
                where: eq(users.username, username),
            })
        } else if (uid) {
            userRecord = await db.query.users.findFirst({ where: eq(users.id, uid) })
        }
    } catch (error) {
        console.error('Error querying user:', error)
        return c.json(
            {
                message: HttpStatusPhrases.BAD_REQUEST,
            },
            HttpStatusCodes.BAD_REQUEST
        )
    }

    if (!userRecord?.passwordHash) {
        return c.json(
            {
                message: HttpStatusPhrases.BAD_REQUEST,
            },
            HttpStatusCodes.BAD_REQUEST
        )
    }

    const isPasswordValid = await Bun.password.verify(
        password,
        userRecord.passwordHash
    )
    if (!isPasswordValid) {
        return c.json(
            {
                message: HttpStatusPhrases.BAD_REQUEST,
            },
            HttpStatusCodes.BAD_REQUEST
        )
    }

    const authSession = await SessionManager.startAuthSession(userRecord)

    const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
    const accessToken = await new jose.SignJWT({
        userId: userRecord.id,
        sessionId: authSession.id,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(ACCESS_TOKEN_EXPIRES_IN)
        .sign(secret)

    setCookie(c, 'access_token', accessToken, {
        path: '/',
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // const user: any = { ...userRecord, passwordHash: null }
    // user.avatarUrl = user.avatar
    return c.json(userRecord, HttpStatusCodes.OK)
}

export const signup: AppRouteHandler<SignUpRoute> = async (c) => {
    const { username, password } = await c.req.json<{
        username?: string
        password?: string
    }>()

    if (!username || !password) {
        // return c.json({ error: 'Username and password are required.' }, 400)
        return c.json(
            {
                message: HttpStatusPhrases.BAD_REQUEST,
            },
            HttpStatusCodes.BAD_REQUEST
        )
    }

    // const result = await service.signup(username, password)
    const user: UserType | undefined | null = await db.transaction(async (tx) => {
        const passwordHash = await Bun.password.hash(password, 'bcrypt')

        const existingUser = await tx.query.users.findFirst({
            where: eq(users.username, username),
        })

        if (existingUser) {
            // return c.json(
            //     {
            //         message: HttpStatusPhrases.BAD_REQUEST,
            //     },
            //     HttpStatusCodes.BAD_REQUEST
            // )
            return null
        }

        const newUserValues: Newusers = {
            username,
            passwordHash,
            totalXpGained: 0,
            id: ''
        }

        const newUser = await tx
            .insert(users)
            .values(newUserValues)
            .returning()

        return await db.query.users.findFirst({ where: eq(users.id, newUser[0].id) })
    })
    if (!user) {
        return c.json(
            {
                message: HttpStatusPhrases.BAD_REQUEST,
            },
            HttpStatusCodes.BAD_REQUEST
        )
    }
    const authSession = await SessionManager.startAuthSession(user)

    const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
    const accessToken = await new jose.SignJWT({
        userId: user.id,
        sessionId: authSession.id,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(ACCESS_TOKEN_EXPIRES_IN)
        .sign(secret)
    // const { accessToken, user } = result
    setCookie(c, 'access_token', accessToken, {
        path: '/',
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // return c.json(userResponseSchema.parse(user), 201)
    return c.json(user, HttpStatusCodes.CREATED)
}

// export async function session(c: Context): Promise<any> {
export const session: AppRouteHandler<SessionRoute> = async (c) => {
    const user = c.get('user')
    const authSession = c.get('authSession')
    const gameSession = c.get('gameSession')
    const wallet = c.get('wallet')
    const vipInfo = c.get('vipInfo')
    // const operator = c.get('operator')

    return c.json({
        user: userResponseSchema.parse(user),
        authSession,
        gameSession,
        wallet,
        vipInfo,
        // operator,
    }, HttpStatusCodes.OK)
}

export async function logout(c: Context): Promise<any> {
    const authSession = c.get('authSession')
    const user = c.get('user')
    await service.logout(authSession, user.id)

    setCookie(c, 'access_token', '', {
        path: '/',
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'Lax',
        expires: new Date(0),
    })

    return c.json({ message: 'Successfully logged out' })
}
