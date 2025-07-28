// db/schema/wallets.ts
import {
  pgTable,
  integer,
  boolean,
  timestamp,
  varchar,
  index,
  text,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { nanoid } from '../nanoid'
import { users } from './users'
import { operators, paymentMethodEnum } from './operators'
import { z } from 'zod'
import { transformSchemaForOpenAPI } from '../../schema-transformer'

export const wallets = pgTable(
  'wallets',
  {
    id: varchar('id').primaryKey().$defaultFn(nanoid),
    balance: integer('balance').default(0).notNull(),
    paymentMethod: paymentMethodEnum('payment_method')
      .default('INSTORE_CASH')
      .notNull(),
    currency: varchar('currency', { length: 3 }).default('USD').notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    isDefault: boolean('is_default').default(false).notNull(),
    address: varchar('address', { length: 255 }).unique(),
    cashtag: varchar('cashtag', { length: 50 }).unique(),
    userId: text('user_id')
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: 'cascade' }),
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

export const walletsRelations = relations(wallets, ({ one }) => ({
  user: one(users, {
    fields: [wallets.userId],
    references: [users.id],
  }),
  operator: one(operators, {
    fields: [wallets.operatorId],
    references: [operators.id],
  }),
}))

// export const selectWalletsSchema = transformSchemaForOpenAPI(
//   createSelectSchema(wallets)
// )

// export const insertWalletsSchema = transformSchemaForOpenAPI(
//   createInsertSchema(wallets).omit({ // Add z.object around the omit method
//     id: true,
//     createdAt: true,
//     updatedAt: true,
//   })
// )
