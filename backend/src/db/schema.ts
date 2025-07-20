import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  primaryKey,
  index,
  varchar,
  pgEnum,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { transformSchemaForOpenAPI } from '../lib/schema-transformer'
import { nanoid } from '#/utils/nanoid'

// Define a PostgreSQL enum for the user roles
export const roleEnum = pgEnum('role', ['admin', 'user'])

export const users = pgTable('users', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  uid: text('uid'),
  username: text('username').notNull(),
  email: text('email'),
  passwordHash: text('password_hash'),
  phone: text('phone'),
  avatar: text('avatar'),
  balance: integer('balance'),
  withdrawable: integer('withdrawable'),
  vipLevel: integer('vip_level'),
  inviteUrl: text('invite_url'),
  inviteCode: text('invite_code'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  idNumber: text('id_number'),
  emailConfirmed: boolean('email_confirmed').default(false),
  phoneConfirmed: boolean('phone_confirmed').default(false),
  dateOfBirth: text('date_of_birth'),
  county: text('county'),
  role: roleEnum('role').notNull().default('user'),
  state: text('state'),
  city: text('city'),
  address: text('address'),
  postalCode: text('postal_code'),
  language: text('language'),
  locale: text('locale'),
  initialProfileComplete: boolean('initial_profile_complete').default(false),
  isSuspended: integer('is_suspended'),
  sysCommunications: boolean('sys_communications').default(false),
  lockedPersonalInfoFields: jsonb('locked_personal_info_fields'),
  lastSeenAt: timestamp('last_seen_at'),
  lastStartedAt: timestamp('last_started_at'),
  lastSignInAt: timestamp('last_sign_in_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(), // For auto-update, a DB trigger is recommended
})

export const selectUsersSchema = transformSchemaForOpenAPI(
  createSelectSchema(users),
  {
    description: 'User details schema',
    example: {
      id: 1,
      username: 'johndoe',
      email: 'john@example.com',
      balance: 1000,
    },
  }
)

export const insertUsersSchema = transformSchemaForOpenAPI(
  createInsertSchema(users).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  {
    description: 'User creation schema',
    example: {
      username: 'newuser',
      email: 'new@example.com',
      phone: '+1234567890',
    },
  }
)

export const patchUsersSchema = transformSchemaForOpenAPI(
  insertUsersSchema.partial(),
  {
    description: 'User update schema',
    example: {
      email: 'updated@example.com',
      phone: '+1987654321',
    },
  }
)

export const vips = pgTable('vips', {
  id: varchar().primaryKey().$defaultFn(nanoid),
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

export const messages = pgTable('messages', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  userId: integer('user_id').references(() => users.id),
  read: boolean('read').default(false),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const vipLevelAwards = pgTable('vip_level_awards', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  level: integer('level'),
  award: integer('award'),
})

export const vipSigninAwards = pgTable('vip_signin_awards', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  day: integer('day'),
  award: integer('award'),
})

export const rewards = pgTable('rewards', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  name: text('name'),
  description: text('description'),
})

export const bonuses = pgTable('bonuses', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  userId: integer('user_id').references(() => users.id),
  amount: integer('amount'),
  claimed: boolean('claimed').default(false),
  type: integer('type'),
  status: integer('status'),
  now: text('now'),
  max: text('max'),
  endedAt: integer('ended_at'),
  createdAt: integer('created_at'),
  gainAmount: text('gain_amount'),
  currency: text('currency'),
  receive: integer('receive'),
  wager: integer('wager'),
  rate: integer('rate'),
  deposit: text('deposit'),
  children: jsonb('children'),
})

export const balances = pgTable('balances', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  userId: integer('user_id').references(() => users.id),
  amount: integer('amount'),
  currency: text('currency'),
  availableBalance: integer('available_balance'),
  real: text('real'),
  bonus: text('bonus'),
})

export const selectBalancesSchema = createSelectSchema(balances)

export const gameCategories = pgTable('game_categories', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  name: text('name'),
  slug: text('slug'),
  type: text('type'),
  icon: text('icon'),
  image: text('image'),
  pictures: text('pictures'),
  gameCount: integer('game_count'),
  pageNo: integer('page_no'),
})

