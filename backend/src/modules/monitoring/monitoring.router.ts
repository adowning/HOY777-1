import { createRouter } from '../../lib/create-app'
import * as controller from './monitoring.controller'
import { createRoute } from '@hono/zod-openapi'
import { authMiddleware } from '../../middlewares/auth.middleware'
import { sessionMiddleware } from '../../middlewares/session.middleware'

const tags = ['Monitoring']

const monitoringPageRoute = createRoute({
  method: 'get',
  path: '/monitoring',
  tags,
  middleware: [authMiddleware, sessionMiddleware],
  responses: { 200: { description: 'Live server monitoring page' } },
})

const monitoringEventsRoute = createRoute({
  method: 'get',
  path: '/monitoring/events',
  tags,
  middleware: [authMiddleware], // Protect the event stream
  responses: { 200: { description: 'SSE stream for active users' } },
})

const router = createRouter()
  .openapi(monitoringPageRoute, controller.showMonitoringPage)
  .openapi(monitoringEventsRoute, controller.streamMonitoringEvents)

export default router