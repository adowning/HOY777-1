import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../../src/db'
import { games, gameCategories } from '../../src/db'
import { rand } from '@ngneat/falso'
import * as rawgames from './json/games2.json'

const CATEGORIES = [
  { name: 'Slots', slug: 'slots', type: 'slot' },
  { name: 'Live Casino', slug: 'live-casino', type: 'live' },
  { name: 'Table Games', slug: 'table-games', type: 'table' },
]

const GAMES = []
console.log(rawgames)
for (var game of rawgames.default) {
  GAMES.push(game)
}
// rawgames.forEach((game) => {
// })
export async function seedGames(db: NodePgDatabase<typeof schema>) {
  console.log('🎮 Seeding games and categories...')

  const createdCategories = await db
    .insert(gameCategories)
    .values(CATEGORIES)
    .returning()

  const gamesToInsert = GAMES.map((game) => ({
    ...game,
    categoryId: rand(createdCategories).id,
  }))

  await db.insert(games).values(gamesToInsert).onConflictDoNothing()

  console.log('✅ Games and categories seeded.')
}
