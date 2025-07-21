import { env as dotenv } from '@dotenv-run/core'
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

dotenv({
  root: '../..',
  verbose: true, //config.debug,
  files: ['.env'],
})

/**
 * Environment variables validated with zod
 */
export const env = createEnv({
  server: {
    PGLITE: z
      .string()
      .optional()
      .transform((v) => v === 'true'),
    DATABASE_URL: z.url(),
    NODE_ENV: z.union([
      z.literal('development'),
      z.literal('production'),
      z.literal('staging'),
      z.literal('tunnel'),
      z.literal('test'),
    ]),
    PORT: z.string().optional(),
    // UNSUBSCRIBE_SECRET: z.string(),

    // TUNNEL_URL: z.string().default(''),
    // TUNNEL_AUTH_TOKEN: z.string().default(''),

    // ARGON_SECRET: z.string(),
    // COOKIE_SECRET: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),

    // ELECTRIC_API_SECRET: z.string(),

    // REMOTE_SYSTEM_ACCESS_IP: z.string(),

    // NOVU_API_KEY: z.string().optional(),
    // NOVU_SLACK_WEBHOOK: z.string().optional(),

    // SEND_ALL_TO_EMAIL: z.string().optional(),
    // BREVO_API_KEY: z.string().optional(),

    // PADDLE_API_KEY: z.string().optional(),
    // PADDLE_WEBHOOK_KEY: z.string().optional(),

    // BETTERSTACK_SOURCE_TOKEN: z.string().optional(),
    // BETTERSTACK_INGESTING_HOST: z.string().optional(),

    // GITHUB_CLIENT_ID: z.string().optional(),
    // GITHUB_CLIENT_SECRET: z.string().optional(),
    // GOOGLE_CLIENT_ID: z.string().optional(),
    // GOOGLE_CLIENT_SECRET: z.string().optional(),
    // MICROSOFT_TENANT_ID: z.string().optional(),
    // MICROSOFT_CLIENT_ID: z.string().optional(),
    // MICROSOFT_CLIENT_SECRET: z.string().optional(),

    // TRANSLOADIT_KEY: z.string().optional(),
    // TRANSLOADIT_SECRET: z.string().optional(),

    // S3_ACCESS_KEY_ID: z.string().default(''),
    // S3_ACCESS_KEY_SECRET: z.string().default(''),

    // TRIGGER_SECRET_KEY: z.string().optional(),

    // WEBHOOK_SECRET: z.string().optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})

// import { config } from 'dotenv'
// import { expand } from 'dotenv-expand'
// import path from 'node:path'
// import { z } from 'zod'

// expand(
//   config({
//     path: path.resolve(
//       process.cwd(),
//       process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
//     ),
//   })
// )

// const EnvSchema = z
//   .object({
//     NODE_ENV: z.string().default('development'),
//     PORT: z.coerce.number().default(9999),
//     LOG_LEVEL: z.enum([
//       'fatal',
//       'error',
//       'warn',
//       'info',
//       'debug',
//       'trace',
//       'silent',
//     ]),
//     DATABASE_URL: z.string().url(),
//     DATABASE_AUTH_TOKEN: z.string().optional(),
//   })
//   .superRefine((input, ctx) => {
//     if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.invalid_type,
//         expected: 'string', // This is the expected type
//         received: 'undefined',
//         path: ['DATABASE_AUTH_TOKEN'],
//         message: "Must be set when NODE_ENV is 'production'",
//         input: '',
//       })
//     }
//   })

// export type env = z.infer<typeof EnvSchema>

// const { data: env, error } = EnvSchema.safeParse(process.env)

// if (error) {
//   console.error('❌ Invalid env:')
//   console.error(JSON.stringify(error.flatten().fieldErrors, null, 2))
//   process.exit(1)
// }
// console.log(env)
// export default env!
