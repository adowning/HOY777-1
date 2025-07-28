import type { ExtractTablesWithRelations } from 'drizzle-orm'
import type { BunSQLQueryResultHKT } from 'drizzle-orm/bun-sql'
import type { PgTransaction } from 'drizzle-orm/pg-core'

import { eq } from 'drizzle-orm'

import type { VipInfoType, VipRankType, } from '#/db'
import type * as schema from '#/db/schema'
import db, { User, VipInfo, VipLevel, VipRank } from '#/db'
import { triggerUserUpdate } from '#/lib/websocket.service'

import { getAllVipLevelConfigurations, getVipLevelByTotalXp, getVipLevelConfiguration } from './vip.config' // Ensure the function is imported

type Transaction = PgTransaction<BunSQLQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>

export interface XpCalculationResult {
    xpGained: number;
    newTotalXp: number;
    newCurrentLevelXp: number;
    levelChanged: boolean;
    newLevel: number;
    oldLevel: number;
}

interface VipDetails {
    info: VipInfoType;
    rank: VipRankType;
    xpForNextLevel: number;
}

// Export the function so the controller can use it
export { getAllVipLevelConfigurations }

export async function getAllVipLevels() {
    return db.query.VipLevel.findMany()
}

export async function getAllVipRanks() {
    return db.query.VipRank.findMany()
}

/**
 * Retrieves a comprehensive overview of a user's VIP status.
 */
export async function getVipDetailsForUser(userId: string): Promise<VipDetails | null> {
    let vipInfo = await db.query.VipInfo.findFirst({ where: eq(VipInfo.userId, userId) })
    if (!vipInfo) {
        vipInfo = await db.transaction(async tx => createDefaultVipInfo(userId, tx))
    }

    const currentRank = await db.query.VipRank.findFirst({
        where: eq(VipRank.id, vipInfo.currentRankid!),
    })

    if (!currentRank) {
        throw new Error(`No matching VIP Rank found for user ${userId}.`)
    }

    const nextLevelData = await db.query.VipLevel.findFirst({
        where: eq(VipLevel.level, vipInfo.level),
    })

    if (!nextLevelData) {
        throw new Error(`XP requirement for level ${vipInfo.level} not found.`)
    }

    return {
        info: vipInfo,
        rank: currentRank,
        xpForNextLevel: nextLevelData.xpForNext,
    }
}

export function calculateXpForWagerAndWins(
    wagerAmount: number,
    winAmount: number,
    vipInfo: VipInfoType
): { baseXp: number; bonusXp: number; totalXp: number } {
    if (wagerAmount <= 0) {
        return { baseXp: 0, bonusXp: 0, totalXp: 0 }
    }

    const levelConfig = getVipLevelConfiguration(vipInfo.level)
    const multiplier = levelConfig?.dailyBonusMultiplier || 1.0
    
    // Base XP is from the wager amount
    const baseXp = Math.floor(wagerAmount * multiplier)
    
    // Bonus XP is based on the win multiplier
    let bonusXp = 0
    const winMultiplier = winAmount / wagerAmount

    if (winMultiplier >= 100) { // Mega Win
        bonusXp = Math.floor(baseXp * 1.00) // 100% bonus
    } else if (winMultiplier >= 50) { // Huge Win
        bonusXp = Math.floor(baseXp * 0.50) // 50% bonus
    } else if (winMultiplier >= 10) { // Big Win
        bonusXp = Math.floor(baseXp * 0.25) // 25% bonus
    }

    // If it was a winning spin, double the base XP
    const totalXp = (winAmount > 0 ? baseXp * 2 : baseXp) + bonusXp

    return { baseXp, bonusXp, totalXp }
}

export async function addXpToUser(userId: string, xpAmount: number): Promise<XpCalculationResult> {
    if (xpAmount <= 0) {
        throw new Error('XP amount must be positive')
    }

    return await db.transaction(async (tx) => {
        let vipInfo = await tx.query.VipInfo.findFirst({ where: eq(VipInfo.userId, userId) })
        if (!vipInfo) {
            vipInfo = await createDefaultVipInfo(userId, tx)
        }

        const oldLevel = vipInfo.level
        const oldTotalXp = vipInfo.totalXp
        const newTotalXp = oldTotalXp + xpAmount

        const newLevelConfig = getVipLevelByTotalXp(newTotalXp)
        const newLevel = newLevelConfig.level
        const newCurrentLevelXp = newTotalXp - newLevelConfig.cumulativeXpToReach

        await tx.update(VipInfo).set({
            totalXp: newTotalXp,
            level: newLevel,
            xp: newCurrentLevelXp,
        }).where(eq(VipInfo.userId, userId))

        const result = {
            xpGained: xpAmount,
            newTotalXp,
            newCurrentLevelXp,
            levelChanged: oldLevel !== newLevel,
            newLevel,
            oldLevel,
        }

        if (result.levelChanged) {
            await applyLevelUpBenefits(userId, newLevel, tx)
        }

        return result
    }).then((result) => {
        triggerUserUpdate(userId)
        return result
    })
}

async function createDefaultVipInfo(userId: string, tx: Transaction): Promise<VipInfoType> {
    const users = await tx.select().from(User).where(eq(User.id, userId)).limit(1)
    if (!users[0]) {
        throw new Error(`User with ID ${userId} not found.`)
    }

    const [newVipInfo] = await tx.insert(VipInfo).values({
        userId,
        level: 1,
        xp: 0,
        totalXp: 0,
    }).returning()

    return newVipInfo
}

async function applyLevelUpBenefits(userId: string, newLevel: number, _tx: Transaction): Promise<void> {
    const levelConfig = getVipLevelConfiguration(newLevel)
    if (!levelConfig)
        return

    // The tx parameter is currently unused, prefixing with _ to satisfy ESLint
    console.log(`User ${userId} has reached level ${newLevel}! Applying benefits.`)
}
