import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import * as controller from './activity.controller'

const tags = ['Activity']

const listActivities = createRoute({
  method: 'get',
  path: '/list',
  tags,
  responses: { 200: { description: 'Activity list' } },
})

const activityRouter = new OpenAPIHono()

activityRouter.openapi(listActivities, controller.listActivities)

export default activityRouter
