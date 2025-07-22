import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { users } from './users';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { transformSchemaForOpenAPI } from '#/lib/schema-transformer';

export const vipInfo = pgTable('vip_info', {
    userId: text('user_id').primaryKey().references(() => users.id),
    level: integer('level').default(0),
    depositExp: integer('deposit_exp').default(0),
    betExp: integer('bet_exp').default(0),
    rankBetExp: integer('rank_bet_exp').default(0),
    rankDepositExp: integer('rank_deposit_exp').default(0),
    freeSpinTimes: integer('free_spin_times').default(0),
    weekGift: integer('week_gift').default(0),
    monthGift: integer('month_gift').default(0),
    upgradeGift: integer('upgrade_gift').default(0),
    nowCashBack: integer('now_cash_back').default(0),
    yesterdayCashBack: integer('yesterday_cash_back').default(0),
    historyCashBack: integer('history_cash_back').default(0),
});

export const vipInfoRelations = relations(vipInfo, ({ one }) => ({
    user: one(users, {
        fields: [vipInfo.userId],
        references: [users.id],
    }),
}));

export const selectVipInfoSchema = transformSchemaForOpenAPI(
  createSelectSchema(vipInfo)
);

export const insertVipInfoSchema = transformSchemaForOpenAPI(
  createInsertSchema(vipInfo).omit({
    userId: true,
  })
);
