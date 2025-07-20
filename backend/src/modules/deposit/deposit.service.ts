import db from '../../db'
import { deposits } from '../../db'
import { eq } from 'drizzle-orm'

export const getDepositConfig = async () => {
  // This is a placeholder. You will need to implement the actual logic
  return {
    bonus: [{ type: 0 }],
    pixInfo: { id: '123', first_name: 'John', last_name: 'Doe' },
  }
}

export const submitDeposit = async (
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
  const newDeposit = await db
    .insert(deposits)
    .values({ ...data, userId, amount })
    .returning()
  return newDeposit[0]
}

export const getDepositHistory = async (userId: number) => {
  const history = await db
    .select()
    .from(deposits)
    .where(eq(deposits.userId, userId))
  return {
    total_pages: 1,
    record: history,
  }
}
