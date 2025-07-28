import { pgTable, varchar, integer, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"
import { achievements } from "./achievements.schema"

export const userAchievements = pgTable("user_achievements", {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar("user_id").notNull(),
	achievementId: varchar("achievement_id").notNull(),
	progress: integer('progress').default(0).notNull(),
	status: integer('status').default(0).notNull(),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_achievements_user_id_users_id_fk"
		}),
	achievementFk: foreignKey({
			columns: [table.achievementId],
			foreignColumns: [achievements.id],
			name: "user_achievements_achievement_id_achievements_id_fk"
		}),
}));

export const selectUserAchievementsSchema = createSelectSchema(userAchievements);
export const insertUserAchievementsSchema = createInsertSchema(userAchievements);
export const patchUserAchievementsSchema = insertUserAchievementsSchema.partial();
export type SelectUserAchievements = z.infer<typeof selectUserAchievementsSchema>;
export type InsertUserAchievements = z.infer<typeof insertUserAchievementsSchema>;