import { Context } from 'hono'
import * as service from './auth.service'

export const login = async (c: Context) => {
  const { email, password } = await c.req.json()
  const data = await service.login(email, password)
  return c.json(data, 200)
}

export const signup = async (c: Context) => {
  const { email, password, username } = await c.req.json()
  const data = await service.signup(email, password, username)
  return c.json(data, 200)
}
