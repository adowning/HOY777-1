import { pgTable, varchar, text, boolean, integer, timestamp, unique } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { paymentMethod } from "./enums.schema"

export const operators = pgTable("operators", {
	id: varchar('id').primaryKey().notNull(),
	name: text('name').notNull(),
	operatorSecret: text("operator_secret").notNull(),
	operatorAccess: text("operator_access").notNull(),
	callbackUrl: text("callback_url").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	allowedIps: text("allowed_ips").array().notNull(),
	description: text('description'),
	balance: integer('balance').default(0).notNull(),
	netRevenue: integer("net_revenue").default(0).notNull(),
	acceptedPayments: paymentMethod("accepted_payments").array().notNull(),
	ownerId: text("owner_id"),
	lastUsedAt: timestamp("last_used_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},(table) => ({
	nameUnique: unique("operators_name_unique").on(table.name),
}));

export const selectOperatorsSchema = createSelectSchema(operators);
export const insertOperatorsSchema = createInsertSchema(operators);
export const patchOperatorsSchema = insertOperatorsSchema.partial();
export type SelectOperators = z.infer<typeof selectOperatorsSchema>;
export type InsertOperators = z.infer<typeof insertOperatorsSchema>;