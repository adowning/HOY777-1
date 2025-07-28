import { pgTable, varchar, text, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const gameBigWins = pgTable("game_big_wins", {
	id: varchar('id').primaryKey().notNull(),
	gameId: text("game_id"),
	gameName: text("game_name"),
	gameIcon: text("game_icon"),
	userName: text("user_name"),
	userVipGroup: integer("user_vip_group"),
	userVipLevel: integer("user_vip_level"),
	betAmount: text("bet_amount"),
	multiplier: text('multiplier'),
	winAmount: text("win_amount"),
	time: integer('time'),
});

export const selectGameBigWinsSchema = createSelectSchema(gameBigWins);
export const insertGameBigWinsSchema = createInsertSchema(gameBigWins);
export const patchGameBigWinsSchema = insertGameBigWinsSchema.partial();
export type SelectGameBigWins = z.infer<typeof selectGameBigWinsSchema>;
export type InsertGameBigWins = z.infer<typeof insertGameBigWinsSchema>;