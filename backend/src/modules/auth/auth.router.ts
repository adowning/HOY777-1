import { createRoute, z } from '@hono/zod-openapi'
import * as controller from './auth.controller'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createRouter } from '../../lib/create-app'

const tags = ['Auth']

const loginRoute = createRoute({
  path: '/login',
  method: 'post',
  request: {
    body: jsonContentRequired(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
      'The user to login'
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        token: z.string(),
      }),
      'The login token'
    ),
  },
})

const signupRoute = createRoute({
  path: '/signup',
  method: 'post',
  request: {
    body: jsonContentRequired(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
      'The user to signup'
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        token: z.string(),
      }),
      'The signup token'
    ),
  },
})

const router = createRouter()
  .openapi(loginRoute, controller.login)
  .openapi(signupRoute, controller.signup)

export default router
