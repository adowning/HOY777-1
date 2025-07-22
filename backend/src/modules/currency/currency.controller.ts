import { Context } from 'hono'
import * as service from './currency.service'

export const getBalanceList = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getBalanceList(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}
