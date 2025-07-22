import { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import * as jose from 'jose'
import { db,  } from '#/db'
import { users, wallets} from '#/db'
import { eq } from 'drizzle-orm'
import { env } from '#/env'

export const authMiddleware = async (c: Context, next: Next) => {
  let token = getCookie(c, 'access_token')
  console.log(c.req.url)
  if(!token && c.req.url.includes('/rpc') ){
      const slashArr = c.req.url.split('/')
      token = slashArr[7]
  }
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
    console.log(token)

  try {
    console.log(env.ACCESS_TOKEN_SECRET)
    const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ['HS256'],
    })
     console.log(payload)
    if (!payload || !payload.userId) {
      return c.json({ error: 'Invalid token' }, 401)
    }

    let user = await db.query.users.findFirst({
      where: eq(users.id, payload.userId as string),
      with: {
        wallets: {
          where: eq(wallets.isActive, true), // <-- This is the key change!
          with: {
            operator: true, // Include the operator for the active wallet
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

    delete user.wallets
    delete user.vipInfo
    c.set('user', user)
    await next()
  } catch (e) {
    console.log(e)
    return c.json({ error: 'Invalid token' }, 401)
  }
}
// digiflavor