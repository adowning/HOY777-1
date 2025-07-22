import type { Context } from 'hono';
import * as service from './redtiger.service';
import { z } from 'zod';
import { RTGSpinRequestDtoSchema, RTGSettingsRequestDtoSchema } from '../gameplay.schema';

export const createRedtiger = async (c: Context) => {
    const url = c.req.url;
    if (url.endsWith('/settings')) {
        return createRedtigerSettings(c);
    }
    if (url.endsWith('/spin')) {
        return createRedtigerSpin(c);
    }
    return c.json({ error: 'Not found' }, 404);
};

export const createRedtigerSettings = async (c: Context) => {
    try {
        const data: z.infer<typeof RTGSettingsRequestDtoSchema> = await c.req.json();
        const { gameName, gameSessionId } = c.req.param();
        data.gameName = gameName;
        data.gameSessionId = gameSessionId;
        const item = await service.createRedtigerSettings(c, data);
        return c.json(item, 200);
    } catch (error: unknown) {
        const message = `Error creating Redtiger settings: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(message, error);
        return c.json({ error: `Failed to create Redtiger settings` }, 500);
    }
};

export const createRedtigerSpin = async (c: Context) => {
    try {
        const data: z.infer<typeof RTGSpinRequestDtoSchema> = await c.req.json();
        const { gameName, gameSessionId } = c.req.param();
        data.gameName = gameName;
        data.gameSessionId = gameSessionId;
        const item = await service.createRedtigerSpin(c, data);
        return c.json(item, 200);
    } catch (error: unknown) {
        const message = `Error creating Redtiger spin: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(message, error);
        return c.json({ error: `Failed to create Redtiger spin` }, 500);
    }
};
