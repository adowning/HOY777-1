import { pgTable, varchar, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const vipLevelAwards = pgTable("vip_level_awards", {
	id: varchar('id').primaryKey().notNull(),
	level: integer('level'),
	award: integer('award'),
});

export const selectVipLevelAwardsSchema = createSelectSchema(vipLevelAwards);
export const insertVipLevelAwardsSchema = createInsertSchema(vipLevelAwards);
export const patchVipLevelAwardsSchema = insertVipLevelAwardsSchema.partial();
export type SelectVipLevelAwards = z.infer<typeof selectVipLevelAwardsSchema>;
export type InsertVipLevelAwards = z.infer<typeof insertVipLevelAwardsSchema>;