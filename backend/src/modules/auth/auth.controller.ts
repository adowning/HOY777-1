import { Context } from 'hono'
import * as service from './auth.service'

export const login = async (c: Context) => {
  const { username, password } = await c.req.json()
  const {
    accessToken,
    refreshToken,
    user: user,
  } = await service.login(username, password)
  setCookie(c, ACCESS_TOKEN_COOKIE, accessToken, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 60 * 15, // 15 minutes
  })
  return c.json(data, 200)
}

export const signup = async (c: Context) => {
  const { username, password } = await c.req.json()
  const data = await service.signup(username, password)
  return c.json(data, 200)
}
