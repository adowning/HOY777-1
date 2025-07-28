import { pgTable, varchar, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const invites = pgTable("invites", {
	id: varchar('id').primaryKey().notNull(),
	inviterId: varchar("inviter_id"),
	inviteeId: varchar("invitee_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => ({
	inviterFk: foreignKey({
			columns: [table.inviterId],
			foreignColumns: [users.id],
			name: "invites_inviter_id_users_id_fk"
		}),
	inviteeFk: foreignKey({
			columns: [table.inviteeId],
			foreignColumns: [users.id],
			name: "invites_invitee_id_users_id_fk"
		}),
}));

export const selectInvitesSchema = createSelectSchema(invites);
export const insertInvitesSchema = createInsertSchema(invites);
export const patchInvitesSchema = insertInvitesSchema.partial();
export type SelectInvites = z.infer<typeof selectInvitesSchema>;
export type InsertInvites = z.infer<typeof insertInvitesSchema>;