export const selectGameCategoriesSchema = createSelectSchema(
  gameCategories
).omit({
  id: true,
  name: true,
  slug: true,
  icon: true,
  image: true,
  pictures: true,
  gameCount: true,
  pageNo: true,
})

export const games = pgTable('games', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  name: text('name'),
  provider: text('provider'),
  categoryId: integer('category_id').references(() => gameCategories.id),
})

export const vipLevels = pgTable('vip_levels', {
  id: varchar().primaryKey().$defaultFn(nanoid),
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

export const selectGamesSchema = createSelectSchema(games)

export const selectVipLevelsSchema = createSelectSchema(vipLevels)

export const banners = pgTable('banners', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  imagePath: text('image_path'),
  linkUrl: text('link_url'),
  iconPath: text('icon_path'),
  clickFeedback: integer('click_feedback'),
  content: text('content'),
})

export const announcements = pgTable('announcements', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  content: text('content'),
  startsAt: timestamp('starts_at'),
  endsAt: timestamp('ends_at'),
})

export const currencies = pgTable('currencies', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  name: text('name'),
  code: text('code'),
})

export const selectCurrenciesSchema = createSelectSchema(currencies)

export const languages = pgTable('languages', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  name: text('name'),
  code: text('code'),
})

export const countries = pgTable('countries', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  name: text('name'),
  code: text('code'),
})

