import { pgTable, varchar, text, jsonb } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const chatMessages = pgTable("chat_messages", {
	id: varchar('id').primaryKey().notNull(),
	type: text('type'),
	avatar: text('avatar'),
	grade: text('grade'),
	gradeColor: text("grade_color"),
	gradeBackground: text("grade_background"),
	sender: text('sender'),
	receiver: text('receiver'),
	message: text('message'),
	starLevel: jsonb("star_level"),
});

export const selectChatMessagesSchema = createSelectSchema(chatMessages);
export const insertChatMessagesSchema = createInsertSchema(chatMessages);
export const patchChatMessagesSchema = insertChatMessagesSchema.partial();
export type SelectChatMessages = z.infer<typeof selectChatMessagesSchema>;
export type InsertChatMessages = z.infer<typeof insertChatMessagesSchema>;