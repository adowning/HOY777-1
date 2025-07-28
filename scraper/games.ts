import { rand } from '@ngneat/falso'
import { db, gameCategories, games } from './db'

const CATEGORIES = [
  { name: 'Slots', slug: 'slots', type: 'slot' },
  { name: 'Lobby', slug: 'lobby', type: 'lobby' },
  { name: 'Live Casino', slug: 'live-casino', type: 'live' },
  { name: 'Table Games', slug: 'table-games', type: 'table' },
]

async function seedGames(db: any) {
  const rawgames = await import('./games2.json') as any;
  const GAMES: any[]  = []
  for (var game of rawgames.default) {
    (game as any).category = (game as any).gamebank || (game as any).type
    GAMES.push(game)
  }
  // rawgames.forEach((game) => {
  // })
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
 
seedGames(db)