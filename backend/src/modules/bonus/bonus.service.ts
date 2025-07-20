import db from '../../db'
import { bonuses } from '../../db'
import { eq } from 'drizzle-orm'

export const getUserBonuses = async (userId: number) => {
  const userBonuses = await db
    .select()
    .from(bonuses)
    .where(eq(bonuses.userId, userId))
  return { list: userBonuses }
}

export const cancelBonus = async (userId: number, bonusId: number) => {
  const updatedBonus = await db
    .update(bonuses)
    .set({ status: 3 }) // Assuming 3 means cancelled
    .where(eq(bonuses.id, bonusId))
    .returning()
  return updatedBonus[0]
}
