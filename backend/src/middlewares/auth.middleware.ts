import { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import * as jose from 'jose'
import { db } from '#/db'
import { users, wallets, authSessions } from '#/db'
import { eq, and } from 'drizzle-orm'
import { env } from '#/env'

export const authMiddleware = async (c: Context, next: Next) => {
  let token = getCookie(c, 'access_token')
  if(!token && c.req.url.includes('/rpc') ){
      const slashArr = c.req.url.split('/')
      token = slashArr[7]
  }
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ['HS256'],
    })
    if (!payload || !payload.userId || !payload.sessionId) {
      return c.json({ error: 'Invalid token' }, 401)
    }

    const authSession = await db.query.authSessions.findFirst({
      where: and(eq(authSessions.id, payload.sessionId as string), eq(authSessions.status, 'ACTIVE')),
    });

    if (!authSession) {
      return c.json({ error: 'Session not found or has expired' }, 401);
    }

    let user = await db.query.users.findFirst({
      where: eq(users.id, payload.userId as string),
      with: {
        wallets: {
          where: eq(wallets.isActive, true),
          with: {
            operator: true,
          },
        },
        vipInfo: true,
      },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 401)
    }
    const activeWallet = user.wallets[0];
    c.set('vipInfo', user.vipInfo)
    c.set('operator', activeWallet.operator)
    delete activeWallet.operator
    c.set('wallet',activeWallet)
    c.set('token',token)
    c.set('authSession', authSession);

    delete user.wallets
    delete user.vipInfo
    c.set('user', user)
    await next()
  } catch (e) {
    console.log(e)
    return c.json({ error: 'Invalid token' }, 401)
  }
}