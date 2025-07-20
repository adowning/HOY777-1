import { Context } from 'hono'
import * as service from './reward.service'

export const getRewardCenterList = async (c: Context) => {
  const userId = 1 // Placeholder
  const data = await service.getRewardCenterList(userId)
  return c.json({ code: 0, data, message: 'Success' })
}

export const receiveAchievementBonus = async (c: Context) => {
  const userId = 1 // Placeholder
  const data = await service.receiveAchievementBonus(userId)
  return c.json({ code: 0, data, message: 'Success' })
}
