import db from '../../db'
import { transactions } from '../../db/schemelibsql'
import { eq } from 'drizzle-orm'

export const getTransactionHistory = async (userId: number) => {
  const history = await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
  return {
    total_pages: 1,
    record: history,
  }
}
