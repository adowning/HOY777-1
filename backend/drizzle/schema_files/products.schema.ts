import { pgTable, varchar, text, integer, boolean, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { operators } from "./operators.schema"

export const products = pgTable("products", {
	id: varchar('id').primaryKey().notNull(),
	title: text('title').default('default').notNull(),
	productType: text("product_type").default('bundle').notNull(),
	bonusTotalInCredits: integer("bonus_total_in_credits").default(0).notNull(),
	isActive: boolean("is_active"),
	priceInCents: integer("price_in_cents").default(0).notNull(),
	amountToReceiveInCredits: integer("amount_to_receive_in_credits").default(0).notNull(),
	bestValue: integer("best_value").default(0).notNull(),
	discountInCents: integer("discount_in_cents").default(0).notNull(),
	bonusSpins: integer("bonus_spins").default(0).notNull(),
	isPromo: boolean("is_promo").default(false),
	totalDiscountInCents: integer("total_discount_in_cents").default(0).notNull(),
	operatorId: text("operator_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => ({
	operatorIdFk: foreignKey({
			columns: [table.operatorId],
			foreignColumns: [operators.id],
			name: "products_operator_id_operators_id_fk"
		}).onDelete("cascade"),
}));

export const selectProductsSchema = createSelectSchema(products);
export const insertProductsSchema = createInsertSchema(products);
export const patchProductsSchema = insertProductsSchema.partial();
export type SelectProducts = z.infer<typeof selectProductsSchema>;
export type InsertProducts = z.infer<typeof insertProductsSchema>;