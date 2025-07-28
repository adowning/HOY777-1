import {
  pgTable,
  text,
  timestamp,
  integer,
  decimal,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { users, selectUsersSchema } from './users'
import { games } from './games'
import { selectOperatorsSchema } from './operators'
import { selectVipInfoSchema } from './vipInfo'
import { transformSchemaForOpenAPI } from '../../schema-transformer'

export const sessionStatusEnum = pgEnum('session_status', [
  'ACTIVE',
  'COMPLETED',
  'EXPIRED',
])

export const authSessions = pgTable(
  'auth_sessions',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    status: sessionStatusEnum('status').default('ACTIVE').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    deviceId: text('device_id'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    lastSeen: timestamp('last_seen', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      userIdx: index('auth_session_user_idx').on(table.userId, table.createdAt),
      statusIdx: index('auth_session_status_idx').on(table.status),
    }
  }
)

export const gameSessions = pgTable(
  'game_sessions',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    authSessionId: text('auth_session_id')
      .notNull()
      .references(() => authSessions.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    gameId: text('game_id').references(() => games.id, { onDelete: 'cascade' }),
    status: sessionStatusEnum('status').default('ACTIVE').notNull(),
    totalWagered: integer('total_wagered').default(0).notNull(),
    totalWon: integer('total_won').default(0).notNull(),
    totalXpGained: integer('total_xp_gained').default(0).notNull(),
    rtp: decimal('rtp', { precision: 5, scale: 2 }),
    duration: integer('duration').default(0).notNull(), // in seconds
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    endedAt: timestamp('end_at', { withTimezone: true }),
  },
  (table) => {
    return {
      authSessionIdx: index('game_session_auth_session_idx').on(
        table.authSessionId
      ),
      userIdx: index('game_session_user_idx').on(table.userId),
    }
  }
)

export const authSessionsRelations = relations(authSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [authSessions.userId],
    references: [users.id],
  }),
  gameSessions: many(gameSessions),
}))

export const gameSessionsRelations = relations(gameSessions, ({ one }) => ({
  authSession: one(authSessions, {
    fields: [gameSessions.authSessionId],
    references: [authSessions.id],
  }),
  user: one(users, {
    fields: [gameSessions.userId],
    references: [users.id],
  }),
  game: one(games, {
    fields: [gameSessions.gameId],
    references: [games.id],
  }),
}))

export const insertAuthSessionSchema =
  createInsertSchema(authSessions)
export const selectAuthSessionSchema =
  createSelectSchema(authSessions)

export const insertGameSessionSchema = createInsertSchema(gameSessions)
export const selectGameSessionSchema = createSelectSchema(gameSessions)

export type InsertAuthSession = z.infer<typeof insertAuthSessionSchema>
export type AuthSession = z.infer<typeof selectAuthSessionSchema>
export type InsertGameSession = z.infer<typeof insertGameSessionSchema>
export type GameSession = z.infer<typeof selectGameSessionSchema>
