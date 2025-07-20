import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import * as controller from './achievement.controller'

const tags = ['Achievement']

const getAchievementList = createRoute({
  method: 'get',
  path: '/invite/achievement/list',
  tags,
  responses: { 200: { description: 'Achievement list' } },
})

const claimStageAward = createRoute({
  method: 'post',
  path: '/invite/stage/achievement/award',
  tags,
  responses: { 200: { description: 'Claim stage award' } },
})

const claimAchievementAward = createRoute({
  method: 'post',
  path: '/invite/achievement/award',
  tags,
  responses: { 200: { description: 'Claim achievement award' } },
})

const getAchievementConfig = createRoute({
  method: 'get',
  path: '/invite/achievement/config',
  tags,
  responses: { 200: { description: 'Achievement config' } },
})

const achievementRouter = new OpenAPIHono()

achievementRouter.openapi(getAchievementList, controller.getAchievementList)
achievementRouter.openapi(claimStageAward, controller.claimStageAward)
achievementRouter.openapi(
  claimAchievementAward,
  controller.claimAchievementAward
)
achievementRouter.openapi(getAchievementConfig, controller.getAchievementConfig)

export default achievementRouter
