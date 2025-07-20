import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import * as controller from './currency.controller'

const tags = ['Currency']

const getBalanceList = createRoute({
  method: 'get',
  path: '/balance/list',
  tags,
  responses: { 200: { description: 'Balance list' } },
})

const currencyRouter = new OpenAPIHono()

currencyRouter.openapi(getBalanceList, controller.getBalanceList)

export default currencyRouter
