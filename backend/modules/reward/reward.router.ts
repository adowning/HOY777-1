import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import * as controller from './reward.controller'

const tags = ['Reward']

const getRewardCenterList = createRoute({
  method: 'get',
  path: '/center/list',
  tags,
  responses: { 200: { description: 'Reward center list' } },
})

const receiveAchievementBonus = createRoute({
  method: 'post',
  path: '/center/invite/receive',
  tags,
  responses: { 200: { description: 'Receive achievement bonus' } },
})

const rewardRouter = new OpenAPIHono()

rewardRouter.openapi(getRewardCenterList, controller.getRewardCenterList)
rewardRouter.openapi(
  receiveAchievementBonus,
  controller.receiveAchievementBonus
)

export default rewardRouter
