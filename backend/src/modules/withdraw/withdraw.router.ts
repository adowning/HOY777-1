import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import * as controller from './withdraw.controller'
import { insertWithdrawalsSchema } from '../../db'

const tags = ['Withdraw']

const getWithdrawalConfig = createRoute({
  method: 'get',
  path: '/withdrawalcfg',
  tags,
  responses: {
    200: {
      description: 'Withdrawal configuration',
    },
  },
})

const submitWithdrawal = createRoute({
  method: 'post',
  path: '/withdrawalsubmit',
  tags,
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertWithdrawalsSchema.omit({ userId: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Withdrawal submission response',
    },
  },
})

const getWithdrawalHistory = createRoute({
  method: 'get',
  path: '/withdrawalhistory',
  tags,
  responses: {
    200: {
      description: 'Withdrawal history',
    },
  },
})

const refundWithdrawal = createRoute({
  method: 'post',
  path: '/withdrawalrefund',
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
  responses: {
    200: {
      description: 'Withdrawal refund response',
    },
  },
})

const withdrawRouter = new OpenAPIHono()

withdrawRouter.openapi(getWithdrawalConfig, controller.getWithdrawalConfig)
withdrawRouter.openapi(submitWithdrawal, controller.submitWithdrawal)
withdrawRouter.openapi(getWithdrawalHistory, controller.getWithdrawalHistory)
withdrawRouter.openapi(refundWithdrawal, controller.refundWithdrawal)

export default withdrawRouter
