import { pgTable, varchar, text } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const promoGroups = pgTable("promo_groups", {
	id: varchar('id').primaryKey().notNull(),
	name: text('name').notNull(),
});

export const selectPromoGroupsSchema = createSelectSchema(promoGroups);
export const insertPromoGroupsSchema = createInsertSchema(promoGroups);
export const patchPromoGroupsSchema = insertPromoGroupsSchema.partial();
export type SelectPromoGroups = z.infer<typeof selectPromoGroupsSchema>;
export type InsertPromoGroups = z.infer<typeof insertPromoGroupsSchema>;