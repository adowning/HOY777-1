import { pgTable, serial, boolean, integer, text, numeric, json, timestamp, varchar, foreignKey, unique } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { games } from "./games.schema"

export const rtgSettingsResponses = pgTable("rtg_settings_responses", {
	id: serial('id').primaryKey().notNull(),
	success: boolean('success').notNull(),
	userId: integer("user_id"),
	userToken: text("user_token"),
	userSessionId: text("user_session_id"),
	userCanGamble: boolean("user_can_gamble"),
	userCountry: text("user_country"),
	userCasino: text("user_casino"),
	userCurrencyCode: text("user_currency_code"),
	userCurrencySymbol: text("user_currency_symbol"),
	userServerTime: timestamp("user_server_time", { mode: 'string' }),
	userBalanceCash: numeric("user_balance_cash"),
	userBalanceFreeBets: numeric("user_balance_free_bets"),
	userBalanceBonus: numeric("user_balance_bonus"),
	userStakesDefaultIndex: integer("user_stakes_default_index"),
	userStakesLastIndex: integer("user_stakes_last_index"),
	gameCols: integer("game_cols"),
	gameRows: integer("game_rows"),
	gamePaysType: text("game_pays_type"),
	gameVersion: text("game_version"),
	gameVolatilityIndex: text("game_volatility_index"),
	gameRtpDefault: numeric("game_rtp_default"),
	gameHasGamble: boolean("game_has_gamble"),
	gameHasFeatureBuy: boolean("game_has_feature_buy"),
	launcherVersion: text("launcher_version"),
	userBonuses: json("user_bonuses"),
	userAutoplay: json("user_autoplay"),
	gameLines: json("game_lines"),
	gameTiles: json("game_tiles"),
	gameFeatures: json("game_features"),
	gameMultiplierSequence: json("game_multiplier_sequence"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	gameId: varchar("game_id"),
	gameName: text("game_name").notNull(),
}, (table) => ({
	gameFk: foreignKey({ columns: [table.gameId], foreignColumns: [games.id], name: "rtg_settings_responses_game_id_games_id_fk" }),
	gameNameUnique: unique("rtg_settings_responses_game_name_unique").on(table.gameName),
}));

export const selectRtgSettingsResponsesSchema = createSelectSchema(rtgSettingsResponses);
export const insertRtgSettingsResponsesSchema = createInsertSchema(rtgSettingsResponses);
export const patchRtgSettingsResponsesSchema = insertRtgSettingsResponsesSchema.partial();
export type SelectRtgSettingsResponses = z.infer<typeof selectRtgSettingsResponsesSchema>;
export type InsertRtgSettingsResponses = z.infer<typeof insertRtgSettingsResponsesSchema>;