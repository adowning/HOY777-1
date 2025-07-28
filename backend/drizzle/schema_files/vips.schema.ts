import { pgTable, varchar, integer, text, jsonb } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const vips = pgTable("vips", {
	id: varchar('id').primaryKey().notNull(),
	level: integer('level'),
	name: text('name'),
	icon: text('icon'),
	banner: text('banner'),
	background: text('background'),
	color: text('color'),
	textColor: text("text_color"),
	progress: integer('progress'),
	progressMax: integer("progress_max"),
	progressText: text("progress_text"),
	levelUpAward: integer("level_up_award"),
	levelUpAwardReceived: integer("level_up_award_received"),
	levelUpAwardUnreceived: integer("level_up_award_unreceived"),
	levelUpAwardList: jsonb("level_up_award_list"),
	signinAward: integer('signin_award'),
	signinAwardReceived: integer("signin_award_received"),
	signinAwardUnreceived: integer("signin_award_unreceived"),
	signinAwardList: jsonb("signin_award_list"),
	awardTotal: integer("award_total"),
	awardTotalReceived: integer("award_total_received"),
	awardTotalUnreceived: integer("award_total_unreceived"),
	awardTotalList: jsonb("award_total_list"),
	depositExp: integer("deposit_exp"),
	betExp: integer("bet_exp"),
	rankBetExp: integer("rank_bet_exp"),
	rankDepositExp: integer("rank_deposit_exp"),
	freeSpinTimes: integer("free_spin_times"),
	weekGift: integer("week_gift"),
	monthGift: integer("month_gift"),
	upgradeGift: integer("upgrade_gift"),
	nowCashBack: integer("now_cash_back"),
	yesterdayCashBack: integer("yesterday_cash_back"),
	historyCashBack: integer("history_cash_back"),
});

export const selectVipsSchema = createSelectSchema(vips);
export const insertVipsSchema = createInsertSchema(vips);
export const patchVipsSchema = insertVipsSchema.partial();
export type SelectVips = z.infer<typeof selectVipsSchema>;
export type InsertVips = z.infer<typeof insertVipsSchema>;