import { db } from '../../db'
import { withdrawals } from '../../db'
import { eq } from 'drizzle-orm'

export const getWithdrawalConfig = async () => {
  // This is a placeholder. You will need to implement the actual logic
  return {}
}

export const submitWithdrawal = async (
  userId: number,
  data: {
    id_number: string
    first_name: string
    last_name: string
    channels_id: string
    amount: string | number
  }
) => {
  const amount =
    typeof data.amount === 'string' ? parseInt(data.amount) : data.amount
  const newWithdrawal = await db
    .insert(withdrawals)
    .values({ ...data, userId, amount })
    .returning()
  return newWithdrawal[0]
}

export const getWithdrawalHistory = async (userId: number) => {
  const history = await db
    .select()
    .from(withdrawals)
    .where(eq(withdrawals.userId, userId))
  return {
    total_pages: 1,
    record: history,
  }
}

export const refundWithdrawal = async (withdrawalId: number) => {
  const updatedWithdrawal = await db
    .update(withdrawals)
    .set({ status: 'refunded' })
    .where(eq(withdrawals.id, withdrawalId))
    .returning()
  return updatedWithdrawal[0]
}
