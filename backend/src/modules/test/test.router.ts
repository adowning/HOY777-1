import { createRouter } from '../../lib/create-app'
import * as controller from './test.controller'
import { createRoute, z } from '@hono/zod-openapi'

const tags = ['Test']

const testIndexRoute = createRoute({
  method: 'get',
  path: '/test',
  tags,
  responses: { 200: { description: 'Auth test page' } },
})

const testSignupRoute = createRoute({
  method: 'post',
  path: '/test/signup',
  tags,
  responses: { 200: { description: 'Test signup endpoint' } },
})

// New route for the login page UI
const testLoginPage = createRoute({
  method: 'get',
  path: '/test/login',
  tags,
  responses: { 200: { description: 'Test login page' } },
})

// New route to handle login submission
const testLoginRoute = createRoute({
  method: 'post',
  path: '/test/login',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            username: z.string(),
            password: z.string(),
          })
        }
      }
    }
  },
  responses: { 200: { description: 'Test login endpoint' } },
})

const router = createRouter()
  .openapi(testIndexRoute, controller.showTestPage)
  .openapi(testSignupRoute, controller.testSignup)
  .openapi(testLoginPage, controller.showLoginPage) // Add new route
  .openapi(testLoginRoute, controller.handleTestLogin) // Add new route

export default router