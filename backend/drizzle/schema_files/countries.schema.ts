import { pgTable, varchar, text } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const countries = pgTable("countries", {
	id: varchar('id').primaryKey().notNull(),
	name: text('name'),
	code: text('code'),
});

export const selectCountriesSchema = createSelectSchema(countries);
export const insertCountriesSchema = createInsertSchema(countries);
export const patchCountriesSchema = insertCountriesSchema.partial();
export type SelectCountries = z.infer<typeof selectCountriesSchema>;
export type InsertCountries = z.infer<typeof insertCountriesSchema>;