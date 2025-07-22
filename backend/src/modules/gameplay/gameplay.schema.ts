import { z } from 'zod';
import { jackpotTypeEnum } from '#/db/schema';

// Jackpot Schemas
export const createJackpotSchema = z.object({
    type: z.enum(jackpotTypeEnum.enumValues),
    currentAmountCoins: z.number().int().default(0),
    seedAmountCoins: z.number().int().default(0),
    minimumBetCoins: z.number().int().default(1),
    contributionRateBasisPoints: z.number().int().default(0),
    probabilityPerMillion: z.number().int().default(0),
    minimumTimeBetweenWinsMinutes: z.number().int().default(0),
    isActive: z.boolean().default(true),
});

export const updateJackpotSchema = createJackpotSchema.partial();

// Redtiger Schemas
export const RedtigerSchema = z.object({
    id: z.string(),
    name: z.string(),
    redtigerSecret: z.string(),
    redtigerAccess: z.string(),
    callbackUrl: z.string(),
    active: z.boolean(),
    ips: z.array(z.string()),
    description: z.string().optional().nullable(),
    lastUsedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    ownerId: z.string().optional().nullable(),
});

export const RTGSettingsResponseDtoSchema = z.object({
    result: z.object({
        user: z.object({}),
        game: z.any(),
        jackpots: z.any().nullable()
    }),
    success: z.boolean(),
});

export const RTGSpinResponseDtoSchema = z.object({
    success: z.boolean(),
    result: z.any().optional(),
    error: z.any().optional(),
});

export const RTGSettingsRequestDtoSchema = z.object({
    gameName: z.string().optional(),
    gameSessionId: z.string().optional(),
    gameId: z.string(),
    token: z.string(),
    userId: z.string(),
    currency: z.string(),
    language: z.string(),
    playMode: z.enum(['real', 'demo', 'test']),
    custom: z.any().optional(),
    userData: z.any().optional(),
});

export const RTGSpinRequestDtoSchema = z.object({
    gameSessionId: z.string().optional(),
    gameName: z.string().optional(),
    token: z.string(),
    userId: z.string(),
    gameId: z.string(),
    stake: z.union([z.number(), z.string()]),
    currency: z.string(),
    sessionId: z.string(),
    playMode: z.enum(['real', 'demo', 'test']).optional(),
    actions: z.array(z.any()).optional(),
    custom: z.any().optional(),
    bonusId: z.any().optional(),
    extras: z.any().optional(),
    siteId: z.string().optional(),
    userType: z.string().optional(),
    lang: z.union([z.string(), z.number()]).optional(),
    fingerprint: z.union([z.string(), z.number()]).optional(),
    channel: z.union([z.string(), z.number()]).optional(),
    affiliate: z.union([z.string(), z.number()]).optional(),
    userData: z.any().optional(),
    roundId: z.union([z.string(), z.number()]).optional(),
    transactionId: z.union([z.string(), z.number()]).optional(),
});
