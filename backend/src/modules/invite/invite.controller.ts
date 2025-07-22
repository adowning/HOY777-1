import { Context } from 'hono'
import * as service from './invite.service'

export const getInviteInfo = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getInviteInfo(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}

export const claimInviteAward = async (c: Context) => {
  const user = c.get('user')
  const data = await service.claimInviteAward(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}

export const getInviteSelfInfo = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getInviteSelfInfo(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}

export const getInviteHistoryConfig = async (c: Context) => {
  const data = await service.getInviteHistoryConfig()
  return c.json({ code: 0, data, message: 'Success' })
}

export const getInviteHistory = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getInviteHistory(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}

export const getStatisticsList = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getStatisticsList(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}
