import { pgTable, varchar, text, jsonb, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const vipLevels = pgTable("vip_levels", {
	id: varchar('id').primaryKey().notNull(),
	level: integer('level'),
	name: text('name'),
	rankId: integer("rank_id"),
	protectionConditions: integer("protection_conditions"),
	depositExp: integer("deposit_exp"),
	betExp: integer("bet_exp"),
	freeSpinsTimes: integer("free_spins_times"),
	uprankAward: integer("uprank_award"),
	weekAward: integer("week_award"),
	withdrawalsAmount: integer("withdrawals_amount"),
	withdrawalTimes: integer("withdrawal_times"),
	monthWithdrawalsAmount: integer("month_withdrawals_amount"),
	monthWithdrawalsTimes: integer("month_withdrawals_times"),
	monthAward: integer("month_award"),
	freeWithdrawals: integer("free_withdrawals"),
	freeWithdrawalsTimes: integer("free_withdrawals_times"),
	withdrawalFee: integer("withdrawal_fee"),
	betAwardRate: jsonb("bet_award_rate"),
	signinAward: jsonb("signin_award"),
	tasksMax: integer("tasks_max"),
	depositRate: integer("deposit_rate"),
	betRate: integer("bet_rate"),
	availableDailyBonusTime: text("available_daily_bonus_time"),
	collectableWeekBonusDay: text("collectable_week_bonus_day"),
	collectableMonthBonusDay: text("collectable_month_bonus_day"),
});

export const selectVipLevelsSchema = createSelectSchema(vipLevels);
export const insertVipLevelsSchema = createInsertSchema(vipLevels);
export const patchVipLevelsSchema = insertVipLevelsSchema.partial();
export type SelectVipLevels = z.infer<typeof selectVipLevelsSchema>;
export type InsertVipLevels = z.infer<typeof insertVipLevelsSchema>;