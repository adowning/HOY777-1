import { pgTable, text, integer, numeric, timestamp, index, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { sessionStatus } from "./enums.schema"
import { authSessions } from "./authSessions.schema"
import { users } from "./users.schema"
import { games } from "./games.schema"

export const gameSessions = pgTable("game_sessions", {
	id: text('id').primaryKey().notNull(),
	authSessionId: text("auth_session_id").notNull(),
	userId: text("user_id").notNull(),
	gameId: text("game_id"),
	status: sessionStatus('status').default('ACTIVE').notNull(),
	totalWagered: integer("total_wagered").default(0).notNull(),
	totalWon: integer("total_won").default(0).notNull(),
	totalXpGained: integer("total_xp_gained").default(0).notNull(),
	rtp: numeric('rtp', { precision: 5, scale:  2 }),
	duration: integer('duration').default(0).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	endAt: timestamp("end_at", { withTimezone: true, mode: 'string' }),
}, (table) => ({
	authSessionIdx: index("game_session_auth_session_idx").on(table.authSessionId),
	userIdx: index("game_session_user_idx").on(table.userId),
	authSessionFk: foreignKey({ columns: [table.authSessionId], foreignColumns: [authSessions.id], name: "game_sessions_auth_session_id_auth_sessions_id_fk" }).onDelete("cascade"),
	userFk: foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: "game_sessions_user_id_users_id_fk" }).onDelete("cascade"),
	gameFk: foreignKey({ columns: [table.gameId], foreignColumns: [games.id], name: "game_sessions_game_id_games_id_fk" }).onDelete("cascade"),
}));

export const selectGameSessionsSchema = createSelectSchema(gameSessions);
export const insertGameSessionsSchema = createInsertSchema(gameSessions);
export const patchGameSessionsSchema = insertGameSessionsSchema.partial();
export type SelectGameSessions = z.infer<typeof selectGameSessionsSchema>;
export type InsertGameSessions = z.infer<typeof insertGameSessionsSchema>;