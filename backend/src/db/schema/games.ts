// db/schema/games.ts
import { pgTable, text, integer, varchar, timestamp , primaryKey} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { nanoid } from '../../utils/nanoid'
import { transformSchemaForOpenAPI } from '#/lib/schema-transformer'
import { users } from './users'

export const gameCategories = pgTable('game_categories', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  name: text('name'),
  title: text('title'),
  category: text('category'),
  slug: text('slug'),
  type: text('type'),
  icon: text('icon'),
  image: text('image'),
  pictures: text('pictures'),
  gameCount: integer('game_count'),
  pageNo: integer('page_no'),
})

export const games = pgTable('games', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  name: text('name'),
  provider: text('provider'),
  categoryId: varchar('category_id').references(() => gameCategories.id),
})

export const gameHistory = pgTable('game_history', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  name: text('name'),
  createdAt: integer('created_at'),
  amount: text('amount'),
  multiplier: text('multiplier'),
  betId: text('bet_id'),
  status: text('status'),
  profit: integer('profit'),
})

export const gameBigWins = pgTable('game_big_wins', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  gameId: text('game_id'),
  gameName: text('game_name'),
  gameIcon: text('game_icon'),
  userName: text('user_name'),
  userVipGroup: integer('user_vip_group'),
  userVipLevel: integer('user_vip_level'),
  betAmount: text('bet_amount'),
  multiplier: text('multiplier'),
  winAmount: text('win_amount'),
  time: integer('time'),
})

export const gamesRelations = relations(games, ({ one }) => ({
  category: one(gameCategories, {
    fields: [games.categoryId],
    references: [gameCategories.id],
  }),
}))

export const gameCategoriesRelations = relations(
  gameCategories,
  ({ many }) => ({
    games: many(games),
  })
)

export const selectGameCategoriesSchema = createSelectSchema(gameCategories)
// export const selectGamesSchema = createSelectSchema(games)
export const selectGameBigWinsSchema = createSelectSchema(gameBigWins)
export const selectGamesSchema = transformSchemaForOpenAPI(
  createSelectSchema(games)
)


// In a schema file, e.g., db/schema/games.ts

// A join table for the many-to-many relationship between users and their favorite games
export const favoriteGames = pgTable('favorite_games', {
    userId: varchar('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    gameId: varchar('game_id').references(() => games.id, { onDelete: 'cascade' }).notNull(),
}, (table) => ({
    // This composite primary key ensures a user can only favorite a game once
    pk: primaryKey(table.userId, table.gameId),
}));

// The game session table
export const gameSessions = pgTable('game_sessions', {
    id: varchar('id').primaryKey().$defaultFn(nanoid),
    userId: varchar('user_id').references(() => users.id),
    gameId: varchar('game_id').references(() => games.id),
    status: varchar('status', { enum: ['active', 'ended'] }),
    createdAt: timestamp('created_at').defaultNow(),
    endedAt: timestamp('ended_at'),
});