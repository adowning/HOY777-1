import { PGlite } from '@electric-sql/pglite'
import { type DrizzleConfig, sql } from 'drizzle-orm'
import {
  type NodePgClient,
  drizzle as pgDrizzle,
} from 'drizzle-orm/node-postgres'
import type { PgDatabase } from 'drizzle-orm/pg-core'
import { drizzle as pgliteDrizzle } from 'drizzle-orm/pglite'
import { Pool } from 'pg'
import { env } from '../env'
import * as schema from './schema'

export const dbConfig: DrizzleConfig = {
  schema,
  logger: true,
  casing: 'snake_case',
}

export const migrateConfig = {
  migrationsFolder: 'drizzle',
  migrationsSchema: 'drizzle-backend',
}

const pgConnection = env.PGLITE
  ? new PGlite(process.env.NODE_ENV === 'test' ? undefined : './.db')
  : new Pool({
      connectionString: env.DATABASE_URL,
      connectionTimeoutMillis: 10000,
    })

export const db: PgDatabase<typeof schema> & {
  $client: PGlite | NodePgClient
} = env.PGLITE
  ? pgliteDrizzle(pgConnection as PGlite, { ...dbConfig, schema })
  : pgDrizzle(pgConnection as Pool, { ...dbConfig, schema })

export const coalesce = <T>(column: T, value: number) =>
  sql`COALESCE(${column}, ${value})`.mapWith(Number)

export * from './schema'
export * from './types/drizzle.types'