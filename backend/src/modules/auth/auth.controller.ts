import { Context } from 'hono'
import * as service from './auth.service'
import { setCookie } from 'hono/cookie'

export const login = async (c: Context) => {
  const { username, password, uid } = await c.req.json()
  const {
    accessToken,
    refreshToken,
    user: user,
  } = await service.login(username, password, uid)
  setCookie(c, 'access_token', accessToken, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 60 * 15, // 15 minutes
  })
  return c.json({ accessToken, refreshToken, user }, 200)
}

export const signup = async (c: Context) => {
  const { username, password } = await c.req.json()
  const data = await service.signup(username, password)
  return c.json(data, 200)
}
export const session = async (c: Context) => {
  const user = c.get('user')
  const session = c.get('session')
  return c.json({ user, session }, 200)
}
