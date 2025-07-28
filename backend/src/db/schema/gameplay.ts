import { pgTable, serial, boolean, json, timestamp, integer, text, decimal, varchar } from 'drizzle-orm/pg-core';
import { games } from './games';

export const rtgSpinResults = pgTable('rtg_spin_results', {
  id: serial('id').primaryKey(),
  gameId: varchar('game_id').references(() => games.id),
  gameName: text('game_name').notNull(),
  success: boolean('success').notNull(),

  // --- Flattened UserData ---
  userId: integer('user_id').notNull(),
  sessionId: text('session_id'),
  canGamble: boolean('can_gamble'),
  token: text('token'),
  sessionNetPosition: decimal('session_net_position'),
  serverTime: timestamp('server_time'),

  // user.balance
  balance_cash_atStart: decimal('balance_cash_at_start'),
  balance_cash_afterBet: decimal('balance_cash_after_bet'),
  balance_cash_atEnd: decimal('balance_cash_at_end'),
  balance_freeBets_atStart: decimal('balance_free_bets_at_start'),
  balance_freeBets_afterBet: decimal('balance_free_bets_after_bet'),
  balance_freeBets_atEnd: decimal('balance_free_bets_at_end'),
  balance_bonus_atStart: decimal('balance_bonus_at_start'),
  balance_bonus_afterBet: decimal('balance_bonus_after_bet'),
  balance_bonus_atEnd: decimal('balance_bonus_at_end'),

  // user.limits
  limits_betThresholdTime: integer('limits_bet_threshold_time'),

  // Array fields remain JSON as a practical choice
  bonuses: json('bonuses'),
  tournaments: json('tournaments'),
  vouchers: json('vouchers'),
  messages: json('messages'),

  // --- Flattened GameData ---
  stake: decimal('stake'),
  multiplier: decimal('multiplier'),
  win_total: decimal('win_total'),
  winsMultipliers_total: decimal('wins_multipliers_total'),
  winsMultipliers_lines: decimal('wins_multipliers_lines'),
  spinMode: text('spin_mode'),
  hasState: boolean('has_state'),

  // Array fields remain JSON
  winLines: json('win_lines'),
  fatTiles: json('fat_tiles'),
  scatters: json('scatters'),
  features: json('features'),
  reelsBuffer: json('reels_buffer'),

  // --- Metadata ---
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const rtgSettingsResponses = pgTable('rtg_settings_responses', {
  id: serial('id').primaryKey(),
  gameId: varchar('game_id').references(() => games.id),
  gameName: text('game_name').notNull().unique(),
  success: boolean('success').notNull(),
  
  // From result.user
  user_id: integer('user_id'),
  user_token: text('user_token'),
  user_session_id: text('user_session_id'),
  user_can_gamble: boolean('user_can_gamble'),
  user_country: text('user_country'),
  user_casino: text('user_casino'),
  user_currency_code: text('user_currency_code'),
  user_currency_symbol: text('user_currency_symbol'),
  user_server_time: timestamp('user_server_time'),
  
  // From result.user.balance
  user_balance_cash: decimal('user_balance_cash'),
  user_balance_free_bets: decimal('user_balance_free_bets'),
  user_balance_bonus: decimal('user_balance_bonus'),
  
  // From result.user.stakes
  user_stakes_default_index: integer('user_stakes_default_index'),
  user_stakes_last_index: integer('user_stakes_last_index'),
  
  // From result.game
  game_cols: integer('game_cols'),
  game_rows: integer('game_rows'),
  game_pays_type: text('game_pays_type'),
  game_version: text('game_version'),
  game_volatility_index: text('game_volatility_index'),
  game_rtp_default: decimal('game_rtp_default'), // Flattened from rtp.game.default
  game_has_gamble: boolean('game_has_gamble'),
  game_has_feature_buy: boolean('game_has_feature_buy'),

  // From result.launcher
  launcher_version: text('launcher_version'),

  // --- JSON Columns for Arrays & Complex Objects ---
  // Using JSON is a practical way to store arrays and deeply nested objects.
  user_bonuses: json('user_bonuses'),
  user_autoplay: json('user_autoplay'), // The 'autoplay' object is too nested to flatten practically
  game_lines: json('game_lines'),
  game_tiles: json('game_tiles'),
  game_features: json('game_features'),
  game_multiplier_sequence: json('game_multiplier_sequence'),

  // --- Metadata ---
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
