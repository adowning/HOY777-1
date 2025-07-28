import { pgTable, varchar, text, integer, timestamp, unique } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const jackpotWins = pgTable("jackpot_wins", {
	id: varchar('id').primaryKey().notNull(),
	jackpotId: text("jackpot_id").notNull(),
	winnerId: text("winner_id").notNull(),
	winAmountCoins: integer("win_amount_coins").notNull(),
	gameSpinId: text("game_spin_id").notNull(),
	transactionId: text("transaction_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},(table) => ({
	gameSpinIdUnique: unique("jackpot_wins_game_spin_id_unique").on(table.gameSpinId),
}));

export const selectJackpotWinsSchema = createSelectSchema(jackpotWins);
export const insertJackpotWinsSchema = createInsertSchema(jackpotWins);
export const patchJackpotWinsSchema = insertJackpotWinsSchema.partial();
export type SelectJackpotWins = z.infer<typeof selectJackpotWinsSchema>;
export type InsertJackpotWins = z.infer<typeof insertJackpotWinsSchema>;