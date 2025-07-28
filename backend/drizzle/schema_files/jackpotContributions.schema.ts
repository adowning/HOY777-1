import { pgTable, varchar, text, integer, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const jackpotContributions = pgTable("jackpot_contributions", {
	id: varchar('id').primaryKey().notNull(),
	jackpotId: text("jackpot_id").notNull(),
	gameSpinId: text("game_spin_id").notNull(),
	contributionAmountCoins: integer("contribution_amount_coins").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const selectJackpotContributionsSchema = createSelectSchema(jackpotContributions);
export const insertJackpotContributionsSchema = createInsertSchema(jackpotContributions);
export const patchJackpotContributionsSchema = insertJackpotContributionsSchema.partial();
export type SelectJackpotContributions = z.infer<typeof selectJackpotContributionsSchema>;
export type InsertJackpotContributions = z.infer<typeof insertJackpotContributionsSchema>;