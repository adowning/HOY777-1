import { pgTable, varchar, text, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const inviteCommissionHistory = pgTable("invite_commission_history", {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar("user_id").notNull(),
	fromUserId: varchar("from_user_id"),
	bonus: text('bonus').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "invite_commission_history_user_id_users_id_fk"
		}),
	fromUserFk: foreignKey({
			columns: [table.fromUserId],
			foreignColumns: [users.id],
			name: "invite_commission_history_from_user_id_users_id_fk"
		}),
}));

export const selectInviteCommissionHistorySchema = createSelectSchema(inviteCommissionHistory);
export const insertInviteCommissionHistorySchema = createInsertSchema(inviteCommissionHistory);
export const patchInviteCommissionHistorySchema = insertInviteCommissionHistorySchema.partial();
export type SelectInviteCommissionHistory = z.infer<typeof selectInviteCommissionHistorySchema>;
export type InsertInviteCommissionHistory = z.infer<typeof insertInviteCommissionHistorySchema>;