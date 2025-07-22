import { db } from '#/db'
import {
  users,
  balances,
  deposits,
  transactions,
  userRewards,
  inviteStats,
  selectUsersSchema,
} from '#/db'
import * as jose from 'jose'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { env } from '#/env'

const ACCESS_TOKEN_EXPIRES_IN = '7 days'
const REFRESH_TOKEN_EXPIRES_IN = '7 days'

// This login function seems incomplete and has unresolved dependencies (`desc`, `transactions`, etc.)
// I have left it as-is to focus on the requested signup functionality.
export const login = async (
  username: string,
  password: string,
  uid?: string
) => {
  if (!username && !uid) {
    throw new Error('Username or UID is required')
  }
  
  // Try to find user by username or UID
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

  const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
  // Generate tokens
  const accessToken = await new jose.SignJWT({ userId: userRecord.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRES_IN)
    .sign(secret)

  const refreshToken = await new jose.SignJWT({ userId: userRecord.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRES_IN)
    .sign(secret)

  // The original query had unresolved dependencies (e.g., `activeWallet`, `vipInfo`).
  // Returning the user record directly for now.
  // You may want to expand this query based on your exact needs.
  const user = z.object(selectUsersSchema.shape).parse(userRecord)

  return { accessToken, refreshToken, user }
}

/**
 * Creates a new user and all associated records in a single database transaction.
 * @param username - The user's desired username.
 * @param password - The user's password.
 * @returns An object containing access token, refresh token, and the new user object.
 */
export const signup = async (username: string, password: string) => {
  const passwordHash = await Bun.password.hash(password, 'bcrypt')
  const initialDepositAmount = 500 // 500 cents

  try {
    const result = await db.transaction(async (tx) => {
      // Step 1: Check for existing user with the same username
      const existingUser = await tx.query.users.findFirst({
        where: eq(users.username, username),
      })

      if (existingUser) {
        tx.rollback()
        // We throw an error here, which will be caught by the outer try/catch block.
        // This is a cleaner way to exit the transaction.
        throw new Error('User with this username already exists')
      }

      // Step 2: Create the new user
      const [newUser] = await tx
        .insert(users)
        .values({
          username,
          passwordHash,
          inviteCode: crypto.randomUUID().slice(0, 8), // Generate a random invite code
          inviteUrl: `/invite/${username}`,
        })
        .returning()

      const userId = newUser.id

      // Step 3: Create the user's balance record (wallet)
      await tx.insert(balances).values({
        userId,
        amount: initialDepositAmount,
        availableBalance: initialDepositAmount,
        currency: 'USD',
        real: String(initialDepositAmount),
        bonus: '0',
      })

      // Step 4: Create the initial deposit record
      await tx.insert(deposits).values({
        userId,
        amount: initialDepositAmount,
        status: 'completed',
        note: 'Initial sign-up bonus',
        currency: 'USD',
      })

      // Step 5: Create a corresponding generic transaction record
      await tx.insert(transactions).values({
        userId,
        amount: initialDepositAmount,
        type: 'deposit',
        status: 'completed',
        note: 'Initial sign-up bonus',
        balance: initialDepositAmount,
      })

      // Step 6: Initialize user rewards and stats
      await tx.insert(userRewards).values({ userId })
      await tx.insert(inviteStats).values({ userId })

      // Step 7: Return the newly created user (ensuring no sensitive data is exposed)
      const user = z.object(selectUsersSchema.shape).parse(newUser)
      return { user }
    })

    // If transaction is successful, `result` will contain `{ user }`
    const { user } = result

    // Step 8: Generate JWT tokens
    const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
    const accessToken = await new jose.SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(ACCESS_TOKEN_EXPIRES_IN)
      .sign(secret)

    const refreshToken = await new jose.SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(REFRESH_TOKEN_EXPIRES_IN)
      .sign(secret)

    return { accessToken, refreshToken, user }
  } catch (error) {
    // Log the actual error for debugging and return a user-friendly message
    console.error('Signup Transaction Failed:', error)
    // The error from the transaction (e.g., "User exists") will be propagated here.
    return { error: (error as Error).message }
  }
}