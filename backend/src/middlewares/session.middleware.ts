import { Context, Next } from 'hono'
import { db } from '#/db'
import { sessions } from '#/db/schema/session'
import { and, eq, gte } from 'drizzle-orm'

const SESSION_DURATION = 5 * 60 * 1000 // 5 minutes

export const sessionMiddleware = async (c: Context, next: Next) => {
  const user = c.get('user')

  if (!user) {
    // This should not happen if authMiddleware is run before this
    return c.json({ error: 'User not authenticated' }, 401)
  }

  const now = new Date()
  const fiveMinutesAgo = new Date(now.getTime() - SESSION_DURATION)

  const [existingSession] = await db
    .select()
    .from(sessions)
    .where(
      and(eq(sessions.userId, user.id), gte(sessions.lastSeen, fiveMinutesAgo))
    )
    .limit(1)

  let session

  if (existingSession) {
    // Update last seen time
    const [updatedSession] = await db
      .update(sessions)
      .set({ lastSeen: now })
      .where(eq(sessions.id, existingSession.id))
      .returning()
    session = updatedSession
  } else {
    // Create a new session
    const [newSession] = await db
      .insert(sessions)
      .values({
        userId: user.id,
        status: 'ACTIVE',
        ipAddress: c.req.header('x-forwarded-for') || c.req.header('remote-addr'),
        userAgent: c.req.header('user-agent'),
        lastSeen: now,
      })
      .returning()
    session = newSession
  }

  c.set('session', session)
  await next()
}