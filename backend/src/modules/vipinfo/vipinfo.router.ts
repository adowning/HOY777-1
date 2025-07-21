import { createRoute, z } from '@hono/zod-openapi'
import * as controller from './vipinfo.controller'
import { selectVipLevelsSchema } from '../../db'
import { createRouter } from '../../lib/create-app'

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

const router = createRouter()
  .openapi(vipInfo, controller.getVipInfo)
  .openapi(vipLevels, controller.getVipLevels)
  .openapi(vipTasks, controller.getVipTasks)
  .openapi(vipLevelAward, controller.claimVipLevelAward)
  .openapi(vipRebateAward, controller.claimVipRebateAward)
  .openapi(vipRebateHistory, controller.getVipRebateHistory)
  .openapi(vipLevelAwardHistory, controller.getVipLevelAwardHistory)
  .openapi(vipTimesHistory, controller.getVipTimesHistory)
  .openapi(vipSigninRewards, controller.claimVipSigninRewards)
  .openapi(vipSigninList, controller.getVipSigninList)
  .openapi(vipSigninReceive, controller.receiveVipSigninAward)
  .openapi(vipLevelUpList, controller.getVipLevelUpList)
  .openapi(vipLevelUpReceive, controller.receiveVipLevelUpAward)
  .openapi(vipCycleAwardList, controller.getVipCycleAwardList)
  .openapi(vipCycleAwardReceive, controller.receiveVipCycleAward)
  .openapi(vipLevelAwardList, controller.getVipLevelAwardList)
  .openapi(vipLevelAwardReceive, controller.receiveVipLevelAward)
  .openapi(vipBetAwardList, controller.getVipBetAwardList)
  .openapi(vipBetAwardReceive, controller.receiveVipBetAward)

export default router
