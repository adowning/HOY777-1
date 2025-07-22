// db/schema/vips.ts
import { integer, jsonb, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { nanoid } from '../../utils/nanoid'
import { users } from './users'

export const vips = pgTable('vips', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  level: integer('level'),
  name: text('name'),
  icon: text('icon'),
  banner: text('banner'),
  background: text('background'),
  color: text('color'),
  textColor: text('text_color'),
  progress: integer('progress'),
  progressMax: integer('progress_max'),
  progressText: text('progress_text'),
  levelUpAward: integer('level_up_award'),
  levelUpAwardReceived: integer('level_up_award_received'),
  levelUpAwardUnreceived: integer('level_up_award_unreceived'),
  levelUpAwardList: jsonb('level_up_award_list'),
  signinAward: integer('signin_award'),
  signinAwardReceived: integer('signin_award_received'),
  signinAwardUnreceived: integer('signin_award_unreceived'),
  signinAwardList: jsonb('signin_award_list'),
  awardTotal: integer('award_total'),
  awardTotalReceived: integer('award_total_received'),
  awardTotalUnreceived: integer('award_total_unreceived'),
  awardTotalList: jsonb('award_total_list'),
  depositExp: integer('deposit_exp'),
  betExp: integer('bet_exp'),
  rankBetExp: integer('rank_bet_exp'),
  rankDepositExp: integer('rank_deposit_exp'),
  freeSpinTimes: integer('free_spin_times'),
  weekGift: integer('week_gift'),
  monthGift: integer('month_gift'),
  upgradeGift: integer('upgrade_gift'),
  nowCashBack: integer('now_cash_back'),
  yesterdayCashBack: integer('yesterday_cash_back'),
  historyCashBack: integer('history_cash_back'),
})



export const vipLevels = pgTable('vip_levels', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  level: integer('level'),
  name: text('name'),
  rankId: integer('rank_id'),
  protectionConditions: integer('protection_conditions'),
  depositExp: integer('deposit_exp'),
  betExp: integer('bet_exp'),
  freeSpinsTimes: integer('free_spins_times'),
  uprankAward: integer('uprank_award'),
  weekAward: integer('week_award'),
  withdrawalsAmount: integer('withdrawals_amount'),
  withdrawalTimes: integer('withdrawal_times'),
  monthWithdrawalsAmount: integer('month_withdrawals_amount'),
  monthWithdrawalsTimes: integer('month_withdrawals_times'),
  monthAward: integer('month_award'),
  freeWithdrawals: integer('free_withdrawals'),
  freeWithdrawalsTimes: integer('free_withdrawals_times'),
  withdrawalFee: integer('withdrawal_fee'),
  betAwardRate: jsonb('bet_award_rate'),
  signinAward: jsonb('signin_award'),
  tasksMax: integer('tasks_max'),
  depositRate: integer('deposit_rate'),
  betRate: integer('bet_rate'),
  availableDailyBonusTime: text('available_daily_bonus_time'),
  collectableWeekBonusDay: text('collectable_week_bonus_day'),
  collectableMonthBonusDay: text('collectable_month_bonus_day'),
})

export const vipLevelAwards = pgTable('vip_level_awards', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  level: integer('level'),
  award: integer('award'),
})

export const vipSigninAwards = pgTable('vip_signin_awards', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  day: integer('day'),
  award: integer('award'),
})

export const vipTasks = pgTable('vip_tasks', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id').references(() => users.id),
  index: integer('index'),
  taskId: integer('task_id'),
  taskType: integer('task_type'),
  taskTerms: jsonb('task_terms'),
  state: integer('state'),
  award: integer('award'),
})

export const vipRebateHistory = pgTable('vip_rebate_history', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id').references(() => users.id),
  notesId: text('notes_id'),
  createdAt: text('created_at'),
  amount: text('amount'),
  cashBack: text('cash_back'),
  vipLevel: text('vip_level'),
  vipRate: text('vip_rate'),
  gameType: text('game_type'),
})

export const vipLevelRewardHistory = pgTable('vip_level_reward_history', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id').references(() => users.id),
  notesId: text('notes_id'),
  createdAt: text('created_at'),
  amount: text('amount'),
  vipLevel: text('vip_level'),
  type: text('type'),
})

export const vipTimesHistory = pgTable('vip_times_history', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id').references(() => users.id),
  notesId: text('notes_id'),
  createdAt: text('created_at'),
  amount: text('amount'),
  vipLevel: text('vip_level'),
  type: text('type'),
})

export const selectVipLevelsSchema = createSelectSchema(vipLevels)
