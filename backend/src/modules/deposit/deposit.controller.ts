import { Context } from 'hono'
import * as service from './deposit.service'

export const getDepositConfig = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getDepositConfig(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}

export const submitDeposit = async (c: Context) => {
  const user = c.get('user')
  const body = await c.req.json()
  const data = await service.submitDeposit(user.id, body)
  return c.json({ code: 0, data, message: 'Success' })
}

export const getDepositHistory = async (c: Context) => {
  const user = c.get('user')
  const data = await service.getDepositHistory(user.id)
  return c.json({ code: 0, data, message: 'Success' })
}
