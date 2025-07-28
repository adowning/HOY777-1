import { pgTable, varchar, text, integer, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const inviteStats = pgTable("invite_stats", {
	userId: varchar("user_id").primaryKey().notNull(),
	bonusMonth: text("bonus_month").default('0'),
	bonusToday: text("bonus_today").default('0'),
	bonusTotal: text("bonus_total").default('0'),
	bonusYesterdays: text("bonus_yesterdays").default('0'),
	depositUsers: integer("deposit_users").default(0),
	depositUsersMonth: integer("deposit_users_month").default(0),
	depositUsersToday: integer("deposit_users_today").default(0),
	depositUsersYesterdays: integer("deposit_users_yesterdays").default(0),
	invitedUsers: integer("invited_users").default(0),
	availableBonus: text("available_bonus").default('0'),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "invite_stats_user_id_users_id_fk"
		}),
}));

export const selectInviteStatsSchema = createSelectSchema(inviteStats);
export const insertInviteStatsSchema = createInsertSchema(inviteStats);
export const patchInviteStatsSchema = insertInviteStatsSchema.partial();
export type SelectInviteStats = z.infer<typeof selectInviteStatsSchema>;
export type InsertInviteStats = z.infer<typeof insertInviteStatsSchema>;