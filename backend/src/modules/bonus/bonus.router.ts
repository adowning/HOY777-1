import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import * as controller from './bonus.controller'

const tags = ['Bonus']

const getUserBonuses = createRoute({
  method: 'post', // Note: Frontend uses post for this
  path: '/bonuses',
  tags,
  responses: { 200: { description: 'User bonuses' } },
})

const cancelBonus = createRoute({
  method: 'post',
  path: '/bonuses/cancel',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ id: z.number() }),
        },
      },
    },
  },
  responses: { 200: { description: 'Cancel bonus' } },
})

const bonusRouter = new OpenAPIHono()

bonusRouter.openapi(getUserBonuses, controller.getUserBonuses)
bonusRouter.openapi(cancelBonus, controller.cancelBonus)

export default bonusRouter
