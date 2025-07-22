// db/schema/gameSpin.ts
import {
  pgTable,
  text,
  jsonb,
  integer,
  timestamp,
  varchar,
  real,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { nanoid } from '../../utils/nanoid'
import { users } from './users'
import { gameSessions } from './games'
import { transformSchemaForOpenAPI } from '#/lib/schema-transformer'
import { relations } from 'drizzle-orm'
import { z}from 'zod'

export const gameSpins = pgTable('game_spins', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  playerName: text('player_name'),
  gameName: text('game_name'),
  spinData: jsonb('spin_data'),
  grossWinAmount: real('gross_win_amount'),
  wagerAmount: real('wager_amount'),
  spinNumber: integer('spin_number').default(0),
  playerAvatar: text('player_avatar'),
  sessionId: varchar('session_id').references(() => gameSessions.id),
  userId: varchar('user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  occurredAt: timestamp('occurred_at'),
})

export const gameSpinsRelations = relations(gameSpins, ({ one }) => ({
  user: one(users, {
    fields: [gameSpins.userId],
    references: [users.id],
  }),
  session: one(gameSessions, {
    fields: [gameSpins.sessionId],
    references: [gameSessions.id],
  }),
}))

export const selectGameSpinsSchema = createSelectSchema(gameSpins)
export const insertGameSpinsSchema = createInsertSchema(gameSpins)
export const patchGameSpinsSchema = insertGameSpinsSchema.partial()

export const gameSpinsDocumentationSchema = transformSchemaForOpenAPI(
  selectGameSpinsSchema
)

export type InsertGameSpin = z.infer<typeof insertGameSpinsSchema>;

export const GameSpinSchema = z.object({
  id: z.string(),
  spinData: z.any().optional().nullable(),
  createdAt: z.coerce.date(),
  grossWinAmount: z.number(),
  currencyId: z.string().optional().nullable(),
  spinNumber: z.number(),
  gameSessionId: z.string(),
  wagerAmount: z.number(),
  sessionId: z.string(),
  timeStamp: z.coerce.date()
});

export type GameSpinType = z.infer<typeof GameSpinSchema>;
