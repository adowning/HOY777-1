import { db } from '../../db'
import {
  users,
  balances,
  currencies,
  patchUsersSchema,
  gameHistory,
} from '../../db'
import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from '@hono/zod-openapi'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUserSchema = createInsertSchema(users)

export const findManyUser = async () => {
  return await db.select().from(users)
}

export const createUser = async (data: z.infer<typeof createUserSchema>) => {
  return await db.insert(users).values(data).returning()
}

export const findUserById = async (id: number) => {
  return await db.select().from(users).where(eq(users.id, id))
}

export const updateUser = async (
  id: number,
  data: Partial<z.infer<typeof createUserSchema>>
) => {
  return await db.update(users).set(data).where(eq(users.id, id)).returning()
}

export const deleteUser = async (id: number) => {
  return await db.delete(users).where(eq(users.id, id)).returning()
}

// From Pinia Store & HAR files

export const checkUser = async (userId: number) => {
  // Assuming a simple check that returns the user if they exist
  return await findUserById(userId)
}

export const getUserBalance = async (userId: number) => {
  return await db.select().from(balances).where(eq(balances.userId, userId))
}

export const setUserCurrency = async (userId: number, currencyCode: string) => {
  // This is a simplified example. A real implementation would be more complex.
  const currency = await db
    .select()
    .from(currencies)
    .where(eq(currencies.code, currencyCode))
  if (currency.length === 0) {
    throw new Error('Invalid currency code')
  }
  // Logic to update user's currency preference would go here.
  // For now, we'll just return the currency.
  return currency[0]
}

export const sendEmailVerification = async (userId: number) => {
  // Placeholder for sending a verification email
  console.log(`Sending verification email to user ${userId}`)
  return { status: 'ok', time: Date.now() }
}

export const getUserInfo = async (userId: number) => {
  return await findUserById(userId)
}

export const getVipInfo = async (userId: number) => {
  // Assuming vip info is part of the users table for now
  return await db
    .select({ vipLevel: users.vipLevel })
    .from(users)
    .where(eq(users.id, userId))
}

// New Routes
export const getUserAmount = async () => {
  // Placeholder, you will need to implement the actual logic
  return {
    amount: 1000,
    currency: { fiat: true, name: 'USD', symbol: '$', type: 'fiat' },
    withdraw: 500,
    rate: 1,
  }
}

export const updateUserInfo = async (
  data: z.infer<typeof patchUsersSchema>
) => {
  // Placeholder, you will need to implement the actual logic
  return { ...data }
}

export const updateEmail = async (data: {
  email: string
  password: string
}) => {
  // Placeholder, you will need to implement the actual logic
  return { ...data }
}

export const updatePassword = async (data: {
  now_password: string
  new_password: string
}) => {
  // Placeholder, you will need to implement the actual logic
  console.log(data)
}

export const suspendUser = async (data: { time: number }) => {
  // Placeholder, you will need to implement the actual logic
  console.log(data)
}

export const getBalanceList = async () => {
  return await db.select().from(balances)
}

// Game Routes
export const enterGame = async () => {
  // Placeholder
  return {}
}

export const userGame = async () => {
  // Placeholder
  return []
}

export const favoriteGame = async () => {
  // Placeholder
  return { success: true }
}

export const gameHistory = async () => {
  return await db.select().from(gameHistory) //.where(eq(gameHistory.userId, userId))
}

export const spinPage = async () => {
  // Placeholder
  return {}
}

export const spin = async () => {
  // Placeholder
  return {}
}

export const favoriteGameList = async () => {
  // Placeholder
  return []
}
