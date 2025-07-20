import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import * as controller from './auth.controller'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'

const tags = ['Auth']

const loginRoute = createRoute({
  path: '/login',
  method: 'post',
  request: {
    body: jsonContentRequired(
      z.object({
        email: z.string().email(),
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
        email: z.string().email(),
        password: z.string(),
        username: z.string(),
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

const authRouter = new OpenAPIHono()

authRouter.openapi(loginRoute, controller.login)
authRouter.openapi(signupRoute, controller.signup)

export default authRouter
