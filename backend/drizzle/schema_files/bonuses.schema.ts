import { pgTable, varchar, text, jsonb, integer, foreignKey, boolean } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const bonuses = pgTable("bonuses", {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar("user_id"),
	amount: integer('amount'),
	claimed: boolean('claimed').default(false),
	type: integer('type'),
	status: integer('status'),
	now: text('now'),
	max: text('max'),
	endedAt: integer("ended_at"),
	createdAt: integer("created_at"),
	gainAmount: text("gain_amount"),
	currency: text('currency'),
	receive: integer('receive'),
	wager: integer('wager'),
	rate: integer('rate'),
	deposit: text('deposit'),
	children: jsonb('children'),
}, (table) => ({
	userIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "bonuses_user_id_users_id_fk"
		}),
}));

export const selectBonusesSchema = createSelectSchema(bonuses);
export const insertBonusesSchema = createInsertSchema(bonuses);
export const patchBonusesSchema = insertBonusesSchema.partial();
export type SelectBonuses = z.infer<typeof selectBonusesSchema>;
export type InsertBonuses = z.infer<typeof insertBonusesSchema>;