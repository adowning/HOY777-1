import { Context } from 'hono'
import * as service from './invite.service'

export const getInviteInfo = async (c: Context) => {
  const userId = 1 // Placeholder
  const data = await service.getInviteInfo(userId)
  return c.json({ code: 0, data, message: 'Success' })
}

export const claimInviteAward = async (c: Context) => {
  const userId = 1 // Placeholder
  const data = await service.claimInviteAward(userId)
  return c.json({ code: 0, data, message: 'Success' })
}

export const getInviteSelfInfo = async (c: Context) => {
  const userId = 1 // Placeholder
  const data = await service.getInviteSelfInfo(userId)
  return c.json({ code: 0, data, message: 'Success' })
}

export const getInviteHistoryConfig = async (c: Context) => {
  const data = await service.getInviteHistoryConfig()
  return c.json({ code: 0, data, message: 'Success' })
}

export const getInviteHistory = async (c: Context) => {
  const userId = 1 // Placeholder
  const data = await service.getInviteHistory(userId)
  return c.json({ code: 0, data, message: 'Success' })
}

export const getStatisticsList = async (c: Context) => {
  const userId = 1 // Placeholder
  const data = await service.getStatisticsList(userId)
  return c.json({ code: 0, data, message: 'Success' })
}
