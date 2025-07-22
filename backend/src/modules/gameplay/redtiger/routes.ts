import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import * as controller from './redtiger.controller';
import { authMiddleware } from '#/middlewares/auth.middleware';
import { RTGSettingsResponseDtoSchema, RTGSpinResponseDtoSchema } from '../gameplay.schema';

const tags = ['RedTiger'];

const ErrorSchema = z.object({
    error: z.string(),
});

const redtigerParamsSchema = z.object({
    gameSessionId: z.string(),
    gameName: z.string(),
});

const settingsRoute = createRoute({
    method: 'post',
    path: '/{gameSessionId}/{gameName}/game/settings',
    tags,
    summary: 'Get redtiger settings for a game',
    request: {
        params: redtigerParamsSchema,
        body: {
            content: {
                'application/json': {
                    schema: z.any(),
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Redtiger game settings',
            content: {
                'application/json': {
                    schema: RTGSettingsResponseDtoSchema,
                },
            },
        },
        500: {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: ErrorSchema,
                },
            },
        },
    },
});

const spinRoute = createRoute({
    method: 'post',
    path: '/{gameSessionId}/{gameName}/game/spin',
    tags,
    summary: 'Perform a spin in a redtiger game',
    request: {
        params: redtigerParamsSchema,
        body: {
            content: {
                'application/json': {
                    schema: z.any(),
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Redtiger spin result',
            content: {
                'application/json': {
                    schema: RTGSpinResponseDtoSchema,
                },
            },
        },
        500: {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: ErrorSchema,
                },
            },
        },
    },
});

const app = new OpenAPIHono();

app.use('*', authMiddleware);

app.openapi(settingsRoute, controller.createRedtigerSettings);
app.openapi(spinRoute, controller.createRedtigerSpin);

export default app;
