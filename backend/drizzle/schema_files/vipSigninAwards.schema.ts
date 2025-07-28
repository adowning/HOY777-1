import { pgTable, varchar, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const vipSigninAwards = pgTable("vip_signin_awards", {
	id: varchar('id').primaryKey().notNull(),
	day: integer('day'),
	award: integer('award'),
});

export const selectVipSigninAwardsSchema = createSelectSchema(vipSigninAwards);
export const insertVipSigninAwardsSchema = createInsertSchema(vipSigninAwards);
export const patchVipSigninAwardsSchema = insertVipSigninAwardsSchema.partial();
export type SelectVipSigninAwards = z.infer<typeof selectVipSigninAwardsSchema>;
export type InsertVipSigninAwards = z.infer<typeof insertVipSigninAwardsSchema>;