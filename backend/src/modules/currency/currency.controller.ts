import { Context } from 'hono'
import * as service from './currency.service'

export const getBalanceList = async (c: Context) => {
  const userId = 1 // Placeholder
  const data = await service.getBalanceList(userId)
  return c.json({ code: 0, data, message: 'Success' })
}
