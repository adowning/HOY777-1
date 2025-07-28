import { pgTable, varchar, text, jsonb, integer, boolean, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { role } from "./enums.schema"

export const users = pgTable("users", {
	id: varchar('id').primaryKey().notNull(),
	uid: text('uid'),
	username: text('username').notNull(),
	email: text('email'),
	passwordHash: text("password_hash"),
	phone: text('phone'),
	avatar: text('avatar'),
	balance: integer('balance'),
	withdrawable: integer('withdrawable'),
	vipLevel: integer("vip_level"),
	inviteUrl: text("invite_url"),
	inviteCode: text("invite_code"),
	firstName: text("first_name"),
	lastName: text("last_name"),
	idNumber: text("id_number"),
	emailConfirmed: boolean("email_confirmed").default(false),
	phoneConfirmed: boolean("phone_confirmed").default(false),
	dateOfBirth: text("date_of_birth"),
	county: text('county'),
	role: role('role').default('user').notNull(),
	state: text('state'),
	city: text('city'),
	address: text('address'),
	postalCode: text("postal_code"),
	language: text('language'),
	currentGameSesssion: text("current_game_sesssion"),
	locale: text('locale'),
	initialProfileComplete: boolean("initial_profile_complete").default(false),
	isSuspended: integer("is_suspended"),
	sysCommunications: boolean("sys_communications").default(false),
	lockedPersonalInfoFields: jsonb("locked_personal_info_fields"),
	lastSeenAt: timestamp("last_seen_at", { mode: 'string' }),
	lastStartedAt: timestamp("last_started_at", { mode: 'string' }),
	lastSignInAt: timestamp("last_sign_in_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const selectUsersSchema = createSelectSchema(users);
export const insertUsersSchema = createInsertSchema(users);
export const patchUsersSchema = insertUsersSchema.partial();
export type SelectUsers = z.infer<typeof selectUsersSchema>;
export type InsertUsers = z.infer<typeof insertUsersSchema>;