import { createRoute, z } from '@hono/zod-openapi'
import * as controller from './games.controller'
import {
  selectGameCategoriesSchema,
  selectGamesSchema,
  selectGameBigWinsSchema,
} from '../../db'
import { createRouter } from '../../lib/create-app'

const tags = ['Games']

const getGameCategories = createRoute({
  method: 'get',
  path: '/games/categories',
  tags,
  request: {
    query: selectGameCategoriesSchema,
  },
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

const router = new createRouter()
  .openapi(getGameCategories, controller.getGameCategories)
  .openapi(searchGames, controller.searchGames)
  .openapi(getBigWins, controller.getBigWins)

export default router
