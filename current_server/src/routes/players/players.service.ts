/* eslint-disable ts/ban-ts-comment */
import type { z } from '@hono/zod-openapi'
import type { createInsertSchema } from 'drizzle-zod'

import { asc, desc, eq } from 'drizzle-orm'

import db from '#/db'
import { User as Player } from '#/db/schema'

import type {
    NewUser as NewPlayer,
} from '../../db/schema'

interface PlayerQuery {
    limit?: number
    offset?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

export async function findManyPlayer(query: PlayerQuery = {}) {
    const { limit = 10, offset = 0, sortBy = 'createdAt', sortOrder = 'desc' } = query

    const sortColumn = Player[sortBy as keyof typeof Player]

    return await db
        .select()
        .from(Player)
        .where(eq(Player.isActive, true))
        .orderBy(sortOrder === 'asc' ? asc(sortColumn) : desc(sortColumn))
        .limit(limit)
        .offset(offset)
}

export async function createPlayer(data: z.infer<ReturnType<typeof createInsertSchema>>) {
    return await db.insert(Player).values(data).returning()
}

export async function findPlayerById(id: string) {
    return await db.select().from(Player).where(eq(Player.id, id)).where(eq(Player.isActive, true))
}

export async function updatePlayer(id: string, data: Partial<NewPlayer>) {
    // @ts-ignore
    return await db.update(Player).set(data).where(eq(Player.id, id)).returning()
}

export async function deletePlayer(id: string) {
    return await db
        .update(Player)
        .set({ isActive: false, deletedAt: new Date() })
        .where(eq(Player.id, id))
        .returning()
}

// From Pinia Store & HAR files

export async function checkPlayer(playerId: string) {
    // Assuming a simple check that returns the player if they exist
    return await findPlayerById(playerId)
}

// export async function getPlayerBalance(playerId: string) {
//   return await db.select().from(balances).where(eq(balances.playerId, playerId));
// }

// export async function setPlayerCurrency(currencyCode: string) {
//   // This is a simplified example. A real implementation would be more complex.
//   const currency = await db
//     .select()
//     .from(currencies)
//     .where(eq(currencies.code, currencyCode));
//   if (currency.length === 0) {
//     throw new Error("Invalid currency code");
//   }
//   // Logic to update player's currency preference would go here.
//   // For now, we'll just return the currency.
//   return currency[0];
// }

export async function sendEmailVerification(playerId: string) {
    // Placeholder for sending a verification email
    console.log(`Sending verification email to player`, playerId)
    return { status: 'ok', time: Date.now() }
}

export async function getPlayerInfo(playerId: string) {
    return await findPlayerById(playerId)
}

export async function getVipInfo(playerId: string) {
    // Assuming vip info is part of the players table for now
    return await db
        .select({ vipInfo: Player.vipInfoId })
        .from(Player)
        .where(eq(Player.id, playerId))
}

// New Routes
export async function getPlayerAmount() {
    // Placeholder, you will need to implement the actual logic
    return {
        amount: 1000,
        currency: { fiat: true, name: 'USD', symbol: '$', type: 'fiat' },
        withdraw: 500,
        rate: 1,
    }
}

export async function updatePlayerInfo(data: NewPlayer) {
    // Placeholder, you will need to implement the actual logic
    return { data }
}

export async function updateEmail(data: {
    email: string;
    password: string;
}) {
    // Placeholder, you will need to implement the actual logic
    return { ...data }
}

export async function updatePassword(data: {
    now_password: string;
    new_password: string;
}) {
    // Placeholder, you will need to implement the actual logic
    console.log(data)
}

export async function suspendPlayer(data: { time: number }) {
    // Placeholder, you will need to implement the actual logic
    console.log(data)
}

// export async function getBalanceList() {
//   return await db.select().from(balances);
// }

// Game Routes
export async function enterGame() {
    // Placeholder
    return {}
}

export async function playerGame() {
    // Placeholder
    return []
}

export async function favoriteGame() {
    // Placeholder
    return { success: true }
}

// export async function getGameHistory(playerId: string) {
//   return await db.select().from(GameHistory).where(eq(gameHistory.playerId, playerId));
// }

export async function spinPage() {
    // Placeholder
    return {}
}

export async function spin() {
    // Placeholder
    return {}
}

export async function favoriteGameList() {
    // Placeholder
    return []
}
