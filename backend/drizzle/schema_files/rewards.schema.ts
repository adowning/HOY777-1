import { pgTable, varchar, text } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const rewards = pgTable("rewards", {
	id: varchar('id').primaryKey().notNull(),
	name: text('name'),
	description: text('description'),
});

export const selectRewardsSchema = createSelectSchema(rewards);
export const insertRewardsSchema = createInsertSchema(rewards);
export const patchRewardsSchema = insertRewardsSchema.partial();
export type SelectRewards = z.infer<typeof selectRewardsSchema>;
export type InsertRewards = z.infer<typeof insertRewardsSchema>;