import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import * as controller from './vipinfo.controller'
import { selectVipLevelsSchema } from '../../db/schemelibsql'

const tags = ['VIP']

const vipInfo = createRoute({
  method: 'get',
  path: '/vipinfo',
  tags,
  responses: { 200: { description: 'VIP info' } },
})

const vipLevels = createRoute({
  method: 'get',
  path: '/viplevels',
  tags,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(selectVipLevelsSchema),
        },
      },
    },
  },
})

const vipTasks = createRoute({
  method: 'get',
  path: '/viptasks',
  tags,
  responses: { 200: { description: 'VIP tasks' } },
})

const vipLevelAward = createRoute({
  method: 'post',
  path: '/viplevel/award',
  tags,
  responses: { 200: { description: 'VIP level award' } },
})

const vipRebateAward = createRoute({
  method: 'post',
  path: '/viprebate/award',
  tags,
  responses: { 200: { description: 'VIP rebate award' } },
})

const vipRebateHistory = createRoute({
  method: 'get',
  path: '/viprebatehistory',
  tags,
  responses: { 200: { description: 'VIP rebate history' } },
})

const vipLevelAwardHistory = createRoute({
  method: 'get',
  path: '/viplevelawardhistory',
  tags,
  responses: { 200: { description: 'VIP level award history' } },
})

const vipTimesHistory = createRoute({
  method: 'get',
  path: '/viptimeshistory',
  tags,
  responses: { 200: { description: 'VIP times history' } },
})

const vipSigninRewards = createRoute({
  method: 'post',
  path: '/vipsignin/award',
  tags,
  responses: { 200: { description: 'VIP sign-in rewards' } },
})

const vipSigninList = createRoute({
  method: 'get',
  path: '/vip/signinaward/list',
  tags,
  responses: { 200: { description: 'VIP sign-in award list' } },
})

const vipSigninReceive = createRoute({
  method: 'post',
  path: '/vip/signinaward/receive',
  tags,
  responses: { 200: { description: 'Receive VIP sign-in award' } },
})

const vipLevelUpList = createRoute({
  method: 'get',
  path: '/viplevelup/list',
  tags,
  responses: { 200: { description: 'VIP level up list' } },
})

const vipLevelUpReceive = createRoute({
  method: 'post',
  path: '/viplevelup/receive',
  tags,
  responses: { 200: { description: 'Receive VIP level up award' } },
})

const vipCycleAwardList = createRoute({
  method: 'get',
  path: '/vip/cycleaward/list',
  tags,
  responses: { 200: { description: 'VIP cycle award list' } },
})

const vipCycleAwardReceive = createRoute({
  method: 'post',
  path: '/vip/cycleaward/receive',
  tags,
  responses: { 200: { description: 'Receive VIP cycle award' } },
})

const vipLevelAwardList = createRoute({
  method: 'get',
  path: '/vip/levelaward/list',
  tags,
  responses: { 200: { description: 'VIP level award list' } },
})

const vipLevelAwardReceive = createRoute({
  method: 'post',
  path: '/vip/levelaward/receive',
  tags,
  responses: { 200: { description: 'Receive VIP level award' } },
})

const vipBetAwardList = createRoute({
  method: 'get',
  path: '/vip/betaward/list',
  tags,
  responses: { 200: { description: 'VIP bet award list' } },
})

const vipBetAwardReceive = createRoute({
  method: 'post',
  path: '/vip/betaward/receive',
  tags,
  responses: { 200: { description: 'Receive VIP bet award' } },
})

const vipInfoRouter = new OpenAPIHono()

vipInfoRouter.openapi(vipInfo, controller.getVipInfo)
vipInfoRouter.openapi(vipLevels, controller.getVipLevels)
vipInfoRouter.openapi(vipTasks, controller.getVipTasks)
vipInfoRouter.openapi(vipLevelAward, controller.claimVipLevelAward)
vipInfoRouter.openapi(vipRebateAward, controller.claimVipRebateAward)
vipInfoRouter.openapi(vipRebateHistory, controller.getVipRebateHistory)
vipInfoRouter.openapi(vipLevelAwardHistory, controller.getVipLevelAwardHistory)
vipInfoRouter.openapi(vipTimesHistory, controller.getVipTimesHistory)
vipInfoRouter.openapi(vipSigninRewards, controller.claimVipSigninRewards)
vipInfoRouter.openapi(vipSigninList, controller.getVipSigninList)
vipInfoRouter.openapi(vipSigninReceive, controller.receiveVipSigninAward)
vipInfoRouter.openapi(vipLevelUpList, controller.getVipLevelUpList)
vipInfoRouter.openapi(vipLevelUpReceive, controller.receiveVipLevelUpAward)
vipInfoRouter.openapi(vipCycleAwardList, controller.getVipCycleAwardList)
vipInfoRouter.openapi(vipCycleAwardReceive, controller.receiveVipCycleAward)
vipInfoRouter.openapi(vipLevelAwardList, controller.getVipLevelAwardList)
vipInfoRouter.openapi(vipLevelAwardReceive, controller.receiveVipLevelAward)
vipInfoRouter.openapi(vipBetAwardList, controller.getVipBetAwardList)
vipInfoRouter.openapi(vipBetAwardReceive, controller.receiveVipBetAward)

export default vipInfoRouter
