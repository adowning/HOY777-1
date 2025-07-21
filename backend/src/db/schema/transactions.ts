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
import { transformSchemaForOpenAPI } from '#/lib/schema-transformer'
import { nanoid } from '../../utils/nanoid'
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

// Zod Schemas
export const selectBalancesSchema = createSelectSchema(balances)
export const selectTransactionsSchema = transformSchemaForOpenAPI(
  createSelectSchema(transactions)
)
export const insertTransactionsSchema = transformSchemaForOpenAPI(
  createInsertSchema(transactions).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
)
export const patchTransactionsSchema = transformSchemaForOpenAPI(
  insertTransactionsSchema.partial()
)
export const selectDepositsSchema = transformSchemaForOpenAPI(
  createSelectSchema(deposits)
)
export const insertDepositsSchema = transformSchemaForOpenAPI(
  createInsertSchema(deposits).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
)
export const patchDepositsSchema = transformSchemaForOpenAPI(
  insertDepositsSchema.partial()
)
export const selectWithdrawalsSchema = transformSchemaForOpenAPI(
  createSelectSchema(withdrawals)
)
export const insertWithdrawalsSchema = transformSchemaForOpenAPI(
  createInsertSchema(withdrawals).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
)
export const patchWithdrawalsSchema = transformSchemaForOpenAPI(
  insertWithdrawalsSchema.partial()
)
