import { createRoute, z } from '@hono/zod-openapi'
import * as controller from './auth.controller'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createRouter } from '#/lib/create-app'
import { sessionResponseSchema,  } from '#/db'
import { authMiddleware } from '#/middlewares/auth.middleware'
import { sessionMiddleware } from '#/middlewares/session.middleware'

const tags = ['Auth']

const loginRoute = createRoute({
  path: '/login',
  method: 'post',
  request: {
    body: jsonContentRequired(
      z.object({
        username: z.string(),
        password: z.string(),
        uid: z.string().optional(),
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

const sessionRoute = createRoute({
  method: 'get',
  path: '/me',
  tags: ['Auth'],
  middleware: [authMiddleware, sessionMiddleware],
  summary: 'Get current user session',
  responses: {

    [HttpStatusCodes.OK]: jsonContent(

      sessionResponseSchema,
      'The current user session'
    ),
  },
})

const logoutRoute = createRoute({
  method: 'post',
  path: '/logout',
  tags: ['Auth'],
  summary: 'Logout current user',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Logout successful'
    ),
  },
})

// Public routes
const publicRouter = createRouter()
  .openapi(loginRoute, controller.login)
  .openapi(signupRoute, controller.signup)
  .openapi(logoutRoute, controller.logout)

// Protected routes (require authentication)
const protectedRouter = createRouter()
  .use('*', (c, next) => {
    // Skip auth for OPTIONS requests
    if (c.req.method === 'OPTIONS') return next()
    return authMiddleware(c, next)
  })
  .openapi(sessionRoute, controller.session)

// Combine routers
const router = createRouter()
  .route('/', publicRouter)
  .route('/', protectedRouter)

export default router
