import { pgTable, varchar, text, boolean, integer, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { promoGroups } from "./promoGroups.schema"

export const promos = pgTable("promos", {
	id: varchar('id').primaryKey().notNull(),
	promoGroupId: varchar("promo_group_id"),
	name: text('name'),
	description: text('description'),
	code: text('code'),
	imagePath: text("image_path"),
	text: text('text'),
	desc: text('desc'),
	countdown: boolean('countdown'),
	content: text('content'),
	clickFeedback: integer("click_feedback"),
	buttonPath: text("button_path"),
	buttonText: text("button_text"),
}, (table) => ({
	promoGroupFk: foreignKey({
			columns: [table.promoGroupId],
			foreignColumns: [promoGroups.id],
			name: "promos_promo_group_id_promo_groups_id_fk"
		}),
}));

export const selectPromosSchema = createSelectSchema(promos);
export const insertPromosSchema = createInsertSchema(promos);
export const patchPromosSchema = insertPromosSchema.partial();
export type SelectPromos = z.infer<typeof selectPromosSchema>;
export type InsertPromos = z.infer<typeof insertPromosSchema>;