// db/schema/misc.ts
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { nanoid } from '../nanoid'
import { users } from './users'

export const messages = pgTable('messages', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  userId: varchar('user_id').references(() => users.id),
  read: boolean('read').default(false),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const banners = pgTable('banners', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  imagePath: text('image_path'),
  linkUrl: text('link_url'),
  iconPath: text('icon_path'),
  clickFeedback: integer('click_feedback'),
  content: text('content'),
})

export const announcements = pgTable('announcements', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  content: text('content'),
  startsAt: timestamp('starts_at'),
  endsAt: timestamp('ends_at'),
})

export const currencies = pgTable('currencies', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  name: text('name'),
  code: text('code'),
})

export const languages = pgTable('languages', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  name: text('name'),
  code: text('code'),
})

export const countries = pgTable('countries', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  name: text('name'),
  code: text('code'),
})

export const achievementItems = pgTable('achievement_items', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  index: integer('index'),
  num: integer('num'),
  award: integer('award'),
  state: integer('state'),
  rate: integer('rate'),
})

export const explainItems = pgTable('explain_items', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  index: integer('index'),
  num: integer('num'),
  award: integer('award'),
  status: integer('status'),
  rate: integer('rate'),
})

export const liveWins = pgTable('live_wins', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  image: text('image'),
  level: integer('level'),
  gameName: text('game_name'),
  bettingAmount: text('betting_amount'),
})

export const statistics = pgTable('statistics', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  todayDepositedUser: integer('today_deposited_user'),
  yesterdayDepositedUser: integer('yesterday_deposited_user'),
  todayRevenue: integer('today_revenue'),
  yesterdayRevenue: integer('yesterday_revenue'),
  thisMonthDepositedUser: integer('this_month_deposited_user'),
  thisMonthRevenue: integer('this_month_revenue'),
  totalRegisteredUser: integer('total_registered_user'),
  totalDepositingUser: integer('total_depositing_user'),
  totalRevenue: integer('total_revenue'),
})

export const chatMessages = pgTable('chat_messages', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  type: text('type'),
  avatar: text('avatar'),
  grade: text('grade'),
  gradeColor: text('grade_color'),
  gradeBackground: text('grade_background'),
  sender: text('sender'),
  receiver: text('receiver'),
  message: text('message'),
  starLevel: jsonb('star_level'),
})

export const inviteHistory = pgTable('invite_history', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  time: text('time'),
  user: text('user'),
  bonus: text('bonus'),
})

export const selectCurrenciesSchema = createSelectSchema(currencies)
