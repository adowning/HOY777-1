import { PGlite } from '@electric-sql/pglite'
import { sql } from 'drizzle-orm'
import {
  drizzle as pgDrizzle,
} from 'drizzle-orm/node-postgres'
import { drizzle as pgliteDrizzle } from 'drizzle-orm/pglite'
import { Pool } from 'pg'
import { env } from '../env'
import * as schema from './schema'

// Remove explicit type annotation to avoid type constraint issues
export const dbConfig = {
  schema,
  logger: true,
  casing: 'snake_case',
}

export const migrateConfig = {
  migrationsFolder: 'drizzle',
  migrationsSchema: 'drizzle-backend',
}

export const pgConnection = env.PGLITE
  ? new PGlite(process.env.NODE_ENV === 'test' ? undefined : './.db')
  : new Pool({
      connectionString: env.DATABASE_URL,
      connectionTimeoutMillis: 10000,
    })

export const pg_client = pgConnection; // Export the connection pool

// Let TypeScript infer the correct type from the drizzle function calls
export const db = env.PGLITE
  ? pgliteDrizzle(pgConnection as PGlite, { ...dbConfig, schema })
  : pgDrizzle(pgConnection as Pool, { ...dbConfig, schema })

export const coalesce = <T>(column: T, value: number) =>
  sql`COALESCE(${column}, ${value})`.mapWith(Number)

export * from './schema'