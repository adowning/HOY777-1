import { pgTable, varchar, text, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const vipRebateHistory = pgTable("vip_rebate_history", {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar("user_id"),
	notesId: text("notes_id"),
	createdAt: text("created_at"),
	amount: text('amount'),
	cashBack: text("cash_back"),
	vipLevel: text("vip_level"),
	vipRate: text("vip_rate"),
	gameType: text("game_type"),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "vip_rebate_history_user_id_users_id_fk"
		}),
}));

export const selectVipRebateHistorySchema = createSelectSchema(vipRebateHistory);
export const insertVipRebateHistorySchema = createInsertSchema(vipRebateHistory);
export const patchVipRebateHistorySchema = insertVipRebateHistorySchema.partial();
export type SelectVipRebateHistory = z.infer<typeof selectVipRebateHistorySchema>;
export type InsertVipRebateHistory = z.infer<typeof insertVipRebateHistorySchema>;