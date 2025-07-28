import { pgTable, varchar, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const achievementItems = pgTable("achievement_items", {
	id: varchar('id').primaryKey().notNull(),
	index: integer('index'),
	num: integer('num'),
	award: integer('award'),
	state: integer('state'),
	rate: integer('rate'),
});

export const selectAchievementItemsSchema = createSelectSchema(achievementItems);
export const insertAchievementItemsSchema = createInsertSchema(achievementItems);
export const patchAchievementItemsSchema = insertAchievementItemsSchema.partial();
export type SelectAchievementItems = z.infer<typeof selectAchievementItemsSchema>;
export type InsertAchievementItems = z.infer<typeof insertAchievementItemsSchema>;