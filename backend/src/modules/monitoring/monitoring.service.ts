import { db } from '../../db'
import { authSessions, users } from '../../db'
import { eq, gte } from 'drizzle-orm'

const SESSION_DURATION = 5 * 60 * 1000 // 5 minutes

export const getActiveSessions = async () => {
  const fiveMinutesAgo = new Date(Date.now() - SESSION_DURATION)
  const activeSessions = await db
    .select()
    .from(authSessions)
    .leftJoin(users, eq(authSessions.userId, users.id))
    .where(gte(authSessions.lastSeen, fiveMinutesAgo))

  return activeSessions.map(({ authSessions, users }) => ({
    ...authSessions,
    user: users,
  }))
}
