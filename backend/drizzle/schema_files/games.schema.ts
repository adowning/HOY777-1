import { pgTable, varchar, text, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { gameCategories } from "./gameCategories.schema"

export const games = pgTable("games", {
	id: varchar('id').primaryKey().notNull(),
	name: text('name'),
	provider: text('provider'),
	categoryId: varchar("category_id"),
}, (table) => ({
	categoryIdFk: foreignKey({
			columns: [table.categoryId],
			foreignColumns: [gameCategories.id],
			name: "games_category_id_game_categories_id_fk"
		}),
}));

export const selectGamesSchema = createSelectSchema(games);
export const insertGamesSchema = createInsertSchema(games);
export const patchGamesSchema = insertGamesSchema.partial();
export type SelectGames = z.infer<typeof selectGamesSchema>;
export type InsertGames = z.infer<typeof insertGamesSchema>;