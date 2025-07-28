import { pgTable, varchar, text, integer, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const balances = pgTable("balances", {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar("user_id"),
	amount: integer('amount'),
	currency: text('currency'),
	availableBalance: integer("available_balance"),
	real: text('real'),
	bonus: text('bonus'),
}, (table) => ({
	userIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "balances_user_id_users_id_fk"
		}),
}));

export const selectBalancesSchema = createSelectSchema(balances);
export const insertBalancesSchema = createInsertSchema(balances);
export const patchBalancesSchema = insertBalancesSchema.partial();
export type SelectBalances = z.infer<typeof selectBalancesSchema>;
export type InsertBalances = z.infer<typeof insertBalancesSchema>;