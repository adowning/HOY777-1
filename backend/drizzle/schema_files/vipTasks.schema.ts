import { pgTable, varchar, integer, jsonb, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users.schema"

export const vipTasks = pgTable("vip_tasks", {
	id: varchar('id').primaryKey().notNull(),
	userId: varchar("user_id"),
	index: integer('index'),
	taskId: integer("task_id"),
	taskType: integer("task_type"),
	taskTerms: jsonb("task_terms"),
	state: integer('state'),
	award: integer('award'),
}, (table) => ({
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "vip_tasks_user_id_users_id_fk"
		}),
}));

export const selectVipTasksSchema = createSelectSchema(vipTasks);
export const insertVipTasksSchema = createInsertSchema(vipTasks);
export const patchVipTasksSchema = insertVipTasksSchema.partial();
export type SelectVipTasks = z.infer<typeof selectVipTasksSchema>;
export type InsertVipTasks = z.infer<typeof insertVipTasksSchema>;