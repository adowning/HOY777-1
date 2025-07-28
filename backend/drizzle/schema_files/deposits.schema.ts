import { pgTable, varchar, text, integer, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const deposits = pgTable("deposits", {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar("user_id"),
	amount: integer('amount'),
	status: text('status'),
	idNumber: text("id_number"),
	firstName: text("first_name"),
	lastName: text("last_name"),
	channelsId: text("channels_id"),
	note: text('note'),
	currency: text('currency'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "deposits_user_id_users_id_fk"
		}),
}));

export const selectDepositsSchema = createSelectSchema(deposits);
export const insertDepositsSchema = createInsertSchema(deposits);
export const patchDepositsSchema = insertDepositsSchema.partial();
export type SelectDeposits = z.infer<typeof selectDepositsSchema>;
export type InsertDeposits = z.infer<typeof insertDepositsSchema>;