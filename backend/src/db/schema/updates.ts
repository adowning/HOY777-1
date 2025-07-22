import { z } from 'zod';

// Enum to differentiate update types
export const UpdateTypeSchema = z.enum(['BINARY', 'OTA']);

// Expanded schema for an application version
export const AppVersionSchema = z.object({
  version: z.string(),
  platform: z.string(),
  updateType: UpdateTypeSchema,
  downloadUrl: z.string().url(),
  changelog: z.array(z.string()),
  mandatory: z.boolean(),
  releaseDate: z.string().datetime(),
  fileSize: z.number(),
  checksum: z.string(),
});

// Metadata structure remains the same
export const UpdateMetadataSchema = z.record(
  z.string(), // appId
  z.record(
    z.string(), // platform
    z.array(AppVersionSchema)
  )
);

// Schema for the check-update request body now includes updateType
export const CheckUpdateRequestSchema = z.object({
  currentVersion: z.string(),
  platform: z.string(),
  appId: z.string(),
  updateType: UpdateTypeSchema,
});

// Schema for the check-update response
export const CheckUpdateResponseSchema = z.object({
    hasUpdate: z.boolean(),
    version: z.string().optional(),
    platform: z.string().optional(),
    updateType: UpdateTypeSchema.optional(),
    downloadUrl: z.string().url().optional(),
    changelog: z.array(z.string()).optional(),
    mandatory: z.boolean().optional(),
    releaseDate: z.string().datetime().optional(),
    fileSize: z.number().optional(),
    checksum: z.string().optional(),
});

// Schema for the list versions response
export const ListVersionsResponseSchema = z.object({
    appId: z.string(),
    platform: z.string(),
    versions: z.array(AppVersionSchema),
});

// Generic success/error schemas
export const SuccessResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    version: AppVersionSchema.optional(),
});

export const ErrorSchema = z.object({
  error: z.string(),
});

export type UpdateType = z.infer<typeof UpdateTypeSchema>;
export type AppVersion = z.infer<typeof AppVersionSchema>;
export type UpdateMetadata = z.infer<typeof UpdateMetadataSchema>;
export type CheckUpdateRequest = z.infer<typeof CheckUpdateRequestSchema>;
export type CheckUpdateResponse = z.infer<typeof CheckUpdateResponseSchema>;
export type ListVersionsResponse = z.infer<typeof ListVersionsResponseSchema>;
