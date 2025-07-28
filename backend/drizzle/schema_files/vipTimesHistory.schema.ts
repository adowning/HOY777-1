import { pgTable, varchar, text, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const vipTimesHistory = pgTable("vip_times_history", {
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
			name: "vip_times_history_user_id_users_id_fk"
		}),
}));

export const selectVipTimesHistorySchema = createSelectSchema(vipTimesHistory);
export const insertVipTimesHistorySchema = createInsertSchema(vipTimesHistory);
export const patchVipTimesHistorySchema = insertVipTimesHistorySchema.partial();
export type SelectVipTimesHistory = z.infer<typeof selectVipTimesHistorySchema>;
export type InsertVipTimesHistory = z.infer<typeof insertVipTimesHistorySchema>;