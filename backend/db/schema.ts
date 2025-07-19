import { pgTable, serial, text, varchar, integer, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: varchar('uid', { length: 256 }),
  username: varchar('username', { length: 256 }),
  email: varchar('email', { length: 256 }),
  phone: varchar('phone', { length: 256 }),
  avatar: text('avatar'),
  balance: integer('balance'),
  withdrawable: integer('withdrawable'),
  vipLevel: integer('vip_level'),
  inviteUrl: text('invite_url'),
  inviteCode: varchar('invite_code', { length: 256 }),
  firstName: varchar('first_name', { length: 256 }),
  lastName: varchar('last_name', { length: 256 }),
  idNumber: varchar('id_number', { length: 256 }),
  emailConfirmed: boolean('email_confirmed').default(false),
  phoneConfirmed: boolean('phone_confirmed').default(false),
  dateOfBirth: varchar('date_of_birth', { length: 256 }),
  county: varchar('county', { length: 256 }),
  state: varchar('state', { length: 256 }),
  city: varchar('city', { length: 256 }),
  address: varchar('address', { length: 256 }),
  postalCode: varchar('postal_code', { length: 256 }),
  language: varchar('language', { length: 256 }),
  locale: varchar('locale', { length: 256 }),
  initialProfileComplete: boolean('initial_profile_complete').default(false),
  isSuspended: integer('is_suspended'),
  sysCommunications: boolean('sys_communications').default(false),
  lockedPersonalInfoFields: jsonb('locked_personal_info_fields'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const vips = pgTable('vips', {
    id: serial('id').primaryKey(),
    level: integer('level'),
    name: varchar('name', { length: 256 }),
    icon: text('icon'),
    banner: text('banner'),
    background: text('background'),
    color: varchar('color', { length: 256 }),
    textColor: varchar('text_color', { length: 256 }),
    progress: integer('progress'),
    progressMax: integer('progress_max'),
    progressText: varchar('progress_text', { length: 256 }),
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
});

export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    read: boolean('read').default(false),
    content: text('content'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const vipLevelAwards = pgTable('vip_level_awards', {
    id: serial('id').primaryKey(),
    level: integer('level'),
    award: integer('award'),
});

export const vipSigninAwards = pgTable('vip_signin_awards', {
    id: serial('id').primaryKey(),
    day: integer('day'),
    award: integer('award'),
});

export const rewards = pgTable('rewards', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    description: text('description'),
});

export const bonuses = pgTable('bonuses', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    amount: integer('amount'),
    claimed: boolean('claimed').default(false),
    type: integer('type'),
    status: integer('status'),
    now: varchar('now', { length: 256 }),
    max: varchar('max', { length: 256 }),
    endedAt: integer('ended_at'),
    createdAt: integer('created_at'),
    gainAmount: varchar('gain_amount', { length: 256 }),
    currency: varchar('currency', { length: 256 }),
    receive: integer('receive'),
    wager: integer('wager'),
    rate: integer('rate'),
    deposit: varchar('deposit', { length: 256 }),
    children: jsonb('children'),
});

export const balances = pgTable('balances', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    amount: integer('amount'),
    currency: varchar('currency', { length: 256 }),
    availableBalance: integer('available_balance'),
    real: varchar('real', { length: 256 }),
    bonus: varchar('bonus', { length: 256 }),
});

export const gameCategories = pgTable('game_categories', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    slug: varchar('slug', { length: 256 }),
    icon: text('icon'),
    image: text('image'),
    pictures: text('pictures'),
    gameCount: integer('game_count'),
    pageNo: integer('page_no'),
});

export const games = pgTable('games', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    provider: varchar('provider', { length: 256 }),
    categoryId: integer('category_id').references(() => gameCategories.id),
});

export const vipLevels = pgTable('vip_levels', {
    id: serial('id').primaryKey(),
    level: integer('level'),
    name: varchar('name', { length: 256 }),
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
    availableDailyBonusTime: varchar('available_daily_bonus_time', { length: 256 }),
    collectableWeekBonusDay: varchar('collectable_week_bonus_day', { length: 256 }),
    collectableMonthBonusDay: varchar('collectable_month_bonus_day', { length: 256 }),
});

export const banners = pgTable('banners', {
    id: serial('id').primaryKey(),
    imageUrl: text('image_url'),
    linkUrl: text('link_url'),
    iconPath: text('icon_path'),
    clickFeedback: integer('click_feedback'),
    content: text('content'),
});

export const announcements = pgTable('announcements', {
    id: serial('id').primaryKey(),
    content: text('content'),
    startsAt: timestamp('starts_at'),
    endsAt: timestamp('ends_at'),
});

export const currencies = pgTable('currencies', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    code: varchar('code', { length: 3 }),
});

export const languages = pgTable('languages', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    code: varchar('code', { length: 2 }),
});

export const countries = pgTable('countries', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    code: varchar('code', { length: 2 }),
});

export const transactions = pgTable('transactions', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    amount: integer('amount'),
    type: varchar('type', { length: 256 }),
    status: varchar('status', { length: 256 }),
    createdAt: timestamp('created_at').defaultNow(),
});

export const deposits = pgTable('deposits', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    amount: integer('amount'),
    status: varchar('status', { length: 256 }),
    createdAt: timestamp('created_at').defaultNow(),
    idNumber: varchar('id_number', { length: 256 }),
    firstName: varchar('first_name', { length: 256 }),
    lastName: varchar('last_name', { length: 256 }),
    channelsId: varchar('channels_id', { length: 256 }),
    note: text('note'),
    currency: varchar('currency', { length: 256 }),
});