export const transactions = pgTable('transactions', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  userId: integer('user_id').references(() => users.id),
  amount: integer('amount'),
  type: text('type'),
  status: text('status'),
  note: text('note'),
  balance: integer('balance'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const selectTransactionsSchema = transformSchemaForOpenAPI(
  createSelectSchema(transactions),
  {
    description: 'Transaction details schema',
    example: {
      id: 1,
      userId: 123,
      amount: 1000,
      type: 'deposit',
      status: 'completed',
    },
  }
)

export const insertTransactionsSchema = transformSchemaForOpenAPI(
  createInsertSchema(transactions).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  {
    description: 'Transaction creation schema',
    example: {
      userId: 123,
      amount: 1000,
      type: 'deposit',
    },
  }
)

export const patchTransactionsSchema = transformSchemaForOpenAPI(
  insertTransactionsSchema.partial(),
  {
    description: 'Transaction update schema',
    example: {
      status: 'completed',
    },
  }
)
export const deposits = pgTable('deposits', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  userId: integer('user_id').references(() => users.id),
  amount: integer('amount'),
  status: text('status'),
  idNumber: text('id_number'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  channelsId: text('channels_id'),
  note: text('note'),
  currency: text('currency'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const selectDepositsSchema = transformSchemaForOpenAPI(
  createSelectSchema(deposits),
  {
    description: 'Deposit details schema',
    example: {
      id: 1,
      userId: 123,
      amount: 1000,
      status: 'completed',
      currency: 'USD',
    },
  }
)

export const insertDepositsSchema = transformSchemaForOpenAPI(
  createInsertSchema(deposits).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  {
    description: 'Deposit creation schema',
    example: {
      userId: 123,
      amount: 1000,
      currency: 'USD',
    },
  }
)

export const patchDepositsSchema = transformSchemaForOpenAPI(
  insertDepositsSchema.partial(),
  {
    description: 'Deposit update schema',
    example: {
      status: 'completed',
    },
  }
)

export const withdrawals = pgTable('withdrawals', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  userId: integer('user_id').references(() => users.id),
  amount: integer('amount'),
  status: text('status'),
  idNumber: text('id_number'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  channelsId: text('channels_id'),
  note: text('note'),
  currencyType: text('currency_type'),
  currency: text('currency'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const selectWithdrawalsSchema = transformSchemaForOpenAPI(
  createSelectSchema(withdrawals),
  {
    description: 'Withdrawal details schema',
    example: {
      id: 1,
      userId: 123,
      amount: 500,
      status: 'pending',
      currency: 'USD',
    },
  }
)

export const insertWithdrawalsSchema = transformSchemaForOpenAPI(
  createInsertSchema(withdrawals).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  {
    description: 'Withdrawal creation schema',
    example: {
      userId: 123,
      amount: 500,
      currency: 'USD',
    },
  }
)

export const patchWithdrawalsSchema = transformSchemaForOpenAPI(
  insertWithdrawalsSchema.partial(),
  {
    description: 'Withdrawal update schema',
    example: {
      status: 'completed',
    },
  }
)

export const achievements = pgTable('achievements', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  name: text('name'),
  description: text('description'),
})

export const selectAchievementsSchema = transformSchemaForOpenAPI(
  createSelectSchema(achievements),
  {
    description: 'Achievement details schema',
    example: {
      id: 1,
      name: 'First Deposit',
      description: 'Reward for making first deposit',
    },
  }
)

export const insertAchievementsSchema = transformSchemaForOpenAPI(
  createInsertSchema(achievements).omit({
    id: true,
  }),
  {
    description: 'Achievement creation schema',
    example: {
      name: 'New Achievement',
      description: 'Description of new achievement',
    },
  }
)

export const patchAchievementsSchema = transformSchemaForOpenAPI(
  insertAchievementsSchema.partial(),
  {
    description: 'Achievement update schema',
    example: {
      description: 'Updated description',
    },
  }
)

export const invites = pgTable('invites', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  inviterId: integer('inviter_id').references(() => users.id),
  inviteeId: integer('invitee_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const selectInvitesSchema = transformSchemaForOpenAPI(
  createSelectSchema(invites),
  {
    description: 'Invite details schema',
    example: {
      id: 1,
      inviterId: 123,
      inviteeId: 456,
      createdAt: '2025-01-01T00:00:00Z',
    },
  }
)

export const insertInvitesSchema = transformSchemaForOpenAPI(
  createInsertSchema(invites).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  {
    description: 'Invite creation schema',
    example: {
      inviterId: 123,
      inviteeId: 456,
    },
  }
)

export const patchInvitesSchema = transformSchemaForOpenAPI(
  insertInvitesSchema.partial(),
  {
    description: 'Invite update schema',
    example: {
      inviteeId: 789,
    },
  }
)

export const promos = pgTable('promos', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  promoGroupId: integer('promo_group_id').references(() => promoGroups.id),
  name: text('name'),
  description: text('description'),
  code: text('code'),
  imagePath: text('image_path'),
  text: text('text'),
  desc: text('desc'),
  countdown: boolean('countdown'),
  content: text('content'),
  clickFeedback: integer('click_feedback'),
  buttonPath: text('button_path'),
  buttonText: text('button_text'),
})

export const achievementItems = pgTable('achievement_items', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  index: integer('index'),
  num: integer('num'),
  award: integer('award'),
  state: integer('state'),
  rate: integer('rate'),
})

export const explainItems = pgTable('explain_items', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  index: integer('index'),
  num: integer('num'),
  award: integer('award'),
  status: integer('status'),
  rate: integer('rate'),
})

export const liveWins = pgTable('live_wins', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  image: text('image'),
  level: integer('level'),
  gameName: text('game_name'),
  bettingAmount: text('betting_amount'),
})

export const statistics = pgTable('statistics', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  todayDepositedUser: integer('today_deposited_user'),
  yesterdayDepositedUser: integer('yesterday_deposited_user'),
  todayRevenue: integer('today_revenue'),
  yesterdayRevenue: integer('yesterday_revenue'),
  thisMonthDepositedUser: integer('this_month_deposited_user'),
  thisMonthRevenue: integer('this_month_revenue'),
  totalRegisteredUser: integer('total_registered_user'),
  totalDepositingUser: integer('total_depositing_user'),
  totalRevenue: integer('total_revenue'),
})

export const chatMessages = pgTable('chat_messages', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  type: text('type'),
  avatar: text('avatar'),
  grade: text('grade'),
  gradeColor: text('grade_color'),
  gradeBackground: text('grade_background'),
  sender: text('sender'),
  receiver: text('receiver'),
  message: text('message'),
  starLevel: jsonb('star_level'),
})

export const gameHistory = pgTable('game_history', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  name: text('name'),
  createdAt: integer('created_at'),
  amount: text('amount'),
  multiplier: text('multiplier'),
  betId: text('bet_id'),
  status: text('status'),
  profit: integer('profit'),
})

export const gameBigWins = pgTable('game_big_wins', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  gameId: text('game_id'),
  gameName: text('game_name'),
  gameIcon: text('game_icon'),
  userName: text('user_name'),
  userVipGroup: integer('user_vip_group'),
  userVipLevel: integer('user_vip_level'),
  betAmount: text('bet_amount'),
  multiplier: text('multiplier'),
  winAmount: text('win_amount'),
  time: integer('time'),
})

