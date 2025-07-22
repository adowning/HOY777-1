import { db } from '#/db'
import {
  vips,
  vipLevels,
  vipTasks,
  vipRebateHistory,
  vipLevelRewardHistory,
  vipTimesHistory,
  vipSigninAwards,
  users,
} from '#/db'
import { eq } from 'drizzle-orm'

// Maps directly to the VipInfo interface on the frontend
export const findVipInfo = async (userId: number) => {
  const user = await db
    .select({ vipLevel: users.vipLevel })
    .from(users)
    .where(eq(users.id, userId))
  if (!user || user.length === 0 || user[0].vipLevel === null) {
    return null // Or a default VIP info object for level 0
  }

  const vipInfo = await db
    .select()
    .from(vips)
    .where(eq(vips.level, user[0].vipLevel))
  if (!vipInfo || vipInfo.length === 0) {
    return null
  }
  // The DB schema for `vips` almost perfectly matches the `VipInfo` interface
  return vipInfo[0]
}

export const findManyVipLevels = async () => {
  return await db.select().from(vipLevels)
}

export const findVipTasks = async (userId: string) => {
  return await db.select().from(vipTasks).where(eq(vipTasks.userId, userId))
}

export const claimVipLevelAward = async () => {
  // This would require logic to check if a user is eligible for a level up award
  // and then update their status to 'claimed'.
  console.log(`User claimed level up award. Implementation needed.`)
  return { success: true, message: 'Award claimed (not implemented)' }
}

export const claimVipRebateAward = async () => {
  // This would calculate and transfer rebate amounts.
  console.log(`User claimed rebate award. Implementation needed.`)
  return { success: true, message: 'Rebate claimed (not implemented)' }
}

export const findVipRebateHistory = async (userId: string) => {
  return await db.select().from(vipRebateHistory).where(eq(vipRebateHistory.userId, userId))
}

export const findVipLevelAwardHistory = async (userId: string) => {
  return await db.select().from(vipLevelRewardHistory).where(eq(vipLevelRewardHistory.userId, userId))
}

export const findVipTimesHistory = async (userId: string) => {
  return await db.select().from(vipTimesHistory).where(eq(vipTimesHistory.userId, userId))
}

export const claimVipSigninRewards = async () => {
  // Logic to check daily sign-in eligibility and grant rewards.
  console.log(`User claimed sign-in rewards. Implementation needed.`)
  return { success: true, message: 'Sign-in reward claimed (not implemented)' }
}

export const findVipSigninList = async (userId: string) => {
  // This should return the list of awards for the user's current VIP level.
  const user = await db.select({ vipLevel: users.vipLevel }).from(users).where(eq(users.id, userId))
  if (!user || user.length === 0 || user[0].vipLevel === null) {
    return []
  }
  // Assuming vipSigninAwards has a level relation, which it currently does not.
  // This will require a schema change to be fully implemented.
  return await db.select().from(vipSigninAwards)
}

export const receiveVipSigninAward = async () => {
  console.log(`User received sign-in award. Implementation needed.`)
  return { success: true, message: 'Sign-in award received (not implemented)' }
}

export const findVipLevelUpList = async () => {
  console.log(`Finding level up list for user. Implementation needed.`)
  return {}
}

export const receiveVipLevelUpAward = async () => {
  console.log(`User received level-up award. Implementation needed.`)
  return { success: true, message: 'Level-up award received (not implemented)' }
}

export const findVipCycleAwardList = async () => {
  console.log(`Finding cycle award list for user. Implementation needed.`)
  return {}
}

export const receiveVipCycleAward = async () => {
  console.log(`User received cycle award. Implementation needed.`)
  return { success: true, message: 'Cycle award received (not implemented)' }
}

export const findVipLevelAwardList = async () => {
  console.log(`Finding level award list for user. Implementation needed.`)
  return {}
}

export const receiveVipLevelAward = async () => {
  console.log(`User received level award. Implementation needed.`)
  return { success: true, message: 'Level award received (not implemented)' }
}

export const findVipBetAwardList = async () => {
  console.log(`Finding bet award list for user. Implementation needed.`)
  return {}
}

export const receiveVipBetAward = async () => {
  console.log(`User received bet award. Implementation needed.`)
  return { success: true, message: 'Bet award received (not implemented)' }
}
