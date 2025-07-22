import { z } from 'zod';
import {
  VipLevelSchema,
  createVipLevelSchema,
  updateVipLevelSchema,
} from './schema';

// Infer the TypeScript type for the base model
export type VipLevel = z.infer<typeof VipLevelSchema>;

// Infer the TypeScript type for the create input
export type CreateVipLevelInput = z.infer<typeof createVipLevelSchema>;

// Infer the TypeScript type for the update input
export type UpdateVipLevelInput = z.infer<typeof updateVipLevelSchema>;
