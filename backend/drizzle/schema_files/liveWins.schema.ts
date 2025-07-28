import { pgTable, varchar, text, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const liveWins = pgTable("live_wins", {
	id: varchar('id').primaryKey().notNull(),
	image: text('image'),
	level: integer('level'),
	gameName: text("game_name"),
	bettingAmount: text("betting_amount"),
});

export const selectLiveWinsSchema = createSelectSchema(liveWins);
export const insertLiveWinsSchema = createInsertSchema(liveWins);
export const patchLiveWinsSchema = insertLiveWinsSchema.partial();
export type SelectLiveWins = z.infer<typeof selectLiveWinsSchema>;
export type InsertLiveWins = z.infer<typeof insertLiveWinsSchema>;