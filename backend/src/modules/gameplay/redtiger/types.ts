import { z } from 'zod';
import {
    RedtigerSchema,
    RTGSettingsResponseDtoSchema as RedtigerSettignsResultDTOSchema,
    RTGSpinResponseDtoSchema,
    RTGSettingsRequestDtoSchema,
    RTGSpinRequestDtoSchema
} from '../gameplay.schema';

// Infer the TypeScript type for the base model
export type Redtiger = z.infer<typeof RedtigerSchema>;

export type RTGSettingsResponseDto = z.infer<typeof RedtigerSettignsResultDTOSchema>;
export type RTGSpinResponseDto = z.infer<typeof RTGSpinResponseDtoSchema>;
export type RTGSettingsRequestDto = z.infer<typeof RTGSettingsRequestDtoSchema>;
export type RTGSpinRequestDto = z.infer<typeof RTGSpinRequestDtoSchema>;
