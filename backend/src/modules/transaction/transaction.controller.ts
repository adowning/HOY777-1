import { Context } from 'hono'
import * as service from './transaction.service'

export const getTransactionHistory = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getTransactionHistory(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}
