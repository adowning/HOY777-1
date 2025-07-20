import { Context } from 'hono'
import * as service from './achievement.service'

export const getAchievementList = async (c: Context) => {
  const userId = 1 // Placeholder
  const data = await service.getAchievementList(userId)
  return c.json({ code: 0, data, message: 'Success' })
}

export const claimStageAward = async (c: Context) => {
  const userId = 1 // Placeholder
  const body = await c.req.json()
  const data = await service.claimStageAward(userId, body)
  return c.json({ code: 0, data, message: 'Success' })
}

export const claimAchievementAward = async (c: Context) => {
  const userId = 1 // Placeholder
  const body = await c.req.json()
  const data = await service.claimAchievementAward(userId, body)
  return c.json({ code: 0, data, message: 'Success' })
}

export const getAchievementConfig = async (c: Context) => {
  const data = await service.getAchievementConfig()
  return c.json({ code: 0, data, message: 'Success' })
}
