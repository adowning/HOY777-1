import { pgTable, varchar, text, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const gameHistory = pgTable("game_history", {
	id: varchar('id').primaryKey().notNull(),
	name: text('name'),
	createdAt: integer("created_at"),
	amount: text('amount'),
	multiplier: text('multiplier'),
	betId: text("bet_id"),
	status: text('status'),
	profit: integer('profit'),
});

export const selectGameHistorySchema = createSelectSchema(gameHistory);
export const insertGameHistorySchema = createInsertSchema(gameHistory);
export const patchGameHistorySchema = insertGameHistorySchema.partial();
export type SelectGameHistory = z.infer<typeof selectGameHistorySchema>;
export type InsertGameHistory = z.infer<typeof insertGameHistorySchema>;