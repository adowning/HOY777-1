import { pgTable, varchar, text, jsonb, real, integer, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { gameSessions } from "./gameSessions.schema"
import { users } from "./users.schema"

export const gameSpins = pgTable("game_spins", {
	id: varchar('id').primaryKey().notNull(),
	playerName: text("player_name"),
	gameName: text("game_name"),
	spinData: jsonb("spin_data"),
	grossWinAmount: real("gross_win_amount"),
	wagerAmount: real("wager_amount"),
	spinNumber: integer("spin_number").default(0),
	playerAvatar: text("player_avatar"),
	sessionId: varchar("session_id"),
	userId: varchar("user_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	occurredAt: timestamp("occurred_at", { mode: 'string' }),
}, (table) => ({
	sessionFk: foreignKey({ columns: [table.sessionId], foreignColumns: [gameSessions.id], name: "game_spins_session_id_game_sessions_id_fk" }),
	userFk: foreignKey({ columns: [table.userId], foreignColumns: [users.id], name: "game_spins_user_id_users_id_fk" }),
}));

export const selectGameSpinsSchema = createSelectSchema(gameSpins);
export const insertGameSpinsSchema = createInsertSchema(gameSpins);
export const patchGameSpinsSchema = insertGameSpinsSchema.partial();
export type SelectGameSpins = z.infer<typeof selectGameSpinsSchema>;
export type InsertGameSpins = z.infer<typeof insertGameSpinsSchema>;