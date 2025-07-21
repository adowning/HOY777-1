import type { PGlite } from '@electric-sql/pglite'
import { type DrizzleConfig, sql } from 'drizzle-orm'
import {
  type NodePgClient,
  drizzle as pgDrizzle,
} from 'drizzle-orm/node-postgres'
import type { PgDatabase } from 'drizzle-orm/pg-core'
import { drizzle as pgliteDrizzle } from 'drizzle-orm/pglite'
import { env } from '../env'

export const dbConfig: DrizzleConfig = {
  logger: false, //config.debug,
  casing: 'snake_case',
}

export const migrateConfig = {
  migrationsFolder: 'drizzle',
  migrationsSchema: 'drizzle-backend',
}

export const connection = env.PGLITE
  ? process.env.NODE_ENV === 'test'
    ? // in-memory database for tests
      {}
    : { dataDir: './.db' }
  : {
      connectionString: env.DATABASE_URL,
      connectionTimeoutMillis: 10000,
    }

// biome-ignore lint/suspicious/noExplicitAny: Can be two different types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db: PgDatabase<any> & {
  $client: PGlite | NodePgClient
} = env.PGLITE
  ? pgliteDrizzle({ connection, ...dbConfig })
  : pgDrizzle({ connection, ...dbConfig })

export const coalesce = <T>(column: T, value: number) =>
  sql`COALESCE(${column}, ${value})`.mapWith(Number)

export * from './schema'
// import pg from 'pg'
// import { drizzle } from 'drizzle-orm/libsql'

// import { env } from '../env'

// import * as schema from './schema'

// import path from 'path'

// const dbPath = path.resolve(process.cwd(), 'dev.db')

// const client = pg({
//   url: `file:${dbPath}`,
//   authToken: env.DATABASE_AUTH_TOKEN,
// })

// const db = drizzle(client, {
//   schema,
//   logger: true,
// })

// export default db

// export * from './schema'
