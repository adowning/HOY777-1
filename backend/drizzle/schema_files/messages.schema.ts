import { pgTable, varchar, boolean, text, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const messages = pgTable("messages", {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar("user_id"),
	read: boolean('read').default(false),
	content: text('content'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "messages_user_id_users_id_fk"
		}),
}));

export const selectMessagesSchema = createSelectSchema(messages);
export const insertMessagesSchema = createInsertSchema(messages);
export const patchMessagesSchema = insertMessagesSchema.partial();
export type SelectMessages = z.infer<typeof selectMessagesSchema>;
export type InsertMessages = z.infer<typeof insertMessagesSchema>;