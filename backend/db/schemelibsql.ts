import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { transformSchemaForOpenAPI } from "../lib/schema-transformer";

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uid: text('uid'),
    username: text("username")
    .notNull(),
  email: text('email'),
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
  emailConfirmed: integer('email_confirmed', { mode: 'boolean' }).default(false),
  phoneConfirmed: integer('phone_confirmed', { mode: 'boolean' }).default(false),
  dateOfBirth: text('date_of_birth'),
  county: text('county'),
  state: text('state'),
  city: text('city'),
  address: text('address'),
  postalCode: text('postal_code'),
  language: text('language'),
  locale: text('locale'),
  initialProfileComplete: integer('initial_profile_complete', { mode: 'boolean' }).default(false),
  isSuspended: integer('is_suspended'),
  sysCommunications: integer('sys_communications', { mode: 'boolean' }).default(false),
  lockedPersonalInfoFields: text('locked_personal_info_fields', { mode: 'json' }),
   createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),});

export const selectUsersSchema = transformSchemaForOpenAPI(
  createSelectSchema(users),
  {
    description: "User details schema",
    example: {
      id: 1,
      username: "johndoe",
      email: "john@example.com",
      balance: 1000
    }
  }
);

export const insertUsersSchema = transformSchemaForOpenAPI(
  createInsertSchema(users).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  {
    description: "User creation schema",
    example: {
      username: "newuser",
      email: "new@example.com",
      phone: "+1234567890"
    }
  }
);

export const patchUsersSchema = transformSchemaForOpenAPI(
  insertUsersSchema.partial(),
  {
    description: "User update schema",
    example: {
      email: "updated@example.com",
      phone: "+1987654321"
    }
  }
);

export const vips = sqliteTable('vips', {
    id: integer('id').primaryKey({ autoIncrement: true }),
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
    levelUpAwardList: text('level_up_award_list', { mode: 'json' }),
    signinAward: integer('signin_award'),
    signinAwardReceived: integer('signin_award_received'),
    signinAwardUnreceived: integer('signin_award_unreceived'),
    signinAwardList: text('signin_award_list', { mode: 'json' }),
    awardTotal: integer('award_total'),
    awardTotalReceived: integer('award_total_received'),
    awardTotalUnreceived: integer('award_total_unreceived'),
    awardTotalList: text('award_total_list', { mode: 'json' }),
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
});


export const messages = sqliteTable('messages', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').references(() => users.id),
    read: integer('read', { mode: 'boolean' }).default(false),
    content: text('content'),
     createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),});


export const vipLevelAwards = sqliteTable('vip_level_awards', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    level: integer('level'),
    award: integer('award'),
});

export const vipSigninAwards = sqliteTable('vip_signin_awards', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    day: integer('day'),
    award: integer('award'),
});

export const rewards = sqliteTable('rewards', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    description: text('description'),
});

export const bonuses = sqliteTable('bonuses', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').references(() => users.id),
    amount: integer('amount'),
    claimed: integer('claimed', { mode: 'boolean' }).default(false),
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
    children: text('children', { mode: 'json' }),
});

export const balances = sqliteTable('balances', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').references(() => users.id),
    amount: integer('amount'),
    currency: text('currency'),
    availableBalance: integer('available_balance'),
    real: text('real'),
    bonus: text('bonus'),
});

export const selectBalancesSchema = createSelectSchema(balances);

export const gameCategories = sqliteTable('game_categories', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    slug: text('slug'),
    icon: text('icon'),
    image: text('image'),
    pictures: text('pictures'),
    gameCount: integer('game_count'),
    pageNo: integer('page_no'),
});

export const games = sqliteTable('games', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    provider: text('provider'),
    categoryId: integer('category_id').references(() => gameCategories.id),
});

export const vipLevels = sqliteTable('vip_levels', {
    id: integer('id').primaryKey({ autoIncrement: true }),
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
    betAwardRate: text('bet_award_rate', { mode: 'json' }),
    signinAward: text('signin_award', { mode: 'json' }),
    tasksMax: integer('tasks_max'),
    depositRate: integer('deposit_rate'),
    betRate: integer('bet_rate'),
    availableDailyBonusTime: text('available_daily_bonus_time'),
    collectableWeekBonusDay: text('collectable_week_bonus_day'),
    collectableMonthBonusDay: text('collectable_month_bonus_day'),
});

