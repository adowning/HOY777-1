import { pgTable, varchar, text, integer, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const withdrawals = pgTable("withdrawals", {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar("user_id"),
	amount: integer('amount'),
	status: text('status'),
	idNumber: text("id_number"),
	firstName: text("first_name"),
	lastName: text("last_name"),
	channelsId: text("channels_id"),
	note: text('note'),
	currencyType: text("currency_type"),
	currency: text('currency'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "withdrawals_user_id_users_id_fk"
		}),
}));

export const selectWithdrawalsSchema = createSelectSchema(withdrawals);
export const insertWithdrawalsSchema = createInsertSchema(withdrawals);
export const patchWithdrawalsSchema = insertWithdrawalsSchema.partial();
export type SelectWithdrawals = z.infer<typeof selectWithdrawalsSchema>;
export type InsertWithdrawals = z.infer<typeof insertWithdrawalsSchema>;