export const selectGameBigWinsSchema = createSelectSchema(gameBigWins)

export const inviteHistory = pgTable('invite_history', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  time: text('time'),
  user: text('user'),
  bonus: text('bonus'),
})

export const vipTasks = pgTable('vip_tasks', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  index: integer('index'),
  taskId: integer('task_id'),
  taskType: integer('task_type'),
  taskTerms: jsonb('task_terms'),
  state: integer('state'),
  award: integer('award'),
})

export const vipRebateHistory = pgTable('vip_rebate_history', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  notesId: text('notes_id'),
  createdAt: text('created_at'),
  amount: text('amount'),
  cashBack: text('cash_back'),
  vipLevel: text('vip_level'),
  vipRate: text('vip_rate'),
  gameType: text('game_type'),
})

export const vipLevelRewardHistory = pgTable('vip_level_reward_history', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  notesId: text('notes_id'),
  createdAt: text('created_at'),
  amount: text('amount'),
  vipLevel: text('vip_level'),
  type: text('type'),
})

export const vipTimesHistory = pgTable('vip_times_history', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  notesId: text('notes_id'),
  createdAt: text('created_at'),
  amount: text('amount'),
  vipLevel: text('vip_level'),
  type: text('type'),
})

export const promoGroups = pgTable('promo_groups', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  name: text('name').notNull(),
})

export const selectPromoGroupsSchema = transformSchemaForOpenAPI(
  createSelectSchema(promoGroups)
)
export const insertPromoGroupsSchema = transformSchemaForOpenAPI(
  createInsertSchema(promoGroups)
)

export const userRewards = pgTable(
  'user_rewards',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    achievementBonus: text('achievement_bonus').default('0'),
    achievementStatus: integer('achievement_status').notNull().default(0), // 0: locked, 1: available, 2: claimed
    cashBack: text('cash_back').default('0'),
    weeklyBonus: text('weekly_bonus').default('0'),
    levelUpBonuses: integer('level_up_bonuses').notNull().default(0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId] }),
  })
)

export const selectUserRewardsSchema = transformSchemaForOpenAPI(
  createSelectSchema(userRewards)
)
export const insertUserRewardsSchema = transformSchemaForOpenAPI(
  createInsertSchema(userRewards)
)
export const patchUserRewardsSchema = transformSchemaForOpenAPI(
  insertUserRewardsSchema.partial()
)

export const inviteStats = pgTable(
  'invite_stats',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    bonusMonth: text('bonus_month').default('0'),
    bonusToday: text('bonus_today').default('0'),
    bonusTotal: text('bonus_total').default('0'),
    bonusYesterdays: text('bonus_yesterdays').default('0'),
    depositUsers: integer('deposit_users').default(0),
    depositUsersMonth: integer('deposit_users_month').default(0),
    depositUsersToday: integer('deposit_users_today').default(0),
    depositUsersYesterdays: integer('deposit_users_yesterdays').default(0),
    invitedUsers: integer('invited_users').default(0),
    availableBonus: text('available_bonus').default('0'),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId] }),
  })
)

export const selectInviteStatsSchema = transformSchemaForOpenAPI(
  createSelectSchema(inviteStats)
)
export const insertInviteStatsSchema = transformSchemaForOpenAPI(
  createInsertSchema(inviteStats)
)
export const patchInviteStatsSchema = transformSchemaForOpenAPI(
  insertInviteStatsSchema.partial()
)

