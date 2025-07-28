import { pgTable, varchar, text } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const languages = pgTable("languages", {
	id: varchar('id').primaryKey().notNull(),
	name: text('name'),
	code: text('code'),
});

export const selectLanguagesSchema = createSelectSchema(languages);
export const insertLanguagesSchema = createInsertSchema(languages);
export const patchLanguagesSchema = insertLanguagesSchema.partial();
export type SelectLanguages = z.infer<typeof selectLanguagesSchema>;
export type InsertLanguages = z.infer<typeof insertLanguagesSchema>;