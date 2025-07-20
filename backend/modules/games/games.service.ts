import db from '../../db'
import { gameCategories, games, gameBigWins } from '../../db/schemelibsql'
import { desc } from 'drizzle-orm'

export const findGameCategories = async () => {
  return await db.select().from(gameCategories)
}

export const searchGames = async () => {
  // This is a placeholder for a more complex search query
  return await db.select().from(games)
}

export const findBigWins = async () => {
  const high_rollers = await db
    .select()
    .from(gameBigWins)
    .orderBy(desc(gameBigWins.winAmount))
    .limit(10)
  const lucky_bets = await db
    .select()
    .from(gameBigWins)
    .orderBy(desc(gameBigWins.multiplier))
    .limit(10)
  return {
    high_rollers,
    lucky_bets,
  }
}
