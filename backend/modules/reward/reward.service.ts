import db from '../../db'
import { userRewards } from '../../db/schemelibsql'
import { eq } from 'drizzle-orm'

export const getRewardCenterList = async (userId: number) => {
  const rewards = await db
    .select()
    .from(userRewards)
    .where(eq(userRewards.userId, userId))
  return rewards[0] || {}
}

export const receiveAchievementBonus = async () => {
  // Placeholder for bonus logic
  return { success: true }
}
