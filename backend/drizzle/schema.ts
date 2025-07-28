import { pgTable, varchar, text, jsonb, integer, foreignKey, boolean, timestamp, unique, real, serial, numeric, json, index, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const jackpotTypeEnum = pgEnum("jackpot_type_enum", ['GRAND', 'MAJOR', 'MINOR', 'MINI'])
export const paymentMethod = pgEnum("payment_method", ['INSTORE_CASH', 'CREDIT_CARD', 'BANK_TRANSFER', 'CRYPTO'])
export const role = pgEnum("role", ['admin', 'user'])
export const sessionStatus = pgEnum("session_status", ['ACTIVE', 'COMPLETED', 'EXPIRED'])


export const inviteHistory = pgTable("invite_history", {
	id: varchar().primaryKey().notNull(),
	time: text(),
	user: text(),
	bonus: text(),
});

export const chatMessages = pgTable("chat_messages", {
	id: varchar().primaryKey().notNull(),
	type: text(),
	avatar: text(),
	grade: text(),
	gradeColor: text("grade_color"),
	gradeBackground: text("grade_background"),
	sender: text(),
	receiver: text(),
	message: text(),
	starLevel: jsonb("star_level"),
});

export const explainItems = pgTable("explain_items", {
	id: varchar().primaryKey().notNull(),
	index: integer(),
	num: integer(),
	award: integer(),
	status: integer(),
	rate: integer(),
});

export const vipLevelAwards = pgTable("vip_level_awards", {
	id: varchar().primaryKey().notNull(),
	level: integer(),
	award: integer(),
});

export const vipLevels = pgTable("vip_levels", {
	id: varchar().primaryKey().notNull(),
	level: integer(),
	name: text(),
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

export const gameBigWins = pgTable("game_big_wins", {
	id: varchar().primaryKey().notNull(),
	gameId: text("game_id"),
	gameName: text("game_name"),
	gameIcon: text("game_icon"),
	userName: text("user_name"),
	userVipGroup: integer("user_vip_group"),
	userVipLevel: integer("user_vip_level"),
	betAmount: text("bet_amount"),
	multiplier: text(),
	winAmount: text("win_amount"),
	time: integer(),
});

export const gameHistory = pgTable("game_history", {
	id: varchar().primaryKey().notNull(),
	name: text(),
	createdAt: integer("created_at"),
	amount: text(),
	multiplier: text(),
	betId: text("bet_id"),
	status: text(),
	profit: integer(),
});

export const games = pgTable("games", {
	id: varchar().primaryKey().notNull(),
	name: text(),
	provider: text(),
	categoryId: varchar("category_id"),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [gameCategories.id],
			name: "games_category_id_game_categories_id_fk"
		}),
]);

export const gameCategories = pgTable("game_categories", {
	id: varchar().primaryKey().notNull(),
	name: text(),
	title: text(),
	category: text(),
	slug: text(),
	type: text(),
	icon: text(),
	image: text(),
	pictures: text(),
	gameCount: integer("game_count"),
	pageNo: integer("page_no"),
});

export const balances = pgTable("balances", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id"),
	amount: integer(),
	currency: text(),
	availableBalance: integer("available_balance"),
	real: text(),
	bonus: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "balances_user_id_users_id_fk"
		}),
]);

export const bonuses = pgTable("bonuses", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id"),
	amount: integer(),
	claimed: boolean().default(false),
	type: integer(),
	status: integer(),
	now: text(),
	max: text(),
	endedAt: integer("ended_at"),
	createdAt: integer("created_at"),
	gainAmount: text("gain_amount"),
	currency: text(),
	receive: integer(),
	wager: integer(),
	rate: integer(),
	deposit: text(),
	children: jsonb(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "bonuses_user_id_users_id_fk"
		}),
]);

export const rewards = pgTable("rewards", {
	id: varchar().primaryKey().notNull(),
	name: text(),
	description: text(),
});

