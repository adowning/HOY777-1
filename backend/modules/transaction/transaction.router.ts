import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import * as controller from './transaction.controller'

const tags = ['Transaction']

const getTransactionHistory = createRoute({
  method: 'get',
  path: '/transactionshistory',
  tags,
  responses: { 200: { description: 'Transaction history' } },
})

const transactionRouter = new OpenAPIHono()

transactionRouter.openapi(
  getTransactionHistory,
  controller.getTransactionHistory
)

export default transactionRouter
