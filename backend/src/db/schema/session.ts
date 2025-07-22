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
import { selectWalletsSchema } from './wallets'
import { selectOperatorsSchema } from './operators'
import { selectVipInfoSchema } from './vipInfo'
import { transformSchemaForOpenAPI } from '#/lib/schema-transformer'

// 1. Define the Enum for SessionStatus (equivalent to Prisma's enum)
// This should be defined in your database as a custom type.
// CREATE TYPE "session_status" AS ENUM ('ACTIVE', 'COMPLETED', 'EXPIRED');
export const sessionStatusEnum = pgEnum('session_status', [
  'ACTIVE',
  'COMPLETED',
  'EXPIRED',
])

// 2. Define the Drizzle Table for 'sessions'
export const sessions = pgTable(
  'sessions',
  {
    // Core Fields
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()), // Using UUID instead of CUID for broader support
    endAt: timestamp('end_at', { withTimezone: true }),
    duration: integer('duration').default(0).notNull(), // in seconds
    totalWagered: integer('total_wagered').default(0).notNull(),
    totalWon: integer('total_won').default(0).notNull(),
    rtp: decimal('rtp', { precision: 5, scale: 2 }),
    status: sessionStatusEnum('status').default('ACTIVE').notNull(),
    spinIds: text('spin_ids').array().notNull().default([]), // Array of strings
    currentBalance: integer('current_balance').default(0).notNull(),
    totalXpGained: integer('total_xp_gained').default(0).notNull(),

    // Relational Fields
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    gameId: text('game_id').references(() => games.id, { onDelete: 'cascade' }),

    // Metadata
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    deviceId: text('device_id'),

    // Timestamps
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date()),
    lastSeen: timestamp('last_seen', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    // Indexes
    return {
      userIdx: index('session_user_idx').on(table.userId, table.createdAt),
      gameIdx: index('session_game_idx').on(table.gameId, table.createdAt),
      statusIdx: index('session_status_idx').on(table.status),
    }
  }
)

// 3. Define the Relations for the 'sessions' table
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
  game: one(games, {
    fields: [sessions.gameId],
    references: [games.id],
  }),
}))

// 4. Generate Zod Schemas using drizzle-zod
// Schema for inserting a new session (e.g., for API input validation)
export const insertSessionSchema = transformSchemaForOpenAPI(
  createInsertSchema(sessions, {
    rtp: z.string().optional(), // Decimal is represented as a string
  })
)
// Schema for selecting a session (e.g., for API output)
export const selectSessionSchema = transformSchemaForOpenAPI(
  createSelectSchema(sessions, {
    rtp: z.string().nullable(),
  })
)

// 5. Create the final combined Response Schema
// First, we need a schema for a user with its relations. Let's assume you have one.
// If not, here's how you would create it in your user schema file:
// export const UserWithRelations = selectUserSchema.extend({ ...relations... });
// For this example, we'll just use the base user schema.

// This is the final schema you requested.
export const sessionResponseSchema = transformSchemaForOpenAPI(
  z.object({
    session: selectSessionSchema.nullable(),
    user: selectUsersSchema.nullable(),
    wallet: selectWalletsSchema.nullable(),
    operator: selectOperatorsSchema.nullable(),
    vipInfo: selectVipInfoSchema.nullable(),
  })
)

// You can infer the TypeScript types directly from the Zod schemas
export type InsertSession = z.infer<typeof insertSessionSchema>
export type SelectSession = z.infer<typeof selectSessionSchema>
export type Session = z.infer<typeof sessions>