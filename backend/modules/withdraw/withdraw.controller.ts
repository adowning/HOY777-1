import { Context } from 'hono'
import * as service from './withdraw.service'

export const getWithdrawalConfig = async (c: Context) => {
  const userId = 1 // Placeholder for actual user ID from auth
  const data = await service.getWithdrawalConfig(userId)
  return c.json({ code: 0, data, message: 'Success' })
}

export const submitWithdrawal = async (c: Context) => {
  const userId = 1 // Placeholder for actual user ID from auth
  const body = await c.req.json()
  const data = await service.submitWithdrawal(userId, body)
  return c.json({ code: 0, data, message: 'Success' })
}

export const getWithdrawalHistory = async (c: Context) => {
  const userId = 1 // Placeholder for actual user ID from auth
  const data = await service.getWithdrawalHistory(userId)
  return c.json({ code: 0, data, message: 'Success' })
}

export const refundWithdrawal = async (c: Context) => {
  const { id } = await c.req.json()
  const data = await service.refundWithdrawal(id)
  return c.json({ code: 0, data, message: 'Success' })
}
