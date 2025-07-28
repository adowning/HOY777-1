import { pgTable, text, integer, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const vipInfo = pgTable("vip_info", {
	userId: text("user_id").primaryKey().notNull(),
	level: integer('level').default(0),
	depositExp: integer("deposit_exp").default(0),
	betExp: integer("bet_exp").default(0),
	rankBetExp: integer("rank_bet_exp").default(0),
	rankDepositExp: integer("rank_deposit_exp").default(0),
	freeSpinTimes: integer("free_spin_times").default(0),
	weekGift: integer("week_gift").default(0),
	monthGift: integer("month_gift").default(0),
	upgradeGift: integer("upgrade_gift").default(0),
	nowCashBack: integer("now_cash_back").default(0),
	yesterdayCashBack: integer("yesterday_cash_back").default(0),
	historyCashBack: integer("history_cash_back").default(0),
}, (table) => ({
	userIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "vip_info_user_id_users_id_fk"
		}),
}));

export const selectVipInfoSchema = createSelectSchema(vipInfo);
export const insertVipInfoSchema = createInsertSchema(vipInfo);
export const patchVipInfoSchema = insertVipInfoSchema.partial();
export type SelectVipInfo = z.infer<typeof selectVipInfoSchema>;
export type InsertVipInfo = z.infer<typeof insertVipInfoSchema>;