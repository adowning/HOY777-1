import { createRoute } from '@hono/zod-openapi'
import * as controller from './achievement.controller'
import { createRouter } from '../../lib/create-app'

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

const router = createRouter()
  .openapi(getAchievementList, controller.getAchievementList)
  .openapi(claimStageAward, controller.claimStageAward)
  .openapi(claimAchievementAward, controller.claimAchievementAward)
  .openapi(getAchievementConfig, controller.getAchievementConfig)

export default router
