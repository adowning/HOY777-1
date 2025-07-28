import { relations } from "drizzle-orm/relations";
import { gameCategories, games, users, balances, bonuses, vipInfo, gameSessions, gameSpins, rtgSettingsResponses, rtgSpinResults, wallets, operators, products, userAchievements, achievements, inviteCommissionHistory, inviteStats, userRewards, vipTimesHistory, vipLevelRewardHistory, vipRebateHistory, vipTasks, promoGroups, promos, invites, withdrawals, deposits, transactions, messages, authSessions, favoriteGames } from "./schema";

export const gamesRelations = relations(games, ({one, many}) => ({
	gameCategory: one(gameCategories, {
		fields: [games.categoryId],
		references: [gameCategories.id]
	}),
	rtgSettingsResponses: many(rtgSettingsResponses),
	rtgSpinResults: many(rtgSpinResults),
	gameSessions: many(gameSessions),
	favoriteGames: many(favoriteGames),
}));

export const gameCategoriesRelations = relations(gameCategories, ({many}) => ({
	games: many(games),
}));

export const balancesRelations = relations(balances, ({one}) => ({
	user: one(users, {
		fields: [balances.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	balances: many(balances),
	bonuses: many(bonuses),
	vipInfos: many(vipInfo),
	gameSpins: many(gameSpins),
	wallets: many(wallets),
	userAchievements: many(userAchievements),
	inviteCommissionHistories_userId: many(inviteCommissionHistory, {
		relationName: "inviteCommissionHistory_userId_users_id"
	}),
	inviteCommissionHistories_fromUserId: many(inviteCommissionHistory, {
		relationName: "inviteCommissionHistory_fromUserId_users_id"
	}),
	inviteStats: many(inviteStats),
	userRewards: many(userRewards),
	vipTimesHistories: many(vipTimesHistory),
	vipLevelRewardHistories: many(vipLevelRewardHistory),
	vipRebateHistories: many(vipRebateHistory),
	vipTasks: many(vipTasks),
	invites_inviterId: many(invites, {
		relationName: "invites_inviterId_users_id"
	}),
	invites_inviteeId: many(invites, {
		relationName: "invites_inviteeId_users_id"
	}),
	withdrawals: many(withdrawals),
	deposits: many(deposits),
	transactions: many(transactions),
	messages: many(messages),
	gameSessions: many(gameSessions),
	authSessions: many(authSessions),
	favoriteGames: many(favoriteGames),
}));

export const bonusesRelations = relations(bonuses, ({one}) => ({
	user: one(users, {
		fields: [bonuses.userId],
		references: [users.id]
	}),
}));

export const vipInfoRelations = relations(vipInfo, ({one}) => ({
	user: one(users, {
		fields: [vipInfo.userId],
		references: [users.id]
	}),
}));

export const gameSpinsRelations = relations(gameSpins, ({one}) => ({
	gameSession: one(gameSessions, {
		fields: [gameSpins.sessionId],
		references: [gameSessions.id]
	}),
	user: one(users, {
		fields: [gameSpins.userId],
		references: [users.id]
	}),
}));

export const gameSessionsRelations = relations(gameSessions, ({one, many}) => ({
	gameSpins: many(gameSpins),
	authSession: one(authSessions, {
		fields: [gameSessions.authSessionId],
		references: [authSessions.id]
	}),
	user: one(users, {
		fields: [gameSessions.userId],
		references: [users.id]
	}),
	game: one(games, {
		fields: [gameSessions.gameId],
		references: [games.id]
	}),
}));

export const rtgSettingsResponsesRelations = relations(rtgSettingsResponses, ({one}) => ({
	game: one(games, {
		fields: [rtgSettingsResponses.gameId],
		references: [games.id]
	}),
}));

export const rtgSpinResultsRelations = relations(rtgSpinResults, ({one}) => ({
	game: one(games, {
		fields: [rtgSpinResults.gameId],
		references: [games.id]
	}),
}));

export const walletsRelations = relations(wallets, ({one}) => ({
	user: one(users, {
		fields: [wallets.userId],
		references: [users.id]
	}),
	operator: one(operators, {
		fields: [wallets.operatorId],
		references: [operators.id]
	}),
}));

export const operatorsRelations = relations(operators, ({many}) => ({
	wallets: many(wallets),
	products: many(products),
}));

export const productsRelations = relations(products, ({one}) => ({
	operator: one(operators, {
		fields: [products.operatorId],
		references: [operators.id]
	}),
}));

export const userAchievementsRelations = relations(userAchievements, ({one}) => ({
	user: one(users, {
		fields: [userAchievements.userId],
		references: [users.id]
	}),
	achievement: one(achievements, {
		fields: [userAchievements.achievementId],
		references: [achievements.id]
	}),
}));

export const achievementsRelations = relations(achievements, ({many}) => ({
	userAchievements: many(userAchievements),
}));

export const inviteCommissionHistoryRelations = relations(inviteCommissionHistory, ({one}) => ({
	user_userId: one(users, {
		fields: [inviteCommissionHistory.userId],
		references: [users.id],
		relationName: "inviteCommissionHistory_userId_users_id"
	}),
	user_fromUserId: one(users, {
		fields: [inviteCommissionHistory.fromUserId],
		references: [users.id],
		relationName: "inviteCommissionHistory_fromUserId_users_id"
	}),
}));

export const inviteStatsRelations = relations(inviteStats, ({one}) => ({
	user: one(users, {
		fields: [inviteStats.userId],
		references: [users.id]
	}),
}));

export const userRewardsRelations = relations(userRewards, ({one}) => ({
	user: one(users, {
		fields: [userRewards.userId],
		references: [users.id]
	}),
}));

export const vipTimesHistoryRelations = relations(vipTimesHistory, ({one}) => ({
	user: one(users, {
		fields: [vipTimesHistory.userId],
		references: [users.id]
	}),
}));

export const vipLevelRewardHistoryRelations = relations(vipLevelRewardHistory, ({one}) => ({
	user: one(users, {
		fields: [vipLevelRewardHistory.userId],
		references: [users.id]
	}),
}));

export const vipRebateHistoryRelations = relations(vipRebateHistory, ({one}) => ({
	user: one(users, {
		fields: [vipRebateHistory.userId],
		references: [users.id]
	}),
}));

export const vipTasksRelations = relations(vipTasks, ({one}) => ({
	user: one(users, {
		fields: [vipTasks.userId],
		references: [users.id]
	}),
}));

export const promosRelations = relations(promos, ({one}) => ({
	promoGroup: one(promoGroups, {
		fields: [promos.promoGroupId],
		references: [promoGroups.id]
	}),
}));

export const promoGroupsRelations = relations(promoGroups, ({many}) => ({
	promos: many(promos),
}));

export const invitesRelations = relations(invites, ({one}) => ({
	user_inviterId: one(users, {
		fields: [invites.inviterId],
		references: [users.id],
		relationName: "invites_inviterId_users_id"
	}),
	user_inviteeId: one(users, {
		fields: [invites.inviteeId],
		references: [users.id],
		relationName: "invites_inviteeId_users_id"
	}),
}));

export const withdrawalsRelations = relations(withdrawals, ({one}) => ({
	user: one(users, {
		fields: [withdrawals.userId],
		references: [users.id]
	}),
}));

export const depositsRelations = relations(deposits, ({one}) => ({
	user: one(users, {
		fields: [deposits.userId],
		references: [users.id]
	}),
}));

export const transactionsRelations = relations(transactions, ({one}) => ({
	user: one(users, {
		fields: [transactions.userId],
		references: [users.id]
	}),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	user: one(users, {
		fields: [messages.userId],
		references: [users.id]
	}),
}));

export const authSessionsRelations = relations(authSessions, ({one, many}) => ({
	gameSessions: many(gameSessions),
	user: one(users, {
		fields: [authSessions.userId],
		references: [users.id]
	}),
}));

export const favoriteGamesRelations = relations(favoriteGames, ({one}) => ({
	user: one(users, {
		fields: [favoriteGames.userId],
		references: [users.id]
	}),
	game: one(games, {
		fields: [favoriteGames.gameId],
		references: [games.id]
	}),
}));