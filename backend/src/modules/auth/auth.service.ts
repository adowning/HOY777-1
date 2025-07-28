import {
  authSessions, balances, db, deposits, inviteStats,
  selectUsersSchema, transactions,
  userRewards, users
} from '#/db'
import { env } from '#/env'
import { getGameSessionFromCache } from '#/lib/cache'
import { eq } from 'drizzle-orm'
import * as jose from 'jose'
import { z } from 'zod'
import { endAndPersistGameSession } from '../session/session.service'

const ACCESS_TOKEN_EXPIRES_IN = '7 days'
const REFRESH_TOKEN_EXPIRES_IN = '7 days'

export const login = async (
  username: string,
  password: string,
  uid?: string
) => {
  if (!username && !uid) {
    throw new Error('Username or UID is required')
  }
  
  let userRecord
  try {
    if (username) {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1)
      userRecord = result[0]
    } else if (uid) {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, uid))
        .limit(1)
      userRecord = result[0]
    }
  } catch (error) {
    console.error('Error querying user:', error)
    throw new Error('Failed to query user')
  }
  if (!userRecord || !userRecord.passwordHash) {
    throw new Error('Invalid credentials - user does not exist')
  }
  const isPasswordValid = await Bun.password.verify(
    password,
    userRecord.passwordHash
  )

  if (!isPasswordValid) {
    throw new Error('Invalid credentials - password')
  }

  const [authSession] = await db.insert(authSessions).values({
    userId: userRecord.id,
    status: 'ACTIVE',
  }).returning();

  const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
  const accessToken = await new jose.SignJWT({ userId: userRecord.id, sessionId: authSession.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRES_IN)
    .sign(secret)

  const refreshToken = await new jose.SignJWT({ userId: userRecord.id, sessionId: authSession.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRES_IN)
    .sign(secret)
    
  delete userRecord.passwordHash
  const user = userRecord // z.object(selectUsersSchema).parse(userRecord)

  return { accessToken, refreshToken, user }
}

export const logout = async (authSessionId: string) => {
  await db.update(authSessions).set({ status: 'ENDED' }).where(eq(authSessions.id, authSessionId));
  const gameSession = getGameSessionFromCache(authSessionId);
  if (gameSession) {
    await endAndPersistGameSession(gameSession.id);
  }
};

export const signup = async (username: string, password: string) => {
  const passwordHash = await Bun.password.hash(password, 'bcrypt')
  const initialDepositAmount = 500 // 500 cents

  try {
    const result = await db.transaction(async (tx) => {
      const existingUser = await tx.query.users.findFirst({
        where: eq(users.username, username),
      })

      if (existingUser) {
        tx.rollback()
        throw new Error('User with this username already exists')
      }

      const [newUser] = await tx
        .insert(users)
        .values({
          username,
          passwordHash,
          inviteCode: crypto.randomUUID().slice(0, 8),
          inviteUrl: `/invite/${username}`,
        })
        .returning()

      const userId = newUser.id

      await tx.insert(balances).values({
        userId,
        amount: initialDepositAmount,
        availableBalance: initialDepositAmount,
        currency: 'USD',
        real: String(initialDepositAmount),
        bonus: '0',
      })

      await tx.insert(deposits).values({
        userId,
        amount: initialDepositAmount,
        status: 'completed',
        note: 'Initial sign-up bonus',
        currency: 'USD',
      })

      await tx.insert(transactions).values({
        userId,
        amount: initialDepositAmount,
        type: 'deposit',
        status: 'completed',
        note: 'Initial sign-up bonus',
        balance: initialDepositAmount,
      })

      await tx.insert(userRewards).values({ userId })
      await tx.insert(inviteStats).values({ userId })

      const user = z.object(selectUsersSchema.shape).parse(newUser)
      return { user }
    })

    const { user } = result

    const [authSession] = await db.insert(authSessions).values({
      userId: user.id,
      status: 'ACTIVE',
    }).returning();

    const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
    const accessToken = await new jose.SignJWT({ userId: user.id, sessionId: authSession.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(ACCESS_TOKEN_EXPIRES_IN)
      .sign(secret)

    const refreshToken = await new jose.SignJWT({ userId: user.id, sessionId: authSession.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(REFRESH_TOKEN_EXPIRES_IN)
      .sign(secret)

    return { accessToken, refreshToken, user }
  } catch (error) {
    console.error('Signup Transaction Failed:', error)
    return { error: (error as Error).message }
  }
}