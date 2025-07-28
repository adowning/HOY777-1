import { pgTable, varchar, text } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const achievements = pgTable("achievements", {
	id: varchar('id').primaryKey().notNull(),
	name: text('name'),
	description: text('description'),
});

export const selectAchievementsSchema = createSelectSchema(achievements);
export const insertAchievementsSchema = createInsertSchema(achievements);
export const patchAchievementsSchema = insertAchievementsSchema.partial();
export type SelectAchievements = z.infer<typeof selectAchievementsSchema>;
export type InsertAchievements = z.infer<typeof insertAchievementsSchema>;