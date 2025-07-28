// db/schema/rewards.ts
import {
  pgTable,
  text,
  integer,
  timestamp,
  varchar,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { transformSchemaForOpenAPI } from '../../schema-transformer'
import { nanoid } from '../nanoid'
import { users } from './users'

export const rewards = pgTable('rewards', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  name: text('name'),
  description: text('description'),
})

export const achievements = pgTable('achievements', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  name: text('name'),
  description: text('description'),
})

export const invites = pgTable('invites', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  inviterId: varchar('inviter_id').references(() => users.id),
  inviteeId: varchar('invitee_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const userRewards = pgTable(
  'user_rewards',
  {
    userId: varchar('user_id')
      .notNull()
      .references(() => users.id),
    achievementBonus: text('achievement_bonus').default('0'),
    achievementStatus: integer('achievement_status').notNull().default(0),
    cashBack: text('cash_back').default('0'),
    weeklyBonus: text('weekly_bonus').default('0'),
    levelUpBonuses: integer('level_up_bonuses').notNull().default(0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId] }),
  })
)

export const inviteStats = pgTable(
  'invite_stats',
  {
    userId: varchar('user_id')
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

export const inviteCommissionHistory = pgTable('invite_commission_history', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id),
  fromUserId: varchar('from_user_id').references(() => users.id),
  bonus: text('bonus').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const userAchievements = pgTable('user_achievements', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id),
  achievementId: varchar('achievement_id')
    .notNull()
    .references(() => achievements.id),
  progress: integer('progress').notNull().default(0),
  status: integer('status').notNull().default(0),
})

import { z } from 'zod'

// Zod Schemas
export const selectAchievementsSchema = createSelectSchema(achievements)
export const insertAchievementsSchema = createInsertSchema(achievements).omit({ id: true })

export const selectInvitesSchema = createSelectSchema(invites)
export const insertInvitesSchema = createInsertSchema(invites).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const selectUserRewardsSchema = createSelectSchema(userRewards)
export const insertUserRewardsSchema = createInsertSchema(userRewards)

export const selectInviteStatsSchema = createSelectSchema(inviteStats)
export const insertInviteStatsSchema = createInsertSchema(inviteStats)

export const selectInviteCommissionHistorySchema = createSelectSchema(
  inviteCommissionHistory
)
export const insertInviteCommissionHistorySchema = createInsertSchema(
  inviteCommissionHistory
)

export const selectUserAchievementsSchema = createSelectSchema(userAchievements)
export const insertUserAchievementsSchema = createInsertSchema(userAchievements)
