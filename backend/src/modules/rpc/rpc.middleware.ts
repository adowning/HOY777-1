import { Context, Next } from 'hono';
import * as jose from 'jose';
import { db } from '#/db';
import { users } from '#/db/schema';
import { eq } from 'drizzle-orm';
import { env } from '#/env';

export const rpcAuthMiddleware = async (c: Context, next: Next) => {
  const token = c.req.param('authToken');

  if (!token) {
    return c.json({ error: 'Unauthorized - Missing token' }, 401);
  }

  try {
    const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);

    if (!payload || !payload.userId) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.userId as string),
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 401);
    }
    
    c.set('user', user);
    await next();
  } catch (e) {
    console.error('RPC Auth Error:', e);
    return c.json({ error: 'Invalid token' }, 401);
  }
};
