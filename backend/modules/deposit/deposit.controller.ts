import { Context } from 'hono'
import * as service from './deposit.service'

export const getDepositConfig = async (c: Context) => {
  const userId = 1 // Placeholder for actual user ID from auth
  const data = await service.getDepositConfig(userId)
  return c.json({ code: 0, data, message: 'Success' })
}

export const submitDeposit = async (c: Context) => {
  const userId = 1 // Placeholder for actual user ID from auth
  const body = await c.req.json()
  const data = await service.submitDeposit(userId, body)
  return c.json({ code: 0, data, message: 'Success' })
}

export const getDepositHistory = async (c: Context) => {
  const userId = 1 // Placeholder for actual user ID from auth
  const data = await service.getDepositHistory(userId)
  return c.json({ code: 0, data, message: 'Success' })
}
