import { pgTable, varchar, text } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const currencies = pgTable("currencies", {
	id: varchar('id').primaryKey().notNull(),
	name: text('name'),
	code: text('code'),
});

export const selectCurrenciesSchema = createSelectSchema(currencies);
export const insertCurrenciesSchema = createInsertSchema(currencies);
export const patchCurrenciesSchema = insertCurrenciesSchema.partial();
export type SelectCurrencies = z.infer<typeof selectCurrenciesSchema>;
export type InsertCurrencies = z.infer<typeof insertCurrenciesSchema>;