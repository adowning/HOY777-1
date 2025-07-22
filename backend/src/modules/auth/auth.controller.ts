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
  console.log(accessToken)
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
  const wallet = c.get('wallet')
  const vipInfo = c.get('vipInfo')
  const operator = c.get('operator')
  
  // For now, just return the basic user and session data
  // We'll add wallet and VIP info back once login is working
  return c.json({
    user: {
      ...user,
      passwordHash: undefined,
    },
    session,
    wallet,
    vipInfo,
    operator
  }, 200)
}

export const logout = async (c: Context) => {
  // Clear the access token cookie
  setCookie(c, 'access_token', '', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    expires: new Date(0), // Set to past date to expire the cookie
  })

  // If you have a session in the database, you would invalidate it here
  // For example:
  // if (c.get('session')?.id) {
  //   await db.update(sessions)
  //     .set({ status: 'INACTIVE', endedAt: new Date() })
  //     .where(eq(sessions.id, c.get('session').id))
  // }

  return c.json({ message: 'Successfully logged out' }, 200)
}
