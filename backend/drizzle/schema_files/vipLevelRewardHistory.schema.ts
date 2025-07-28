import { pgTable, varchar, text, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const vipLevelRewardHistory = pgTable("vip_level_reward_history", {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar("user_id"),
	notesId: text("notes_id"),
	createdAt: text("created_at"),
	amount: text('amount'),
	vipLevel: text("vip_level"),
	type: text('type'),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "vip_level_reward_history_user_id_users_id_fk"
		}),
}));

export const selectVipLevelRewardHistorySchema = createSelectSchema(vipLevelRewardHistory);
export const insertVipLevelRewardHistorySchema = createInsertSchema(vipLevelRewardHistory);
export const patchVipLevelRewardHistorySchema = insertVipLevelRewardHistorySchema.partial();
export type SelectVipLevelRewardHistory = z.infer<typeof selectVipLevelRewardHistorySchema>;
export type InsertVipLevelRewardHistory = z.infer<typeof insertVipLevelRewardHistorySchema>;