export const inviteCommissionHistory = pgTable('invite_commission_history', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  fromUserId: integer('from_user_id').references(() => users.id),
  bonus: text('bonus').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const selectInviteCommissionHistorySchema = transformSchemaForOpenAPI(
  createSelectSchema(inviteCommissionHistory)
)
export const insertInviteCommissionHistorySchema = transformSchemaForOpenAPI(
  createInsertSchema(inviteCommissionHistory)
)

export const userAchievements = pgTable('user_achievements', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  achievementId: integer('achievement_id')
    .notNull()
    .references(() => achievements.id),
  progress: integer('progress').notNull().default(0),
  status: integer('status').notNull().default(0), // 0: in-progress, 1: completed, 2: claimed
})

export const selectUserAchievementsSchema = transformSchemaForOpenAPI(
  createSelectSchema(userAchievements)
)
export const insertUserAchievementsSchema = transformSchemaForOpenAPI(
  createInsertSchema(userAchievements)
)
export const patchUserAchievementsSchema = transformSchemaForOpenAPI(
  insertUserAchievementsSchema.partial()
)

/**
 * -----------------------------------------------------------------------------
 * Enums
 * -----------------------------------------------------------------------------
 * This enum is derived from the `PaymentMethod` type in your Prisma schema.
 */
export const paymentMethodEnum = pgEnum('payment_method', [
  'INSTORE_CASH',
  'CREDIT_CARD',
  'BANK_TRANSFER',
  'CRYPTO',
])

/**
 * -----------------------------------------------------------------------------
 * Tables
 * -----------------------------------------------------------------------------
 */

export const operators = pgTable('operators', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  name: text('name').notNull().unique(),
  operatorSecret: text('operator_secret').notNull(),
  operatorAccess: text('operator_access').notNull(),
  callbackUrl: text('callback_url').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  allowedIps: text('allowed_ips').array().notNull(),
  description: text('description'),
  balance: integer('balance').default(0).notNull(),
  netRevenue: integer('net_revenue').default(0).notNull(),
  acceptedPayments: paymentMethodEnum('accepted_payments').array().notNull(),
  ownerId: text('owner_id'),
  lastUsedAt: timestamp('last_used_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const products = pgTable('products', {
  id: varchar().primaryKey().$defaultFn(nanoid),
  title: text('title').default('default').notNull(),
  productType: text('product_type').default('bundle').notNull(),
  bonusTotalInCents: integer('bonus_total_in_credits').default(0).notNull(),
  isActive: boolean('is_active'),
  priceInCents: integer('price_in_cents').default(0).notNull(),
  amountToReceiveInCents: integer('amount_to_receive_in_credits')
    .default(0)
    .notNull(),
  bestValue: integer('best_value').default(0).notNull(),
  discountInCents: integer('discount_in_cents').default(0).notNull(),
  bonusSpins: integer('bonus_spins').default(0).notNull(),
  isPromo: boolean('is_promo').default(false),
  totalDiscountInCents: integer('total_discount_in_cents').default(0).notNull(),
  operatorId: text('operator_id').references(() => operators.id, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
export const wallets = pgTable(
  'wallets',
  {
    id: varchar().primaryKey().$defaultFn(nanoid),
    balance: integer('balance').default(0).notNull(),
    paymentMethod: paymentMethodEnum('payment_method')
      .default('INSTORE_CASH')
      .notNull(),
    currency: varchar('currency', { length: 3 }).default('USD').notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    isDefault: boolean('is_default').default(false).notNull(),
    address: varchar('address', { length: 255 }).unique(),
    cashtag: varchar('cashtag', { length: 50 }).unique(),

    /**
     * By making `userId` both `notNull` and `unique`, you enforce that:
     * 1. A wallet MUST belong to a user.
     * 2. It can only belong to ONE user.
     */
    userId: text('user_id')
      .notNull() // <-- This is the required change
      .unique()
      .references(() => users.id, { onDelete: 'cascade' }),

    // This is already non-nullable, so a wallet must have an operator.
    operatorId: text('operator_id')
      .notNull()
      .references(() => operators.id, { onDelete: 'cascade' }),

    lastUsedAt: timestamp('last_used_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => {
    return {
      userIdIdx: index('wallet_user_id_idx').on(table.userId),
      operatorIdIdx: index('wallet_operator_id_idx').on(table.operatorId),
      isActiveIdx: index('wallet_is_active_idx').on(table.isActive),
      cashtagIdx: index('wallet_cashtag_idx').on(table.cashtag),
    }
  }
)
