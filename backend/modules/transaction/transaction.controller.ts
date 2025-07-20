import { Context } from 'hono'
import * as service from './transaction.service'

export const getTransactionHistory = async (c: Context) => {
  const userId = 1 // Placeholder
  const data = await service.getTransactionHistory(userId)
  return c.json({ code: 0, data, message: 'Success' })
}
