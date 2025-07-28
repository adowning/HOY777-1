import { pgTable, varchar, text } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const inviteHistory = pgTable("invite_history", {
	id: varchar('id').primaryKey().notNull(),
	time: text('time'),
	user: text('user'),
	bonus: text('bonus'),
});

export const selectInviteHistorySchema = createSelectSchema(inviteHistory);
export const insertInviteHistorySchema = createInsertSchema(inviteHistory);
export const patchInviteHistorySchema = insertInviteHistorySchema.partial();
export type SelectInviteHistory = z.infer<typeof selectInviteHistorySchema>;
export type InsertInviteHistory = z.infer<typeof insertInviteHistorySchema>;