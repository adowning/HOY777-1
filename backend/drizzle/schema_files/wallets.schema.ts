import { pgTable, varchar, integer, boolean, text, timestamp, index, foreignKey, unique } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { paymentMethod } from "./enums.schema"
import { users } from "./users.schema"
import { operators } from "./operators.schema"

export const wallets = pgTable("wallets", {
	id: varchar('id').primaryKey().notNull(),
	balance: integer('balance').default(0).notNull(),
	paymentMethod: paymentMethod("payment_method").default('INSTORE_CASH').notNull(),
	currency: varchar('currency', { length: 3 }).default('USD').notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	isDefault: boolean("is_default").default(false).notNull(),
	address: varchar('address', { length: 255 }),
	cashtag: varchar('cashtag', { length: 50 }),
	userId: text("user_id").notNull(),
	operatorId: text("operator_id").notNull(),
	lastUsedAt: timestamp("last_used_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => ({
	cashtagIdx: index("wallet_cashtag_idx").on(table.cashtag),
	isActiveIdx: index("wallet_is_active_idx").on(table.isActive),
	operatorIdIdx: index("wallet_operator_id_idx").on(table.operatorId),
	userIdIdx: index("wallet_user_id_idx").on(table.userId),
	userIdFk: foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: "wallets_user_id_users_id_fk" }).onDelete("cascade"),
	operatorIdFk: foreignKey({ columns: [table.operatorId], foreignColumns: [operators.id], name: "wallets_operator_id_operators_id_fk" }).onDelete("cascade"),
	addressUnique: unique("wallets_address_unique").on(table.address),
	cashtagUnique: unique("wallets_cashtag_unique").on(table.cashtag),
	userIdUnique: unique("wallets_user_id_unique").on(table.userId),
}));

export const selectWalletsSchema = createSelectSchema(wallets);
export const insertWalletsSchema = createInsertSchema(wallets);
export const patchWalletsSchema = insertWalletsSchema.partial();
export type SelectWallets = z.infer<typeof selectWalletsSchema>;
export type InsertWallets = z.infer<typeof insertWalletsSchema>;