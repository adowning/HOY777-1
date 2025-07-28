import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

import { createRouter } from '#/lib/create-app'

import {
    insertUserSchema as insertPlayerSchema,
    selectUserSchema as selectPlayerSchema,
} from '../../db/schema'
import { notFoundSchema } from '../../lib/constants'
import * as controller from './players.controller'

export const tags = ['Players']

export const listPlayer = createRoute({
    path: '/players',
    method: 'get',
    tags,
    request: {
        query: z.object({
            page: z.string().optional().default('1'),
            limit: z.string().optional().default('10'),
            sortBy: z.string().optional().default('createdAt'),
            sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
        }),
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.array(selectPlayerSchema),
            'The list of players',
        ),
    },
})

export const createPlayer = createRoute({
    path: '/players',
    method: 'post',
    request: {
        body: jsonContentRequired(insertPlayerSchema, 'The player to create'),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectPlayerSchema, 'The created player'),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(insertPlayerSchema),
            'The validation error(s)',
        ),
    },
})

export const getOnePlayer = createRoute({
    path: '/players/{id}',
    method: 'get',
    request: {
        params: IdParamsSchema,
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectPlayerSchema, 'The requested player'),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Player not found'),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(IdParamsSchema),
            'Invalid id error',
        ),
    },
})

export const updatePlayer = createRoute({
    path: '/players/{id}',
    method: 'patch',
    request: {
        params: IdParamsSchema,
        body: jsonContentRequired(selectPlayerSchema, 'The player updates'),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectPlayerSchema, 'The updated player'),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Player not found'),
    // [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
    //   createErrorSchema(Player).or(createErrorSchema(IdParamsSchema)),
    //   "The validation error(s)",
    // ),
    },
})

export const removePlayer = createRoute({
    path: '/players/{id}',
    method: 'delete',
    request: {
        params: IdParamsSchema,
    },
    tags,
    responses: {
        [HttpStatusCodes.NO_CONTENT]: {
            description: 'Player deleted',
        },
        [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Player not found'),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(IdParamsSchema),
            'Invalid id error',
        ),
    },
})

export const checkPlayer = createRoute({
    method: 'get',
    path: '/players/{id}/check',
    tags,
    summary: 'Check if a player exists',
    request: { params: IdParamsSchema },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({ playerCheck: z.boolean() }),
            'Player status',
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Player not found'),
    },
})

// export const getBalance = createRoute({
//   method: "get",
//   path: "/players/{id}/balance",
//   tags,
//   summary: "Get player's balance",
//   request: { params: IdParamsSchema },
//   responses: {
//     [HttpStatusCodes.OK]: jsonContent(
//       z.array(selectBalancesSchema),
//       "Player balance",
//     ),
//   },
// });

// export const setCurrency = createRoute({
//   method: "post",
//   path: "/players/{id}/currency",
//   tags,
//   summary: "Set player's currency",
//   request: {
//     params: IdParamsSchema,
//     body: jsonContentRequired(
//       z.object({ currency: z.string() }),
//       "The currency to set",
//     ),
//   },
//   responses: {
//     [HttpStatusCodes.OK]: jsonContent(selectCurrenciesSchema, "Currency set"),
//     [HttpStatusCodes.BAD_REQUEST]: jsonContent(
//       createErrorSchema(z.object({ currency: z.string() })),
//       "Invalid currency",
//     ),
//   },
// });

export const verifyEmail = createRoute({
    method: 'post',
    path: '/players/{id}/verify-email',
    tags,
    summary: 'Send email verification',
    request: { params: IdParamsSchema },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({ status: z.string(), time: z.number() }),
            'Verification sent',
        ),
    },
})

export const getInfo = createRoute({
    method: 'get',
    path: '/players/{id}/info',
    tags,
    summary: 'Get player info',
    request: { params: IdParamsSchema },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectPlayerSchema, 'Player info'),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Player not found'),
    },
})

export const getVipInfo = createRoute({
    method: 'get',
    path: '/players/{id}/vipinfo',
    tags,
    summary: 'Get player VIP info',
    request: { params: IdParamsSchema },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({ vipLevel: z.number().nullable() }),
            'VIP info',
        ),
    },
})

// New routes
export const getPlayerAmount = createRoute({
    path: '/player/amount',
    method: 'get',
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({
                amount: z.number(),
                currency: z.object({
                    fiat: z.boolean(),
                    name: z.string(),
                    symbol: z.string(),
                    type: z.string(),
                }),
                withdraw: z.number(),
                rate: z.number(),
            }),
            'Get player amount',
        ),
    },
})