export const vipSigninAwards = pgTable("vip_signin_awards", {
	id: varchar().primaryKey().notNull(),
	day: integer(),
	award: integer(),
});

export const countries = pgTable("countries", {
	id: varchar().primaryKey().notNull(),
	name: text(),
	code: text(),
});

export const languages = pgTable("languages", {
	id: varchar().primaryKey().notNull(),
	name: text(),
	code: text(),
});

export const currencies = pgTable("currencies", {
	id: varchar().primaryKey().notNull(),
	name: text(),
	code: text(),
});

export const announcements = pgTable("announcements", {
	id: varchar().primaryKey().notNull(),
	content: text(),
	startsAt: timestamp("starts_at", { mode: 'string' }),
	endsAt: timestamp("ends_at", { mode: 'string' }),
});

export const banners = pgTable("banners", {
	id: varchar().primaryKey().notNull(),
	imagePath: text("image_path"),
	linkUrl: text("link_url"),
	iconPath: text("icon_path"),
	clickFeedback: integer("click_feedback"),
	content: text(),
});

export const users = pgTable("users", {
	id: varchar().primaryKey().notNull(),
	uid: text(),
	username: text().notNull(),
	email: text(),
	passwordHash: text("password_hash"),
	phone: text(),
	avatar: text(),
	balance: integer(),
	withdrawable: integer(),
	vipLevel: integer("vip_level"),
	inviteUrl: text("invite_url"),
	inviteCode: text("invite_code"),
	firstName: text("first_name"),
	lastName: text("last_name"),
	idNumber: text("id_number"),
	emailConfirmed: boolean("email_confirmed").default(false),
	phoneConfirmed: boolean("phone_confirmed").default(false),
	dateOfBirth: text("date_of_birth"),
	county: text(),
	role: role().default('user').notNull(),
	state: text(),
	city: text(),
	address: text(),
	postalCode: text("postal_code"),
	language: text(),
	currentGameSesssion: text("current_game_sesssion"),
	locale: text(),
	initialProfileComplete: boolean("initial_profile_complete").default(false),
	isSuspended: integer("is_suspended"),
	sysCommunications: boolean("sys_communications").default(false),
	lockedPersonalInfoFields: jsonb("locked_personal_info_fields"),
	lastSeenAt: timestamp("last_seen_at", { mode: 'string' }),
	lastStartedAt: timestamp("last_started_at", { mode: 'string' }),
	lastSignInAt: timestamp("last_sign_in_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const operators = pgTable("operators", {
	id: varchar().primaryKey().notNull(),
	name: text().notNull(),
	operatorSecret: text("operator_secret").notNull(),
	operatorAccess: text("operator_access").notNull(),
	callbackUrl: text("callback_url").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	allowedIps: text("allowed_ips").array().notNull(),
	description: text(),
	balance: integer().default(0).notNull(),
	netRevenue: integer("net_revenue").default(0).notNull(),
	acceptedPayments: paymentMethod("accepted_payments").array().notNull(),
	ownerId: text("owner_id"),
	lastUsedAt: timestamp("last_used_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("operators_name_unique").on(table.name),
]);

export const vipInfo = pgTable("vip_info", {
	userId: text("user_id").primaryKey().notNull(),
	level: integer().default(0),
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
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "vip_info_user_id_users_id_fk"
		}),
]);

export const gameSpins = pgTable("game_spins", {
	id: varchar().primaryKey().notNull(),
	playerName: text("player_name"),
	gameName: text("game_name"),
	spinData: jsonb("spin_data"),
	grossWinAmount: real("gross_win_amount"),
	wagerAmount: real("wager_amount"),
	spinNumber: integer("spin_number").default(0),
	playerAvatar: text("player_avatar"),
	sessionId: varchar("session_id"),
	userId: varchar("user_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	occurredAt: timestamp("occurred_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.sessionId],
			foreignColumns: [gameSessions.id],
			name: "game_spins_session_id_game_sessions_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "game_spins_user_id_users_id_fk"
		}),
]);

