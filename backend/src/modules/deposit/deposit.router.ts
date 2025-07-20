import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import * as controller from './deposit.controller'
import { insertDepositsSchema } from '../../db'

const tags = ['Deposit']

const getDepositConfig = createRoute({
  method: 'get',
  path: '/depositcfg',
  tags,
  responses: {
    200: {
      description: 'Deposit configuration',
    },
  },
})

const submitDeposit = createRoute({
  method: 'post',
  path: '/depositsubmit',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertDepositsSchema.omit({ userId: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Deposit submission response',
    },
  },
})

const getDepositHistory = createRoute({
  method: 'get',
  path: '/deposithistory',
  tags,
  responses: {
    200: {
      description: 'Deposit history',
    },
  },
})

const depositRouter = new OpenAPIHono()

depositRouter.openapi(getDepositConfig, controller.getDepositConfig)
depositRouter.openapi(submitDeposit, controller.submitDeposit)
depositRouter.openapi(getDepositHistory, controller.getDepositHistory)

export default depositRouter
