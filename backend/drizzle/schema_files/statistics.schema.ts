import { pgTable, varchar, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const statistics = pgTable("statistics", {
	id: varchar('id').primaryKey().notNull(),
	todayDepositedUser: integer("today_deposited_user"),
	yesterdayDepositedUser: integer("yesterday_deposited_user"),
	todayRevenue: integer("today_revenue"),
	yesterdayRevenue: integer("yesterday_revenue"),
	thisMonthDepositedUser: integer("this_month_deposited_user"),
	thisMonthRevenue: integer("this_month_revenue"),
	totalRegisteredUser: integer("total_registered_user"),
	totalDepositingUser: integer("total_depositing_user"),
	totalRevenue: integer("total_revenue"),
});

export const selectStatisticsSchema = createSelectSchema(statistics);
export const insertStatisticsSchema = createInsertSchema(statistics);
export const patchStatisticsSchema = insertStatisticsSchema.partial();
export type SelectStatistics = z.infer<typeof selectStatisticsSchema>;
export type InsertStatistics = z.infer<typeof insertStatisticsSchema>;