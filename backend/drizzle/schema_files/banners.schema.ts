import { pgTable, varchar, text, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const banners = pgTable("banners", {
	id: varchar('id').primaryKey().notNull(),
	imagePath: text("image_path"),
	linkUrl: text("link_url"),
	iconPath: text("icon_path"),
	clickFeedback: integer("click_feedback"),
	content: text('content'),
});

export const selectBannersSchema = createSelectSchema(banners);
export const insertBannersSchema = createInsertSchema(banners);
export const patchBannersSchema = insertBannersSchema.partial();
export type SelectBanners = z.infer<typeof selectBannersSchema>;
export type InsertBanners = z.infer<typeof insertBannersSchema>;