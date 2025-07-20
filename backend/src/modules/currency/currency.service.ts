import db from '../../db'
import { balances } from '../../db'
import { eq } from 'drizzle-orm'

export const getBalanceList = async (userId: number) => {
  return await db.select().from(balances).where(eq(balances.userId, userId))
}
