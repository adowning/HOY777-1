import { defineConfig } from 'drizzle-kit'
import { dbConfig } from './src/db'
import { env } from './src/env'

const extendConfig = env.PGLITE ? { driver: 'pglite' } : {}

export default defineConfig({
  schema: ['./src/db/schema/index.ts', './src/db/schema/gameplay.ts'],
  out: './drizzle',
  dialect: 'postgresql',
  casing: dbConfig.casing,
  ...extendConfig,
  dbCredentials: {
    url: env.PGLITE ? './.db' : env.DATABASE_URL,
  },
})
