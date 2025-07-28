import { selectGameCategoriesSchema, selectGamesSchema } from '#/db/schema/games';
import { notFoundSchema } from '#/lib/constants';
import { createRouter } from '#/lib/create-app';
import { authMiddleware } from '#/middlewares/auth.middleware';
import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, } from 'stoker/openapi/helpers';
import * as controller from './games.controller';

const tags = ['Games']

const getGameCategories = createRoute({
  method: 'get',
  path: '/games/categories',
  tags,
  // request: {
  //   query: selectGameCategoriesSchema,
  // },
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


// New and updated routes
const getAllGames = createRoute({
  method: 'get',
  path: '/games',
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

const searchGames = createRoute({
  method: 'get',
  path: '/search',
  tags,
  request: {
    query: z.object({
      game_categories_slug: z.string().optional(),
      page: z.string().optional(),
      limit: z.string().optional(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            list: z.array(selectGamesSchema),
            total: z.number(),
          }),
        },
      },
    },
  },
})

const getUserGames = createRoute({
  method: 'get',
  path: '/user/games',
  tags,
  request: {
    query: z.object({
      game_categories_slug: z.string(),
      page: z.string().optional(),
      limit: z.string().optional(),
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            list: z.array(selectGamesSchema),
            total: z.number()
          })
        }
      }
    }
  }
})


const favoriteGame = createRoute({
  method: 'post',
  path: '/user/games/favorite',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            add_game: z.number().optional(),
            del_game: z.number().optional(),
          })
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Success'
    }
  }
})

const getFavoriteGames = createRoute({
  method: 'get',
  path: '/user/games/favorites',
  tags,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(z.number())
        }
      }
    }
  }
})

const enterGame = createRoute({
  method: 'post',
  path: '/games/{id}/enter',
  tags,
  request: {
    params: z.object({
      id: z.string(),
    })
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        webUrl: z.string(),
        gameConfig: z.object({
          authToken: z.string(),
          gameSessionId: z.string(),
          userId: z.string(),
          gameName: z.string(),
          lang: z.string(),
          currency: z.string(),
          operator: z.string(),
          provider: z.string(),
          depositUrl: z.string(),
          lobbyUrl: z.string(),
          mode: z.string(),
          rgsApiBase: z.string(),
          cdn: z.string(),
          baseCdn: z.string(),
        })
      }),
      "GameSession"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "User or Game not found",
    ),
  }
});

const leaveGame = createRoute({
  method: 'post',
  path: '/games/leave',
  tags,
  responses: {
    200: {
      description: 'Success'
    }
  }
});



const router = new createRouter()
  .openapi(getAllGames, controller.getAllGames)
  .openapi(getGameCategories, controller.getGameCategories)
  .openapi(searchGames, controller.searchGames)

  // Protected routes
    .use(authMiddleware)
  
  .openapi(getUserGames, controller.getUserGames)
  .openapi(favoriteGame,  controller.favoriteGame)
  .openapi(getFavoriteGames, controller.getFavoriteGames)
  .openapi(enterGame,  controller.enterGame)
  .openapi(leaveGame, controller.leaveGame)

export default router
