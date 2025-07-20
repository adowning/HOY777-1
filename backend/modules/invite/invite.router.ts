import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import * as controller from './invite.controller'

const tags = ['Invite']

const getInviteInfo = createRoute({
  method: 'get',
  path: '/invite',
  tags,
  responses: { 200: { description: 'Invite info' } },
})

const claimInviteAward = createRoute({
  method: 'post',
  path: '/invite/award',
  tags,
  responses: { 200: { description: 'Claim invite award' } },
})

const getInviteSelfInfo = createRoute({
  method: 'get',
  path: '/invite/self',
  tags,
  responses: { 200: { description: 'Invite self info' } },
})

const getInviteHistoryConfig = createRoute({
  method: 'get',
  path: '/invite/historycfg',
  tags,
  responses: { 200: { description: 'Invite history config' } },
})

const getInviteHistory = createRoute({
  method: 'get',
  path: '/invite/history',
  tags,
  responses: { 200: { description: 'Invite history' } },
})

const getStatisticsList = createRoute({
  method: 'get',
  path: '/invite/statistics/list',
  tags,
  responses: { 200: { description: 'Statistics list' } },
})

const inviteRouter = new OpenAPIHono()

inviteRouter.openapi(getInviteInfo, controller.getInviteInfo)
inviteRouter.openapi(claimInviteAward, controller.claimInviteAward)
inviteRouter.openapi(getInviteSelfInfo, controller.getInviteSelfInfo)
inviteRouter.openapi(getInviteHistoryConfig, controller.getInviteHistoryConfig)
inviteRouter.openapi(getInviteHistory, controller.getInviteHistory)
inviteRouter.openapi(getStatisticsList, controller.getStatisticsList)

export default inviteRouter
