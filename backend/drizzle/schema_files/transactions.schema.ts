import { pgTable, varchar, text, integer, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const transactions = pgTable("transactions", {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar("user_id"),
	amount: integer('amount'),
	type: text('type'),
	status: text('status'),
	note: text('note'),
	balance: integer('balance'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "transactions_user_id_users_id_fk"
		}),
}));

export const selectTransactionsSchema = createSelectSchema(transactions);
export const insertTransactionsSchema = createInsertSchema(transactions);
export const patchTransactionsSchema = insertTransactionsSchema.partial();
export type SelectTransactions = z.infer<typeof selectTransactionsSchema>;
export type InsertTransactions = z.infer<typeof insertTransactionsSchema>;