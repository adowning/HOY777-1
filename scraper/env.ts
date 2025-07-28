import { env as dotenv } from '@dotenv-run/core'
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

dotenv({
  root: '.',
  verbose: true, //config.debug,
  files: ['.env'],
})

/**
 * Environment variables validated with zod
 */
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.union([
      z.literal('development'),
      z.literal('production'),
      z.literal('staging'),
      z.literal('tunnel'),
      z.literal('test'),
    ]),
    PORT: z.string().optional(),
    ACCESS_TOKEN_SECRET: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