export const banners = sqliteTable('banners', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    imageUrl: text('image_url'),
    linkUrl: text('link_url'),
    iconPath: text('icon_path'),
    clickFeedback: integer('click_feedback'),
    content: text('content'),
});

export const announcements = sqliteTable('announcements', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    content: text('content'),
    startsAt: integer('starts_at', { mode: 'timestamp' }),
    endsAt: integer('ends_at', { mode: 'timestamp' }),
});

export const currencies = sqliteTable('currencies', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    code: text('code'),
});

export const selectCurrenciesSchema = createSelectSchema(currencies);

export const languages = sqliteTable('languages', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    code: text('code'),
});

export const countries = sqliteTable('countries', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    code: text('code'),
});

export const transactions = sqliteTable('transactions', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').references(() => users.id),
    amount: integer('amount'),
    type: text('type'),
    status: text('status'),
   createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),});

export const selectTransactionsSchema = transformSchemaForOpenAPI(
  createSelectSchema(transactions),
  {
    description: "Transaction details schema",
    example: {
      id: 1,
      userId: 123,
      amount: 1000,
      type: "deposit",
      status: "completed"
    }
  }
);

export const insertTransactionsSchema = transformSchemaForOpenAPI(
  createInsertSchema(transactions).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  {
    description: "Transaction creation schema",
    example: {
      userId: 123,
      amount: 1000,
      type: "deposit"
    }
  }
);

export const patchTransactionsSchema = transformSchemaForOpenAPI(
  insertTransactionsSchema.partial(),
  {
    description: "Transaction update schema",
    example: {
      status: "completed"
    }
  }
);
export const deposits = sqliteTable('deposits', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').references(() => users.id),
    amount: integer('amount'),
    status: text('status'),
    idNumber: text('id_number'),
    firstName: text('first_name'),
    lastName: text('last_name'),
    channelsId: text('channels_id'),
    note: text('note'),
    currency: text('currency'),
      createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),});

export const selectDepositsSchema = transformSchemaForOpenAPI(
  createSelectSchema(deposits),
  {
    description: "Deposit details schema",
    example: {
      id: 1,
      userId: 123,
      amount: 1000,
      status: "completed",
      currency: "USD"
    }
  }
);

export const insertDepositsSchema = transformSchemaForOpenAPI(
  createInsertSchema(deposits).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  {
    description: "Deposit creation schema",
    example: {
      userId: 123,
      amount: 1000,
      currency: "USD"
    }
  }
);

export const patchDepositsSchema = transformSchemaForOpenAPI(
  insertDepositsSchema.partial(),
  {
    description: "Deposit update schema",
    example: {
      status: "completed"
    }
  }
);

export const withdrawals = sqliteTable('withdrawals', {
    id: integer('id').primaryKey({ autoIncrement: true }),
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
      createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),});

export const selectWithdrawalsSchema = transformSchemaForOpenAPI(
  createSelectSchema(withdrawals),
  {
    description: "Withdrawal details schema",
    example: {
      id: 1,
      userId: 123,
      amount: 500,
      status: "pending",
      currency: "USD"
    }
  }
);

export const insertWithdrawalsSchema = transformSchemaForOpenAPI(
  createInsertSchema(withdrawals).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  {
    description: "Withdrawal creation schema",
    example: {
      userId: 123,
      amount: 500,
      currency: "USD"
    }
  }
);

export const patchWithdrawalsSchema = transformSchemaForOpenAPI(
  insertWithdrawalsSchema.partial(),
  {
    description: "Withdrawal update schema",
    example: {
      status: "completed"
    }
  }
);

export const achievements = sqliteTable('achievements', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    description: text('description'),
});

export const selectAchievementsSchema = transformSchemaForOpenAPI(
  createSelectSchema(achievements),
  {
    description: "Achievement details schema",
    example: {
      id: 1,
      name: "First Deposit",
      description: "Reward for making first deposit"
    }
  }
);

export const insertAchievementsSchema = transformSchemaForOpenAPI(
  createInsertSchema(achievements).omit({
    id: true
  }),
  {
    description: "Achievement creation schema",
    example: {
      name: "New Achievement",
      description: "Description of new achievement"
    }
  }
);

export const patchAchievementsSchema = transformSchemaForOpenAPI(
  insertAchievementsSchema.partial(),
  {
    description: "Achievement update schema",
    example: {
      description: "Updated description"
    }
  }
);