export const rtgSettingsResponses = pgTable("rtg_settings_responses", {
	id: serial().primaryKey().notNull(),
	success: boolean().notNull(),
	userId: integer("user_id"),
	userToken: text("user_token"),
	userSessionId: text("user_session_id"),
	userCanGamble: boolean("user_can_gamble"),
	userCountry: text("user_country"),
	userCasino: text("user_casino"),
	userCurrencyCode: text("user_currency_code"),
	userCurrencySymbol: text("user_currency_symbol"),
	userServerTime: timestamp("user_server_time", { mode: 'string' }),
	userBalanceCash: numeric("user_balance_cash"),
	userBalanceFreeBets: numeric("user_balance_free_bets"),
	userBalanceBonus: numeric("user_balance_bonus"),
	userStakesDefaultIndex: integer("user_stakes_default_index"),
	userStakesLastIndex: integer("user_stakes_last_index"),
	gameCols: integer("game_cols"),
	gameRows: integer("game_rows"),
	gamePaysType: text("game_pays_type"),
	gameVersion: text("game_version"),
	gameVolatilityIndex: text("game_volatility_index"),
	gameRtpDefault: numeric("game_rtp_default"),
	gameHasGamble: boolean("game_has_gamble"),
	gameHasFeatureBuy: boolean("game_has_feature_buy"),
	launcherVersion: text("launcher_version"),
	userBonuses: json("user_bonuses"),
	userAutoplay: json("user_autoplay"),
	gameLines: json("game_lines"),
	gameTiles: json("game_tiles"),
	gameFeatures: json("game_features"),
	gameMultiplierSequence: json("game_multiplier_sequence"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	gameId: varchar("game_id"),
	gameName: text("game_name").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.gameId],
			foreignColumns: [games.id],
			name: "rtg_settings_responses_game_id_games_id_fk"
		}),
	unique("rtg_settings_responses_game_name_unique").on(table.gameName),
]);

export const rtgSpinResults = pgTable("rtg_spin_results", {
	id: serial().primaryKey().notNull(),
	success: boolean().notNull(),
	userId: integer("user_id").notNull(),
	sessionId: text("session_id"),
	canGamble: boolean("can_gamble"),
	token: text(),
	sessionNetPosition: numeric("session_net_position"),
	serverTime: timestamp("server_time", { mode: 'string' }),
	balanceCashAtStart: numeric("balance_cash_at_start"),
	balanceCashAfterBet: numeric("balance_cash_after_bet"),
	balanceCashAtEnd: numeric("balance_cash_at_end"),
	balanceFreeBetsAtStart: numeric("balance_free_bets_at_start"),
	balanceFreeBetsAfterBet: numeric("balance_free_bets_after_bet"),
	balanceFreeBetsAtEnd: numeric("balance_free_bets_at_end"),
	balanceBonusAtStart: numeric("balance_bonus_at_start"),
	balanceBonusAfterBet: numeric("balance_bonus_after_bet"),
	balanceBonusAtEnd: numeric("balance_bonus_at_end"),
	limitsBetThresholdTime: integer("limits_bet_threshold_time"),
	bonuses: json(),
	tournaments: json(),
	vouchers: json(),
	messages: json(),
	stake: numeric(),
	multiplier: numeric(),
	winTotal: numeric("win_total"),
	winLines: json("win_lines"),
	winsMultipliersTotal: numeric("wins_multipliers_total"),
	winsMultipliersLines: numeric("wins_multipliers_lines"),
	spinMode: text("spin_mode"),
	hasState: boolean("has_state"),
	fatTiles: json("fat_tiles"),
	scatters: json(),
	features: json(),
	reelsBuffer: json("reels_buffer"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	gameId: varchar("game_id"),
	gameName: text("game_name").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.gameId],
			foreignColumns: [games.id],
			name: "rtg_spin_results_game_id_games_id_fk"
		}),
]);

export const achievementItems = pgTable("achievement_items", {
	id: varchar().primaryKey().notNull(),
	index: integer(),
	num: integer(),
	award: integer(),
	state: integer(),
	rate: integer(),
});

