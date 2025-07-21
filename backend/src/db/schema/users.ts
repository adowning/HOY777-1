// db/schema/users.ts
import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
  varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { transformSchemaForOpenAPI } from '#/lib/schema-transformer'
import { nanoid } from '../../utils/nanoid'
import { messages } from './misc'
import {
  bonuses,
  balances,
  transactions,
  deposits,
  withdrawals,
} from './transactions'
import {
  invites,
  inviteCommissionHistory,
  userAchievements,
  userRewards,
  inviteStats,
} from './rewards'
import { wallets } from './wallets'
import { vipInfo } from './vipInfo'

export const roleEnum = pgEnum('role', ['admin', 'user'])

export const users = pgTable('users', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
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
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const usersRelations = relations(users, ({ one, many }) => ({
  wallets: many(wallets),
  messages: many(messages),
  bonuses: many(bonuses),
  balances: many(balances),
  transactions: many(transactions),
  deposits: many(deposits),
  withdrawals: many(withdrawals),
  invitesSent: many(invites, { relationName: 'inviter' }),
  invitesReceived: many(invites, { relationName: 'invitee' }),
  inviteCommissionHistory: many(inviteCommissionHistory),
  userAchievements: many(userAchievements),
  rewards: one(userRewards, {
    fields: [users.id],
    references: [userRewards.userId],
  }),
  inviteStats: one(inviteStats, {
    fields: [users.id],
    references: [inviteStats.userId],
  }),
  vipInfo: one(vipInfo, {
    fields: [users.id],
    references: [vipInfo.userId],
  }),
}))

export const selectUsersSchema = transformSchemaForOpenAPI(
  createSelectSchema(users)
)
export const insertUsersSchema = transformSchemaForOpenAPI(
  createInsertSchema(users).omit({ id: true, createdAt: true, updatedAt: true })
)
export const patchUsersSchema = transformSchemaForOpenAPI(
  insertUsersSchema.partial()
)