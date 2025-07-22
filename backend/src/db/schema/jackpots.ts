import { sql } from "drizzle-orm";
import { text, integer, timestamp, pgEnum, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { boolean } from "drizzle-orm/pg-core";

export const jackpotTypeEnum = pgEnum('jackpot_type_enum', ['GRAND', 'MAJOR', 'MINOR', 'MINI']);


export const jackpots = pgTable('jackpots', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
    type: jackpotTypeEnum('type').notNull(),
    currentAmountCoins: integer('current_amount_coins').default(0).notNull(),
    seedAmountCoins: integer('seed_amount_coins').default(0).notNull(),
    minimumBetCoins: integer('minimum_bet_coins').default(1).notNull(),
    contributionRateBasisPoints: integer('contribution_rate_basis_points').default(0).notNull(),
    probabilityPerMillion: integer('probability_per_million').default(0).notNull(),
    minimumTimeBetweenWinsMinutes: integer('minimum_time_between_wins_minutes').default(0).notNull(),
    lastWonAt: timestamp('last_won_at'),
    lastWonBy: text('last_won_by'),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').default(sql`now()`),
});

export const jackpotContributions = pgTable('jackpot_contributions', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
    jackpotId: text('jackpot_id').notNull(),
    gameSpinId: text('game_spin_id').notNull(),
    contributionAmountCoins: integer('contribution_amount_coins').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
    return {
        unique: sql`unique(${table.jackpotId}, ${table.gameSpinId})`
    }
});

export const jackpotWins = pgTable('jackpot_wins', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
    jackpotId: text('jackpot_id').notNull(),
    winnerId: text('winner_id').notNull(),
    winAmountCoins: integer('win_amount_coins').notNull(),
    gameSpinId: text('game_spin_id').unique().notNull(),
    transactionId: text('transaction_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
