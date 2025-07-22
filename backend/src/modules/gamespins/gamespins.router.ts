// routes/gameSpin/gameSpin.router.ts
import { createRouter } from '../../lib/create-app'
import * as controller from './gameSpins.controller'
import { createRoute, z } from '@hono/zod-openapi'
import { gameSpinsDocumentationSchema } from '#/db'
import { authMiddleware } from '#/middlewares/auth.middleware'

const tags = ['GameSpins']

const getGameSpins = createRoute({
  method: 'get',
  path: '/gamespins',
  tags,
  responses: {
    200: {
      description: 'List of game spins',
      content: {
        'application/json': {
          schema: z.array(gameSpinsDocumentationSchema),
        },
      },
    },
  },
})

const getTopWins = createRoute({
    method: 'get',
    path: '/gamespins/top-wins',
    tags,
    responses: {
        200: {
            description: 'Top 10 winning spins',
            content: { 'application/json': { schema: z.array(gameSpinsDocumentationSchema) } },
        },
    },
});

const getGameSpinById = createRoute({
    method: 'get',
    path: '/gamespins/{id}',
    tags,
    request: { params: z.object({ id: z.string() }) },
    responses: {
        200: {
            description: 'A single game spin',
            content: { 'application/json': { schema: gameSpinsDocumentationSchema } },
        },
        404: { description: 'Spin not found' },
    },
});

const getUserGameSpins = createRoute({
    method: 'delete',
    path: '/gamespins/user',
    tags,
  responses: {
    200: {
      description: 'List of game spins for the user',
      content: {
        'application/json': {
          schema: z.array(gameSpinsDocumentationSchema),
        },
      },
    },
  },
});


const router = new createRouter()
    .use(authMiddleware)
  .openapi(getGameSpins, controller.getGameSpins)
  .openapi(getTopWins, controller.getTopWins)
  .openapi(getGameSpinById, controller.getGameSpinById)
  .openapi(getUserGameSpins, controller.getUserGameSpins)

export default router