import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import env from '../env'

import * as schema from './schemelibsql'

import path from 'path'

const dbPath = path.resolve(process.cwd(), 'dev.db')

const client = createClient({
  url: `file:${dbPath}`,
  authToken: env.DATABASE_AUTH_TOKEN,
})

const db = drizzle(client, {
  schema,
  logger: true,
})

export default db
