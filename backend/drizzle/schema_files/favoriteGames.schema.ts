import { pgTable, varchar, foreignKey, primaryKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"
import { games } from "./games.schema"

export const favoriteGames = pgTable("favorite_games", {
	userId: varchar("user_id").notNull(),
	gameId: varchar("game_id").notNull(),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "favorite_games_user_id_users_id_fk"
		}).onDelete("cascade"),
	gameFk: foreignKey({
			columns: [table.gameId],
			foreignColumns: [games.id],
			name: "favorite_games_game_id_games_id_fk"
		}).onDelete("cascade"),
	pk: primaryKey({ columns: [table.userId, table.gameId], name: "favorite_games_user_id_game_id_pk" }),
}));

export const selectFavoriteGamesSchema = createSelectSchema(favoriteGames);
export const insertFavoriteGamesSchema = createInsertSchema(favoriteGames);
export const patchFavoriteGamesSchema = insertFavoriteGamesSchema.partial();
export type SelectFavoriteGames = z.infer<typeof selectFavoriteGamesSchema>;
export type InsertFavoriteGames = z.infer<typeof insertFavoriteGamesSchema>;