import { z } from 'zod';

// Base schema for Redtiger (matches Prisma model structure)
export const RedtigerSettingsRequest= z.object({
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
  acceptedPayments: z.any()//z.array(z.nativeEnum(PaymentMethod))
});
export type RedtigerSettingsRequestType = z.infer<typeof RedtigerSettingsRequest>;

export const RedtigerSettignsResultDTOSchema = z.object({
  result: z.object({
     user: z.object({
     }),
     game: z.any(),
     jackpots: z.any().nullable()
  }),
  success: z.boolean(),
  
});
// Schema for creating a Redtiger
// Based on the base schema, omitting generated fields.
// export const createRedtigerSchema = RedtigerSettingsRequest.omit({ "active": true, "createdAt": true });

// // Schema for updating a Redtiger
// // Based on the base schema, making all fields optional and omitting generated fields.
// export const updateRedtigerSchema = RedtigerSettingsRequest.partial().omit({ "id": true });
// export const updateRedtigerSchema = RedtigerSettignsResultDTOSchema.partial().omit({ "id": true });



// Zod schema for RTGSpinDto validation
export const RTGSpinDtoSchema = z.object({
  // gameId is expected to be a string.
  gameId: z.string(),

  // custom is a nested object with specific string properties.
  custom: z.object({
    siteId: z.string(),
    extras: z.string(),
  }),

  // bonusId can be of any type.
  bonusId: z.any(),

  // extras can be of any type.
  extras: z.any(),

  // siteId is expected to be a string.
  siteId: z.string(),

  // userType is expected to be a string.
  userType: z.string(),

  // lang, fingerprint, channel, and affiliate were numbers, so using z.number().
  // If they could also be strings, z.union([z.number(), z.string()]) would be appropriate.
  lang: z.number(),
  fingerprint: z.number(),
  channel: z.number(),
  affiliate: z.number(),

  // userData is a nested object with specific properties and types.
  userData: z.object({
    userId: z.number(),
    affiliate: z.string(),
    lang: z.string(),
    channel: z.string(),
    userType: z.string(),
  }),

  // token is expected to be a string.
  token: z.string(),

  // stake is expected to be a number.
  stake: z.number(),

  // sessionId is expected to be a string.
  sessionId: z.string(),

  // playMode is expected to be a string.
  playMode: z.string(),
});

// Infer the TypeScript type directly from the Zod schema.
// This ensures that your type definition and validation schema are always aligned.
export type RTGSpinDto = z.infer<typeof RTGSpinDtoSchema>;



const BalanceDetailSchema = z.object({
  atStart: z.string(),
  afterBet: z.string(),
  atEnd: z.string(),
});

// Zod schema for the UserData interface
const UserDataSchema = z.object({
  balance: z.object({
    cash: BalanceDetailSchema,
    freeBets: BalanceDetailSchema,
    bonus: BalanceDetailSchema,
    sessionCash: BalanceDetailSchema,
    sessionFreeBets: BalanceDetailSchema,
  }),
  canGamble: z.boolean(),
  userId: z.number(),
  sessionId: z.string(),
  sessionNetPosition: z.string(),
  token: z.string(),
  bonuses: z.array(z.any()),
  tournaments: z.array(z.any()),
  vouchers: z.array(z.any()),
  messages: z.array(z.any()),
  limits: z.object({
    betThresholdTime: z.number(),
  }),
  serverTime: z.string(),
});

// Zod schema for the GameData interface
const GameDataSchema = z.object({
  win: z.object({
    lines: z.string(),
    total: z.string(),
  }),
  winsMultipliers: z.object({
    lines: z.string(),
    total: z.string(),
  }),
  stake: z.string(),
  multiplier: z.number(),
  winLines: z.array(z.any()),
  spinMode: z.string(),
  fatTiles: z.array(z.any()),
  scatters: z.array(z.any()),
  reelsBuffer: z.array(z.array(z.array(z.any()))), // Assuming a 3D array
  features: z.array(z.any()),
  hasState: z.boolean(),
});

// Zod schema for the main RTGSpinResult class
export const RTGSpinResultSchema = z.object({
  success: z.boolean(),
  result: z.object({
    user: UserDataSchema,
    game: GameDataSchema,
  }),
});

// Infer TypeScript types from the Zod schemas
export type UserData = z.infer<typeof UserDataSchema>;
export type GameData = z.infer<typeof GameDataSchema>;
export type RTGSpinResult = z.infer<typeof RTGSpinResultSchema>;


// export const RedtigerSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   redtigerSecret: z.string(),
//   redtigerAccess: z.string(),
//   callbackUrl: z.string(),
//   active: z.boolean(),
//   ips: z.array(z.string()),
//   description: z.string().optional().nullable(),
//   lastUsedAt: z.coerce.date().optional().nullable(),
//   createdAt: z.coerce.date(),
//   updatedAt: z.coerce.date(),
//   ownerId: z.string().optional().nullable(),
//   acceptedPayments: z.array(z.nativeEnum(PaymentMethod))
// });

// Schema for creating a Redtiger
// Based on the base schema, omitting generated fields.
// export const createRedtigerSchema = RedtigerSchema.omit({ "active": true, "createdAt": true });

// Schema for updating a Redtiger
// Based on the base schema, making all fields optional and omitting generated fields.
// export const updateRedtigerSchema = RedtigerSettignsResultDTOSchema.partial().omit({ "id": true });


// export type Redtiger = z.infer<typeof RedtigerSchema>;

// Infer the TypeScript type for the create input
// export type CreateRedtigerInput = z.infer<typeof createRedtigerSchema>;
// 
// Infer the TypeScript type for the update input
// export type UpdateRedtigerInput = z.infer<typeof updateRedtigerSchema>;

export type RedtigerSettignsResultDTOType = z.infer<typeof RedtigerSettignsResultDTOSchema>;