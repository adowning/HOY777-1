import { pgTable, varchar, text, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const gameCategories = pgTable("game_categories", {
	id: varchar('id').primaryKey().notNull(),
	name: text('name'),
	title: text('title'),
	category: text('category'),
	slug: text('slug'),
	type: text('type'),
	icon: text('icon'),
	image: text('image'),
	pictures: text('pictures'),
	gameCount: integer("game_count"),
	pageNo: integer("page_no"),
});

export const selectGameCategoriesSchema = createSelectSchema(gameCategories);
export const insertGameCategoriesSchema = createInsertSchema(gameCategories);
export const patchGameCategoriesSchema = insertGameCategoriesSchema.partial();
export type SelectGameCategories = z.infer<typeof selectGameCategoriesSchema>;
export type InsertGameCategories = z.infer<typeof insertGameCategoriesSchema>;