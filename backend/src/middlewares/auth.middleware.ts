import { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import * as jose from 'jose'
import { db } from '#/db'
import { users } from '#/db/schema'
import { eq } from 'drizzle-orm'
import { env } from '#/env'

export const authMiddleware = async (c: Context, next: Next) => {
  const token = getCookie(c, 'access_token')

  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ['HS256'],
    })

    if (!payload || !payload.userId) {
      return c.json({ error: 'Invalid token' }, 401)
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.userId as string))
      .limit(1)

    if (!user) {
      return c.json({ error: 'User not found' }, 401)
    }

    c.set('user', user)
    await next()
  } catch (e) {
    console.log(e)
    return c.json({ error: 'Invalid token' }, 401)
  }
}