import { Context } from 'hono'
import * as service from './bonus.service'

export const getUserBonuses = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getUserBonuses(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}

export const cancelBonus = async (c: Context) => {
  const user = c.get('user')
  const { id } = await c.req.json()
  const data = await service.cancelBonus(user.id, id)
  return c.json({ code: 0, data, message: 'Success' })
}
