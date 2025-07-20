import { Context } from 'hono'
import * as service from './games.service'

export const getGameCategories = async (c: Context) => {
  const data = await service.findGameCategories()
  return c.json({ code: 0, data, message: 'Success' })
}

export const searchGames = async (c: Context) => {
  const data = await service.searchGames()
  return c.json({ code: 0, data, message: 'Success' })
}

export const getBigWins = async (c: Context) => {
  const data = await service.findBigWins()
  return c.json({ code: 0, data, message: 'Success' })
}