export const statistics = pgTable("statistics", {
	id: varchar().primaryKey().notNull(),
	todayDepositedUser: integer("today_deposited_user"),
	yesterdayDepositedUser: integer("yesterday_deposited_user"),
	todayRevenue: integer("today_revenue"),
	yesterdayRevenue: integer("yesterday_revenue"),
	thisMonthDepositedUser: integer("this_month_deposited_user"),
	thisMonthRevenue: integer("this_month_revenue"),
	totalRegisteredUser: integer("total_registered_user"),
	totalDepositingUser: integer("total_depositing_user"),
	totalRevenue: integer("total_revenue"),
});

export const liveWins = pgTable("live_wins", {
	id: varchar().primaryKey().notNull(),
	image: text(),
	level: integer(),
	gameName: text("game_name"),
	bettingAmount: text("betting_amount"),
});

export const jackpotContributions = pgTable("jackpot_contributions", {
	id: varchar().primaryKey().notNull(),
	jackpotId: text("jackpot_id").notNull(),
	gameSpinId: text("game_spin_id").notNull(),
	contributionAmountCoins: integer("contribution_amount_coins").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const jackpotWins = pgTable("jackpot_wins", {
	id: varchar().primaryKey().notNull(),
	jackpotId: text("jackpot_id").notNull(),
	winnerId: text("winner_id").notNull(),
	winAmountCoins: integer("win_amount_coins").notNull(),
	gameSpinId: text("game_spin_id").notNull(),
	transactionId: text("transaction_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("jackpot_wins_game_spin_id_unique").on(table.gameSpinId),
]);

export const jackpots = pgTable("jackpots", {
	id: varchar().primaryKey().notNull(),
	type: jackpotTypeEnum().notNull(),
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

export const wallets = pgTable("wallets", {
	id: varchar().primaryKey().notNull(),
	balance: integer().default(0).notNull(),
	paymentMethod: paymentMethod("payment_method").default('INSTORE_CASH').notNull(),
	currency: varchar({ length: 3 }).default('USD').notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	isDefault: boolean("is_default").default(false).notNull(),
	address: varchar({ length: 255 }),
	cashtag: varchar({ length: 50 }),
	userId: text("user_id").notNull(),
	operatorId: text("operator_id").notNull(),
	lastUsedAt: timestamp("last_used_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("wallet_cashtag_idx").using("btree", table.cashtag.asc().nullsLast().op("text_ops")),
	index("wallet_is_active_idx").using("btree", table.isActive.asc().nullsLast().op("bool_ops")),
	index("wallet_operator_id_idx").using("btree", table.operatorId.asc().nullsLast().op("text_ops")),
	index("wallet_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "wallets_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.operatorId],
			foreignColumns: [operators.id],
			name: "wallets_operator_id_operators_id_fk"
		}).onDelete("cascade"),
	unique("wallets_address_unique").on(table.address),
	unique("wallets_cashtag_unique").on(table.cashtag),
	unique("wallets_user_id_unique").on(table.userId),
]);

export const products = pgTable("products", {
	id: varchar().primaryKey().notNull(),
	title: text().default('default').notNull(),
	productType: text("product_type").default('bundle').notNull(),
	bonusTotalInCredits: integer("bonus_total_in_credits").default(0).notNull(),
	isActive: boolean("is_active"),
	priceInCents: integer("price_in_cents").default(0).notNull(),
	amountToReceiveInCredits: integer("amount_to_receive_in_credits").default(0).notNull(),
	bestValue: integer("best_value").default(0).notNull(),
	discountInCents: integer("discount_in_cents").default(0).notNull(),
	bonusSpins: integer("bonus_spins").default(0).notNull(),
	isPromo: boolean("is_promo").default(false),
	totalDiscountInCents: integer("total_discount_in_cents").default(0).notNull(),
	operatorId: text("operator_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.operatorId],
			foreignColumns: [operators.id],
			name: "products_operator_id_operators_id_fk"
		}).onDelete("cascade"),
]);

export const userAchievements = pgTable("user_achievements", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id").notNull(),
	achievementId: varchar("achievement_id").notNull(),
	progress: integer().default(0).notNull(),
	status: integer().default(0).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_achievements_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.achievementId],
			foreignColumns: [achievements.id],
			name: "user_achievements_achievement_id_achievements_id_fk"
		}),
]);