export const withdrawals = pgTable('withdrawals', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    amount: integer('amount'),
    status: varchar('status', { length: 256 }),
    createdAt: timestamp('created_at').defaultNow(),
    idNumber: varchar('id_number', { length: 256 }),
    firstName: varchar('first_name', { length: 256 }),
    lastName: varchar('last_name', { length: 256 }),
    channelsId: varchar('channels_id', { length: 256 }),
    note: text('note'),
    currencyType: varchar('currency_type', { length: 256 }),
    currency: varchar('currency', { length: 256 }),
});

export const achievements = pgTable('achievements', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    description: text('description'),
});

export const invites = pgTable('invites', {
    id: serial('id').primaryKey(),
    inviterId: integer('inviter_id').references(() => users.id),
    inviteeId: integer('invitee_id').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
});

export const promos = pgTable('promos', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    description: text('description'),
    code: varchar('code', { length: 256 }),
    imagePath: text('image_path'),
    text: text('text'),
    desc: text('desc'),
    countdown: boolean('countdown'),
    content: text('content'),
    clickFeedback: integer('click_feedback'),
    buttonPath: text('button_path'),
    buttonText: text('button_text'),
});

export const achievementItems = pgTable('achievement_items', {
    id: serial('id').primaryKey(),
    index: integer('index'),
    num: integer('num'),
    award: integer('award'),
    state: integer('state'),
    rate: integer('rate'),
});

export const explainItems = pgTable('explain_items', {
    id: serial('id').primaryKey(),
    index: integer('index'),
    num: integer('num'),
    award: integer('award'),
    status: integer('status'),
    rate: integer('rate'),
});

export const liveWins = pgTable('live_wins', {
    id: serial('id').primaryKey(),
    image: text('image'),
    level: integer('level'),
    gameName: varchar('game_name', { length: 256 }),
    bettingAmount: varchar('betting_amount', { length: 256 }),
});

export const statistics = pgTable('statistics', {
    id: serial('id').primaryKey(),
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

export const chatMessages = pgTable('chat_messages', {
    id: serial('id').primaryKey(),
    type: varchar('type', { length: 256 }),
    avatar: text('avatar'),
    grade: varchar('grade', { length: 256 }),
    gradeColor: varchar('grade_color', { length: 256 }),
    gradeBackground: varchar('grade_background', { length: 256 }),
    sender: varchar('sender', { length: 256 }),
    receiver: varchar('receiver', { length: 256 }),
    message: text('message'),
    starLevel: jsonb('star_level'),
});

export const gameHistory = pgTable('game_history', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    createdAt: integer('created_at'),
    amount: varchar('amount', { length: 256 }),
    multiplier: varchar('multiplier', { length: 256 }),
    betId: varchar('bet_id', { length: 256 }),
    status: varchar('status', { length: 256 }),
    profit: integer('profit'),
});

export const gameBigWins = pgTable('game_big_wins', {
    id: serial('id').primaryKey(),
    gameId: varchar('game_id', { length: 256 }),
    gameName: varchar('game_name', { length: 256 }),
    gameIcon: text('game_icon'),
    userName: varchar('user_name', { length: 256 }),
    userVipGroup: integer('user_vip_group'),
    userVipLevel: integer('user_vip_level'),
    betAmount: varchar('bet_amount', { length: 256 }),
    multiplier: varchar('multiplier', { length: 256 }),
    winAmount: varchar('win_amount', { length: 256 }),
    time: integer('time'),
});

export const inviteHistory = pgTable('invite_history', {
    id: serial('id').primaryKey(),
    time: varchar('time', { length: 256 }),
    user: varchar('user', { length: 256 }),
    bonus: varchar('bonus', { length: 256 }),
});

export const vipTasks = pgTable('vip_tasks', {
    id: serial('id').primaryKey(),
    index: integer('index'),
    taskId: integer('task_id'),
    taskType: integer('task_type'),
    taskTerms: jsonb('task_terms'),
    state: integer('state'),
    award: integer('award'),
});

export const vipRebateHistory = pgTable('vip_rebate_history', {
    id: serial('id').primaryKey(),
    notesId: varchar('notes_id', { length: 256 }),
    createdAt: varchar('created_at', { length: 256 }),
    amount: varchar('amount', { length: 256 }),
    cashBack: varchar('cash_back', { length: 256 }),
    vipLevel: varchar('vip_level', { length: 256 }),
    vipRate: varchar('vip_rate', { length: 256 }),
    gameType: varchar('game_type', { length: 256 }),
});

export const vipLevelRewardHistory = pgTable('vip_level_reward_history', {
    id: serial('id').primaryKey(),
    notesId: varchar('notes_id', { length: 256 }),
    createdAt: varchar('created_at', { length: 256 }),
    amount: varchar('amount', { length: 256 }),
    vipLevel: varchar('vip_level', { length: 256 }),
    type: varchar('type', { length: 256 }),
});

export const vipTimesHistory = pgTable('vip_times_history', {
    id: serial('id').primaryKey(),
    notesId: varchar('notes_id', { length: 256 }),
    createdAt: varchar('created_at', { length: 256 }),
    amount: varchar('amount', { length: 256 }),
    vipLevel: varchar('vip_level', { length: 256 }),
    type: varchar('type', { length: 256 }),
});