export const invites = sqliteTable('invites', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    inviterId: integer('inviter_id').references(() => users.id),
    inviteeId: integer('invitee_id').references(() => users.id),
       createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),});

export const selectInvitesSchema = transformSchemaForOpenAPI(
  createSelectSchema(invites),
  {
    description: "Invite details schema",
    example: {
      id: 1,
      inviterId: 123,
      inviteeId: 456,
      createdAt: "2025-01-01T00:00:00Z"
    }
  }
);

export const insertInvitesSchema = transformSchemaForOpenAPI(
  createInsertSchema(invites).omit({
    id: true,
    createdAt: true,
    updatedAt: true
  }),
  {
    description: "Invite creation schema",
    example: {
      inviterId: 123,
      inviteeId: 456
    }
  }
);

export const patchInvitesSchema = transformSchemaForOpenAPI(
  insertInvitesSchema.partial(),
  {
    description: "Invite update schema",
    example: {
      inviteeId: 789
    }
  }
);

export const promos = sqliteTable('promos', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    description: text('description'),
    code: text('code'),
    imagePath: text('image_path'),
    text: text('text'),
    desc: text('desc'),
    countdown: integer('countdown', { mode: 'boolean' }),
    content: text('content'),
    clickFeedback: integer('click_feedback'),
    buttonPath: text('button_path'),
    buttonText: text('button_text'),
});

export const achievementItems = sqliteTable('achievement_items', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    index: integer('index'),
    num: integer('num'),
    award: integer('award'),
    state: integer('state'),
    rate: integer('rate'),
});

export const explainItems = sqliteTable('explain_items', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    index: integer('index'),
    num: integer('num'),
    award: integer('award'),
    status: integer('status'),
    rate: integer('rate'),
});

export const liveWins = sqliteTable('live_wins', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    image: text('image'),
    level: integer('level'),
    gameName: text('game_name'),
    bettingAmount: text('betting_amount'),
});

export const statistics = sqliteTable('statistics', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    todayDepositedUser: integer('today_deposited_user'),
    yesterdayDepositedUser: integer('yesterday_deposited_user'),
    todayRevenue: integer('today_revenue'),
    yesterdayRevenue: integer('yesterday_revenue'),
    thisMonthDepositedUser: integer('this_month_deposited_user'),
    thisMonthRevenue: integer('this_month_revenue'),
    totalRegisteredUser: integer('total_registered_user'),
    totalDepositingUser: integer('total_depositing_user'),
    totalRevenue: integer('total_revenue'),
});

export const chatMessages = sqliteTable('chat_messages', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    type: text('type'),
    avatar: text('avatar'),
    grade: text('grade'),
    gradeColor: text('grade_color'),
    gradeBackground: text('grade_background'),
    sender: text('sender'),
    receiver: text('receiver'),
    message: text('message'),
    starLevel: text('star_level', { mode: 'json' }),
});

export const gameHistory = sqliteTable('game_history', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    createdAt: integer('created_at'),
    amount: text('amount'),
    multiplier: text('multiplier'),
    betId: text('bet_id'),
    status: text('status'),
    profit: integer('profit'),
});

export const gameBigWins = sqliteTable('game_big_wins', {
    id: integer('id').primaryKey({ autoIncrement: true }),
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
});

export const inviteHistory = sqliteTable('invite_history', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    time: text('time'),
    user: text('user'),
    bonus: text('bonus'),
});

export const vipTasks = sqliteTable('vip_tasks', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    index: integer('index'),
    taskId: integer('task_id'),
    taskType: integer('task_type'),
    taskTerms: text('task_terms', { mode: 'json' }),
    state: integer('state'),
    award: integer('award'),
});

export const vipRebateHistory = sqliteTable('vip_rebate_history', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    notesId: text('notes_id'),
    createdAt: text('created_at'),
    amount: text('amount'),
    cashBack: text('cash_back'),
    vipLevel: text('vip_level'),
    vipRate: text('vip_rate'),
    gameType: text('game_type'),
});

export const vipLevelRewardHistory = sqliteTable('vip_level_reward_history', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    notesId: text('notes_id'),
    createdAt: text('created_at'),
    amount: text('amount'),
    vipLevel: text('vip_level'),
    type: text('type'),
});

export const vipTimesHistory = sqliteTable('vip_times_history', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    notesId: text('notes_id'),
    createdAt: text('created_at'),
    amount: text('amount'),
    vipLevel: text('vip_level'),
    type: text('type'),
});
