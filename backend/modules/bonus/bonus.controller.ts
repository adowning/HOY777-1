import { Context } from 'hono'
import * as service from './bonus.service'

export const getUserBonuses = async (c: Context) => {
  const userId = 1 // Placeholder
  const data = await service.getUserBonuses(userId)
  return c.json({ code: 0, data, message: 'Success' })
}

export const cancelBonus = async (c: Context) => {
  const userId = 1 // Placeholder
  const { id } = await c.req.json()
  const data = await service.cancelBonus(userId, id)
  return c.json({ code: 0, data, message: 'Success' })
}
