import { pgTable, serial, boolean, integer, text, numeric, json, timestamp, varchar, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { games } from "./games.schema"

export const rtgSpinResults = pgTable("rtg_spin_results", {
	id: serial('id').primaryKey().notNull(),
	success: boolean('success').notNull(),
	userId: integer("user_id").notNull(),
	sessionId: text("session_id"),
	canGamble: boolean("can_gamble"),
	token: text('token'),
	sessionNetPosition: numeric("session_net_position"),
	serverTime: timestamp("server_time", { mode: 'string' }),
	balanceCashAtStart: numeric("balance_cash_at_start"),
	balanceCashAfterBet: numeric("balance_cash_after_bet"),
	balanceCashAtEnd: numeric("balance_cash_at_end"),
	balanceFreeBetsAtStart: numeric("balance_free_bets_at_start"),
	balanceFreeBetsAfterBet: numeric("balance_free_bets_after_bet"),
	balanceFreeBetsAtEnd: numeric("balance_free_bets_at_end"),
	balanceBonusAtStart: numeric("balance_bonus_at_start"),
	balanceBonusAfterBet: numeric("balance_bonus_after_bet"),
	balanceBonusAtEnd: numeric("balance_bonus_at_end"),
	limitsBetThresholdTime: integer("limits_bet_threshold_time"),
	bonuses: json('bonuses'),
	tournaments: json('tournaments'),
	vouchers: json('vouchers'),
	messages: json('messages'),
	stake: numeric('stake'),
	multiplier: numeric('multiplier'),
	winTotal: numeric("win_total"),
	winLines: json("win_lines"),
	winsMultipliersTotal: numeric("wins_multipliers_total"),
	winsMultipliersLines: numeric("wins_multipliers_lines"),
	spinMode: text("spin_mode"),
	hasState: boolean("has_state"),
	fatTiles: json('fat_tiles'),
	scatters: json('scatters'),
	features: json('features'),
	reelsBuffer: json("reels_buffer"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	gameId: varchar("game_id"),
	gameName: text("game_name").notNull(),
}, (table) => ({
	gameFk: foreignKey({
			columns: [table.gameId],
			foreignColumns: [games.id],
			name: "rtg_spin_results_game_id_games_id_fk"
		}),
}));

export const selectRtgSpinResultsSchema = createSelectSchema(rtgSpinResults);
export const insertRtgSpinResultsSchema = createInsertSchema(rtgSpinResults);
export const patchRtgSpinResultsSchema = insertRtgSpinResultsSchema.partial();
export type SelectRtgSpinResults = z.infer<typeof selectRtgSpinResultsSchema>;
export type InsertRtgSpinResults = z.infer<typeof insertRtgSpinResultsSchema>;