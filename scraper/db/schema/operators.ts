// db/schema/operators.ts
import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  pgEnum,
  varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { nanoid } from '../nanoid'
import { wallets } from './wallets'
import { transformSchemaForOpenAPI } from '../../schema-transformer'

export const paymentMethodEnum = pgEnum('payment_method', [
  'INSTORE_CASH',
  'CREDIT_CARD',
  'BANK_TRANSFER',
  'CRYPTO',
])

export const operators = pgTable('operators', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
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
  id: varchar('id').primaryKey().$defaultFn(nanoid),
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

export const operatorsRelations = relations(operators, ({ many }) => ({
  products: many(products),
  wallets: many(wallets),
}))

export const productsRelations = relations(products, ({ one }) => ({
  operator: one(operators, {
    fields: [products.operatorId],
    references: [operators.id],
  }),
}))

// Operator schemas
export const selectOperatorsSchema = createSelectSchema(operators)

export const insertOperatorsSchema = createInsertSchema(operators).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

// Product schemas
export const selectProductsSchema = createSelectSchema(products)

export const insertProductsSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
