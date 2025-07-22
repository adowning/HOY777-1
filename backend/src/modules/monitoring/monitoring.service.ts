import { db } from '../../db'
import { sessions, users } from '../../db'
import { eq, gte } from 'drizzle-orm'

const SESSION_DURATION = 5 * 60 * 1000 // 5 minutes

export const getActiveSessions = async () => {
  const fiveMinutesAgo = new Date(Date.now() - SESSION_DURATION)
  const activeSessions = await db
    .select()
    .from(sessions)
    .leftJoin(users, eq(sessions.userId, users.id))
    .where(gte(sessions.lastSeen, fiveMinutesAgo))

  return activeSessions.map(({ sessions, users }) => ({
    ...sessions,
    user: users,
  }))
}
