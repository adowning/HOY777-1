import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../../src/db/schema'
import { sql } from 'drizzle-orm' // <-- 1. Import `sql`

// IMPORTANT: List tables in order of dependency (children first, then parents)
const tableNames = [
  'wallets',
  'products',
  'userAchievements',
  'inviteCommissionHistory',
  'inviteStats',
  'userRewards',
  'vipTimesHistory',
  'vipLevelRewardHistory',
  'vipRebateHistory',
  'vipTasks',
  'inviteHistory',
  'gameBigWins',
  'gameHistory',
  'chatMessages',
  'statistics',
  'liveWins',
  'explainItems',
  'achievementItems',
  'promos',
  'invites',
  'achievements',
  'withdrawals',
  'deposits',
  'transactions',
  'messages',
  'vips',
  'promoGroups',
  'games',
  'gameCategories',
  'balances',
  'bonuses',
  'rewards',
  'vipSigninAwards',
  'vipLevelAwards',
  'countries',
  'languages',
  'currencies',
  'announcements',
  'banners',
  'vipLevels',
  'users', // users depends on operators
  'operators', // operators is last as many tables depend on it
]

export async function resetDatabase(db: NodePgDatabase<typeof schema>) {
  console.log('🗑️  Resetting database...')

  // Using TRUNCATE with RESTART IDENTITY and CASCADE to handle foreign keys
  const truncateQuery = `TRUNCATE TABLE ${tableNames.map((name) => `"${name}"`).join(', ')} RESTART IDENTITY CASCADE;`

  try {
    // await db.execute(truncateQuery)
    await db.run(sql.raw(truncateQuery))
    console.log('✅ Database reset successfully.')
  } catch (error) {
    console.error('❌ Error resetting database:', error)
    throw error
  }
}