export const inviteCommissionHistory = pgTable("invite_commission_history", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id").notNull(),
	fromUserId: varchar("from_user_id"),
	bonus: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "invite_commission_history_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.fromUserId],
			foreignColumns: [users.id],
			name: "invite_commission_history_from_user_id_users_id_fk"
		}),
]);

export const inviteStats = pgTable("invite_stats", {
	userId: varchar("user_id").primaryKey().notNull(),
	bonusMonth: text("bonus_month").default('0'),
	bonusToday: text("bonus_today").default('0'),
	bonusTotal: text("bonus_total").default('0'),
	bonusYesterdays: text("bonus_yesterdays").default('0'),
	depositUsers: integer("deposit_users").default(0),
	depositUsersMonth: integer("deposit_users_month").default(0),
	depositUsersToday: integer("deposit_users_today").default(0),
	depositUsersYesterdays: integer("deposit_users_yesterdays").default(0),
	invitedUsers: integer("invited_users").default(0),
	availableBonus: text("available_bonus").default('0'),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "invite_stats_user_id_users_id_fk"
		}),
]);

export const userRewards = pgTable("user_rewards", {
	userId: varchar("user_id").primaryKey().notNull(),
	achievementBonus: text("achievement_bonus").default('0'),
	achievementStatus: integer("achievement_status").default(0).notNull(),
	cashBack: text("cash_back").default('0'),
	weeklyBonus: text("weekly_bonus").default('0'),
	levelUpBonuses: integer("level_up_bonuses").default(0).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_rewards_user_id_users_id_fk"
		}),
]);

export const vipTimesHistory = pgTable("vip_times_history", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id"),
	notesId: text("notes_id"),
	createdAt: text("created_at"),
	amount: text(),
	vipLevel: text("vip_level"),
	type: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "vip_times_history_user_id_users_id_fk"
		}),
]);

export const vipLevelRewardHistory = pgTable("vip_level_reward_history", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id"),
	notesId: text("notes_id"),
	createdAt: text("created_at"),
	amount: text(),
	vipLevel: text("vip_level"),
	type: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "vip_level_reward_history_user_id_users_id_fk"
		}),
]);

export const vipRebateHistory = pgTable("vip_rebate_history", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id"),
	notesId: text("notes_id"),
	createdAt: text("created_at"),
	amount: text(),
	cashBack: text("cash_back"),
	vipLevel: text("vip_level"),
	vipRate: text("vip_rate"),
	gameType: text("game_type"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "vip_rebate_history_user_id_users_id_fk"
		}),
]);

export const vipTasks = pgTable("vip_tasks", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id"),
	index: integer(),
	taskId: integer("task_id"),
	taskType: integer("task_type"),
	taskTerms: jsonb("task_terms"),
	state: integer(),
	award: integer(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "vip_tasks_user_id_users_id_fk"
		}),
]);

export const promos = pgTable("promos", {
	id: varchar().primaryKey().notNull(),
	promoGroupId: varchar("promo_group_id"),
	name: text(),
	description: text(),
	code: text(),
	imagePath: text("image_path"),
	text: text(),
	desc: text(),
	countdown: boolean(),
	content: text(),
	clickFeedback: integer("click_feedback"),
	buttonPath: text("button_path"),
	buttonText: text("button_text"),
}, (table) => [
	foreignKey({
			columns: [table.promoGroupId],
			foreignColumns: [promoGroups.id],
			name: "promos_promo_group_id_promo_groups_id_fk"
		}),
]);

