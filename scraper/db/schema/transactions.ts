// db/schema/transactions.ts
import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { transformSchemaForOpenAPI } from '../../schema-transformer'
import { nanoid } from '../nanoid'
import { users } from './users'

export const transactions = pgTable('transactions', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id').references(() => users.id),
  amount: integer('amount'),
  type: text('type'),
  status: text('status'),
  note: text('note'),
  balance: integer('balance'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const deposits = pgTable('deposits', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id').references(() => users.id),
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

export const withdrawals = pgTable('withdrawals', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id').references(() => users.id),
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

export const balances = pgTable('balances', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id').references(() => users.id),
  amount: integer('amount'),
  currency: text('currency'),
  availableBalance: integer('available_balance'),
  real: text('real'),
  bonus: text('bonus'),
})

export const bonuses = pgTable('bonuses', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id').references(() => users.id),
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

import { z } from 'zod'

// Zod Schemas
export const selectBalancesSchema = createSelectSchema(balances)
export const selectTransactionsSchema = createSelectSchema(transactions)
export const insertTransactionsSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const patchTransactionsSchema = insertTransactionsSchema.partial()

export const selectDepositsSchema = createSelectSchema(deposits)
export const insertDepositsSchema = createInsertSchema(deposits).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const patchDepositsSchema = insertDepositsSchema.partial()

export const selectWithdrawalsSchema = createSelectSchema(withdrawals)
export const insertWithdrawalsSchema = createInsertSchema(withdrawals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const patchWithdrawalsSchema = insertWithdrawalsSchema.partial()
