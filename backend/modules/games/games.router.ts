import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import * as controller from './games.controller'
import {
  selectGameCategoriesSchema,
  selectGamesSchema,
  selectGameBigWinsSchema,
} from '../../db/schemelibsql'

const tags = ['Games']

const getGameCategories = createRoute({
  method: 'get',
  path: '/categories',
  tags,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(selectGameCategoriesSchema),
        },
      },
    },
  },
})

const searchGames = createRoute({
  method: 'get',
  path: '/search',
  tags,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(selectGamesSchema),
        },
      },
    },
  },
})

const getBigWins = createRoute({
  method: 'get',
  path: '/bigwin',
  tags,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            high_rollers: z.array(selectGameBigWinsSchema),
            lucky_bets: z.array(selectGameBigWinsSchema),
          }),
        },
      },
    },
  },
})

const gamesRouter = new OpenAPIHono()

gamesRouter.openapi(getGameCategories, controller.getGameCategories)
gamesRouter.openapi(searchGames, controller.searchGames)
gamesRouter.openapi(getBigWins, controller.getBigWins)

export default gamesRouter