export const updatePlayerInfo = createRoute({
    path: '/player/change',
    method: 'post',
    request: {
        body: jsonContentRequired(insertPlayerSchema, 'The player info to update'),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectPlayerSchema, 'The updated player'),
    },
})

export const updateEmail = createRoute({
    path: '/player/email',
    method: 'post',
    request: {
        body: jsonContentRequired(
            z.object({
                email: z.string().email(),
                password: z.string(),
            }),
            'The email to update',
        ),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectPlayerSchema, 'The updated player'),
    },
})

export const updatePassword = createRoute({
    path: '/player/password',
    method: 'post',
    request: {
        body: jsonContentRequired(
            z.object({
                now_password: z.string(),
                new_password: z.string(),
            }),
            'The password to update',
        ),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({ message: z.string() }),
            'Password updated',
        ),
    },
})

export const suspendPlayer = createRoute({
    path: '/player/suspend',
    method: 'post',
    request: {
        body: jsonContentRequired(
            z.object({
                time: z.number(),
            }),
            'The suspension time',
        ),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({ message: z.string() }),
            'Player suspended',
        ),
    },
})

// export const getBalanceList = createRoute({
//   path: "/player/balance/list",
//   method: "get",
//   tags,
//   responses: {
//     [HttpStatusCodes.OK]: jsonContent(
//       z.array(selectBalancesSchema),
//       "The list of balances",
//     ),
//   },
// });

export const enterGame = createRoute({
    method: 'post',
    path: '/enter/game',
    tags,
    responses: { 200: { description: 'Enter game' } },
})

export const playerGame = createRoute({
    method: 'post',
    path: '/games',
    tags,
    responses: { 200: { description: 'Player game' } },
})

export const favoriteGame = createRoute({
    method: 'post',
    path: '/setup/game',
    tags,
    responses: { 200: { description: 'Favorite game' } },
})

export const gameHistory = createRoute({
    method: 'get',
    path: '/gamehistory',
    tags,
    responses: { 200: { description: 'Game history' } },
})

export const spinPage = createRoute({
    method: 'get',
    path: '/spinpage',
    tags,
    responses: { 200: { description: 'Spin page' } },
})

export const spin = createRoute({
    method: 'post',
    path: '/spin',
    tags,
    responses: { 200: { description: 'Spin' } },
})

export const favoriteGameList = createRoute({
    method: 'get',
    path: '/favorite/game',
    tags,
    responses: { 200: { description: 'Favorite game list' } },
})

export const endGameSession = createRoute({
    method: 'post',
    path: '/end-game-session',
    tags,
    summary: 'End the current game session',
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({ success: z.boolean(), message: z.string() }),
            'Session ended response',
        ),
        [HttpStatusCodes.UNAUTHORIZED]: { description: 'Unauthorized' },
    },
})

export const router = createRouter()
// .openapi(createPlayer, controller.createPlayer)
    .openapi(listPlayer, controller.listPlayer as any)
    .openapi(enterGame, controller.enterGame)
    .openapi(playerGame, controller.playerGame)
    .openapi(favoriteGame, controller.favoriteGame)
// .openapi(gameHistory, controller.gameHistory)
    .openapi(spinPage, controller.spinPage)
    .openapi(spin, controller.spin)
    .openapi(favoriteGameList, controller.favoriteGameList)
    .openapi(endGameSession, controller.endSession as any)

// Basic CRUD
    .openapi(getOnePlayer, controller.getPlayerById as any)
    .openapi(updatePlayer, controller.updatePlayer as any)
    .openapi(removePlayer, controller.deletePlayer as any)

// From Pinia Store & HAR files
    .openapi(checkPlayer, controller.checkPlayer as any)
// .openapi(getBalance, controller.getBalance)
// .openapi(setCurrency, controller.setCurrency)
    .openapi(verifyEmail, controller.verifyEmail)
    .openapi(getInfo, controller.getInfo as any)
    .openapi(getVipInfo, controller.getVipInfo as any)

// New Routes
    .openapi(getPlayerAmount, controller.getPlayerAmount)
    .openapi(updatePlayerInfo, controller.updatePlayerInfo as any)
    .openapi(updateEmail, controller.updateEmail as any)
    .openapi(updatePassword, controller.updatePassword)
    .openapi(suspendPlayer, controller.suspendPlayer)
// .openapi(getBalanceList, controller.getBalanceList);

export default router
