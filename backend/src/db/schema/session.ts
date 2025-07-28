import {
  pgTable,
  text,
  timestamp,
  integer,
  decimal,
  pgEnum,
  index,
  varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { users, selectUsersSchema } from './users'
import { games } from './games'
import { selectWalletsSchema } from './wallets'
import { selectOperatorsSchema } from './operators'
import { selectVipInfoSchema } from './vipInfo'
import { transformSchemaForOpenAPI } from '#/lib/schema-transformer'
import { nanoid } from '../../utils/nanoid'

export const sessionStatusEnum = pgEnum('session_status', [
  'ACTIVE',
  'COMPLETED',
  'EXPIRED',
])

export const authSessions = pgTable(
  'auth_sessions',
  {
      id: varchar('id').primaryKey().$defaultFn(nanoid),
    
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
      // userIdx: index('auth_session_user_idx').on(table.userId, table.createdAt),
      // statusIdx: index('auth_session_status_idx').on(table.status),
    }
  }
)

export const gameSessions = pgTable(
  'game_sessions',
  {
     id: varchar('id').primaryKey().$defaultFn(nanoid),
   
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
      // authSessionIdx: index('game_session_auth_session_idx').on(
      //   table.authSessionId
      // ),
      // userIdx: index('game_session_user_idx').on(table.userId),
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

export const insertAuthSessionSchema = createInsertSchema(authSessions)
export const selectAuthSessionSchema =
  createSelectSchema(authSessions)

export const insertGameSessionSchema = createInsertSchema(gameSessions, {
  rtp: z.string().optional(),
})
export const selectGameSessionSchema = createSelectSchema(gameSessions, {
  rtp: z.string().nullable(),
})

export const sessionResponseSchema = transformSchemaForOpenAPI(
  z.object({
    session: selectAuthSessionSchema.nullable(),
    user: selectUsersSchema.nullable(),
    wallet: selectWalletsSchema.nullable(),
    operator: selectOperatorsSchema.nullable(),
    vipInfo: selectVipInfoSchema.nullable(),
  })
)

export type InsertAuthSession = z.infer<typeof insertAuthSessionSchema>
export type AuthSession = z.infer<typeof selectAuthSessionSchema>
export type InsertGameSession = z.infer<typeof insertGameSessionSchema>
export type GameSession = z.infer<typeof selectGameSessionSchema>

const g: GameSession = {
  id: '123',
  authSessionId: '123',
  userId: '123',
  gameId: '12',
  status: 'ACTIVE',
  totalWagered: 123,
  totalWon: 123,
  totalXpGained: 123,
  rtp: 123,
  duration: 123,
  createdAt: new Date(),
  endedAt: new Date(),

}