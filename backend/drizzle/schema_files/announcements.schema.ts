import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const announcements = pgTable("announcements", {
	id: varchar('id').primaryKey().notNull(),
	content: text('content'),
	startsAt: timestamp("starts_at", { mode: 'string' }),
	endsAt: timestamp("ends_at", { mode: 'string' }),
});

export const selectAnnouncementsSchema = createSelectSchema(announcements);
export const insertAnnouncementsSchema = createInsertSchema(announcements);
export const patchAnnouncementsSchema = insertAnnouncementsSchema.partial();
export type SelectAnnouncements = z.infer<typeof selectAnnouncementsSchema>;
export type InsertAnnouncements = z.infer<typeof insertAnnouncementsSchema>;