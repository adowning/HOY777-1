import { Context } from 'hono'
import * as service from './reward.service'

export const getRewardCenterList = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getRewardCenterList(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}

export const receiveAchievementBonus = async (c: Context) => {
  const user = c.get('user')
  const data = await service.receiveAchievementBonus(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}
