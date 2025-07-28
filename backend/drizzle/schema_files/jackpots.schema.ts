import { pgTable, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { jackpotTypeEnum } from "./enums.schema"

export const jackpots = pgTable("jackpots", {
	id: varchar('id').primaryKey().notNull(),
	type: jackpotTypeEnum('type').notNull(),
	currentAmountCoins: integer("current_amount_coins").default(0).notNull(),
	seedAmountCoins: integer("seed_amount_coins").default(0).notNull(),
	minimumBetCoins: integer("minimum_bet_coins").default(1).notNull(),
	contributionRateBasisPoints: integer("contribution_rate_basis_points").default(0).notNull(),
	probabilityPerMillion: integer("probability_per_million").default(0).notNull(),
	minimumTimeBetweenWinsMinutes: integer("minimum_time_between_wins_minutes").default(0).notNull(),
	lastWonAt: timestamp("last_won_at", { mode: 'string' }),
	lastWonBy: text("last_won_by"),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const selectJackpotsSchema = createSelectSchema(jackpots);
export const insertJackpotsSchema = createInsertSchema(jackpots);
export const patchJackpotsSchema = insertJackpotsSchema.partial();
export type SelectJackpots = z.infer<typeof selectJackpotsSchema>;
export type InsertJackpots = z.infer<typeof insertJackpotsSchema>;