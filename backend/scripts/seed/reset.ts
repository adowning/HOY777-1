import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../../src/db/schema'
import { sql } from 'drizzle-orm' // <-- 1. Import `sql`

// IMPORTANT: List tables in order of dependency (children first, then parents)
const tableNames = [
  'wallets',
  'products',
  'user_achievements',
  'invite_commission_history',
  'invite_stats',
  'user_rewards',
  'vip_times_history',
  'vip_level_reward_history',
  'vip_rebate_history',
  'vip_tasks',
  'invite_history',
  'game_big_wins',
  'game_history',
  'chat_messages',
  'statistics',
  'live_wins',
  'explain_items',
  'achievement_items',
  'promos',
  'invites',
  'achievements',
  'withdrawals',
  'deposits',
  'transactions',
  'messages',
  'vips',
  'promo_groups',
  'games',
  'game_categories',
  'balances',
  'bonuses',
  'rewards',
  'vip_signin_awards',
  'vip_level_awards',
  'countries',
  'languages',
  'currencies',
  'announcements',
  'banners',
  'vip_levels',
  'users',
  'operators',
  'vip_info',
]

export async function resetDatabase(db: NodePgDatabase<typeof schema>) {
  console.log('🗑️  Resetting database...')

  // Using TRUNCATE with RESTART IDENTITY and CASCADE to handle foreign keys
  const truncateQuery = `TRUNCATE TABLE ${tableNames.map((name) => `"${name}"`).join(', ')} RESTART IDENTITY CASCADE;`

  try {
    // await db.execute(truncateQuery)
    await db.execute(sql.raw(truncateQuery))
    console.log('✅ Database reset successfully.')
  } catch (error) {
    console.error('❌ Error resetting database:', error)
    throw error
  }
}
