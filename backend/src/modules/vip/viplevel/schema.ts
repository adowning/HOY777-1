import { z } from 'zod';

// Base schema for VipLevel (matches Prisma model structure)
export const VipLevelSchema = z.object({
  level: z.number(),
  xpForNext: z.number()
});

// Schema for creating a VipLevel
// Based on the base schema, omitting generated fields.
export const createVipLevelSchema = VipLevelSchema;

// Schema for updating a VipLevel
// Based on the base schema, making all fields optional and omitting generated fields.
export const updateVipLevelSchema = VipLevelSchema.partial().omit({ "level": true });