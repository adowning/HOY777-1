import { Context } from 'hono'
import * as service from './withdraw.service'

export const getWithdrawalConfig = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getWithdrawalConfig(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}

export const submitWithdrawal = async (c: Context) => {
  const user = c.get('user')
  const body = await c.req.json()
  const data = await service.submitWithdrawal(user.id, body)
  return c.json({ code: 0, data, message: 'Success' })
}

export const getWithdrawalHistory = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getWithdrawalHistory(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}

export const refundWithdrawal = async (c: Context) => {
  const { id } = await c.req.json()
  const data = await service.refundWithdrawal(id)
  return c.json({ code: 0, data, message: 'Success' })
}