export const invites = pgTable("invites", {
	id: varchar().primaryKey().notNull(),
	inviterId: varchar("inviter_id"),
	inviteeId: varchar("invitee_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.inviterId],
			foreignColumns: [users.id],
			name: "invites_inviter_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.inviteeId],
			foreignColumns: [users.id],
			name: "invites_invitee_id_users_id_fk"
		}),
]);

export const achievements = pgTable("achievements", {
	id: varchar().primaryKey().notNull(),
	name: text(),
	description: text(),
});

export const withdrawals = pgTable("withdrawals", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id"),
	amount: integer(),
	status: text(),
	idNumber: text("id_number"),
	firstName: text("first_name"),
	lastName: text("last_name"),
	channelsId: text("channels_id"),
	note: text(),
	currencyType: text("currency_type"),
	currency: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "withdrawals_user_id_users_id_fk"
		}),
]);

export const deposits = pgTable("deposits", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id"),
	amount: integer(),
	status: text(),
	idNumber: text("id_number"),
	firstName: text("first_name"),
	lastName: text("last_name"),
	channelsId: text("channels_id"),
	note: text(),
	currency: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "deposits_user_id_users_id_fk"
		}),
]);

export const transactions = pgTable("transactions", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id"),
	amount: integer(),
	type: text(),
	status: text(),
	note: text(),
	balance: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "transactions_user_id_users_id_fk"
		}),
]);

export const messages = pgTable("messages", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id"),
	read: boolean().default(false),
	content: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "messages_user_id_users_id_fk"
		}),
]);

export const vips = pgTable("vips", {
	id: varchar().primaryKey().notNull(),
	level: integer(),
	name: text(),
	icon: text(),
	banner: text(),
	background: text(),
	color: text(),
	textColor: text("text_color"),
	progress: integer(),
	progressMax: integer("progress_max"),
	progressText: text("progress_text"),
	levelUpAward: integer("level_up_award"),
	levelUpAwardReceived: integer("level_up_award_received"),
	levelUpAwardUnreceived: integer("level_up_award_unreceived"),
	levelUpAwardList: jsonb("level_up_award_list"),
	signinAward: integer("signin_award"),
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

export const promoGroups = pgTable("promo_groups", {
	id: varchar().primaryKey().notNull(),
	name: text().notNull(),
});

export const gameSessions = pgTable("game_sessions", {
	id: text().primaryKey().notNull(),
	authSessionId: text("auth_session_id").notNull(),
	userId: text("user_id").notNull(),
	gameId: text("game_id"),
	status: sessionStatus().default('ACTIVE').notNull(),
	totalWagered: integer("total_wagered").default(0).notNull(),
	totalWon: integer("total_won").default(0).notNull(),
	totalXpGained: integer("total_xp_gained").default(0).notNull(),
	rtp: numeric({ precision: 5, scale:  2 }),
	duration: integer().default(0).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	endAt: timestamp("end_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	index("game_session_auth_session_idx").using("btree", table.authSessionId.asc().nullsLast().op("text_ops")),
	index("game_session_user_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.authSessionId],
			foreignColumns: [authSessions.id],
			name: "game_sessions_auth_session_id_auth_sessions_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "game_sessions_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.gameId],
			foreignColumns: [games.id],
			name: "game_sessions_game_id_games_id_fk"
		}).onDelete("cascade"),
]);

export const authSessions = pgTable("auth_sessions", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	status: sessionStatus().default('ACTIVE').notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	deviceId: text("device_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }),
	lastSeen: timestamp("last_seen", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("auth_session_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("auth_session_user_idx").using("btree", table.userId.asc().nullsLast().op("text_ops"), table.createdAt.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "auth_sessions_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const favoriteGames = pgTable("favorite_games", {
	userId: varchar("user_id").notNull(),
	gameId: varchar("game_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "favorite_games_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.gameId],
			foreignColumns: [games.id],
			name: "favorite_games_game_id_games_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.gameId], name: "favorite_games_user_id_game_id_pk"}),
]);
