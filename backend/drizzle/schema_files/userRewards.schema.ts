import { pgTable, varchar, text, integer, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const userRewards = pgTable("user_rewards", {
	userId: varchar("user_id").primaryKey().notNull(),
	achievementBonus: text("achievement_bonus").default('0'),
	achievementStatus: integer("achievement_status").default(0).notNull(),
	cashBack: text("cash_back").default('0'),
	weeklyBonus: text("weekly_bonus").default('0'),
	levelUpBonuses: integer("level_up_bonuses").default(0).notNull(),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_rewards_user_id_users_id_fk"
		}),
}));

export const selectUserRewardsSchema = createSelectSchema(userRewards);
export const insertUserRewardsSchema = createInsertSchema(userRewards);
export const patchUserRewardsSchema = insertUserRewardsSchema.partial();
export type SelectUserRewards = z.infer<typeof selectUserRewardsSchema>;
export type InsertUserRewards = z.infer<typeof insertUserRewardsSchema>;