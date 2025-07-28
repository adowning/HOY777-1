import { pgTable, text, timestamp, index, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { sessionStatus } from "./enums.schema"
import { users } from "./users.schema"

export const authSessions = pgTable("auth_sessions", {
	id: text('id').primaryKey().notNull(),
	userId: text("user_id").notNull(),
	status: sessionStatus('status').default('ACTIVE').notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	deviceId: text("device_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }),
	lastSeen: timestamp("last_seen", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => ({
	statusIdx: index("auth_session_status_idx").on(table.status),
	userIdx: index("auth_session_user_idx").on(table.userId, table.createdAt),
	userFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "auth_sessions_user_id_users_id_fk"
		}).onDelete("cascade"),
}));

export const selectAuthSessionsSchema = createSelectSchema(authSessions);
export const insertAuthSessionsSchema = createInsertSchema(authSessions);
export const patchAuthSessionsSchema = insertAuthSessionsSchema.partial();
export type SelectAuthSessions = z.infer<typeof selectAuthSessionsSchema>;
export type InsertAuthSessions = z.infer<typeof insertAuthSessionsSchema>;