// db/schema/promos.ts
import { pgTable, text, integer, boolean, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { transformSchemaForOpenAPI } from '#/lib/schema-transformer'
import { nanoid } from '../../utils/nanoid'

export const promoGroups = pgTable('promo_groups', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  name: text('name').notNull(),
})

export const promos = pgTable('promos', {
  id: varchar('id').primaryKey().$defaultFn(nanoid),
  promoGroupId: varchar('promo_group_id').references(() => promoGroups.id),
  name: text('name'),
  description: text('description'),
  code: text('code'),
  imagePath: text('image_path'),
  text: text('text'),
  desc: text('desc'),
  countdown: boolean('countdown'),
  content: text('content'),
  clickFeedback: integer('click_feedback'),
  buttonPath: text('button_path'),
  buttonText: text('button_text'),
})

export const promosRelations = relations(promos, ({ one }) => ({
  promoGroup: one(promoGroups, {
    fields: [promos.promoGroupId],
    references: [promoGroups.id],
  }),
}))

export const promoGroupsRelations = relations(promoGroups, ({ many }) => ({
  promos: many(promos),
}))

export const selectPromoGroupsSchema = transformSchemaForOpenAPI(
  createSelectSchema(promoGroups)
)
export const insertPromoGroupsSchema = transformSchemaForOpenAPI(
  createInsertSchema(promoGroups)
)
