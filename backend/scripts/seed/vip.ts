import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../../src/db'
import { vipLevels } from '../../src/db'

const levels = [
  {
    level: 1,
    name: 'Bronze',
    depositExp: 1000,
    betExp: 5000,
    uprankAward: 100,
    weekAward: 10,
  },
  {
    level: 2,
    name: 'Silver',
    depositExp: 5000,
    betExp: 25000,
    uprankAward: 500,
    weekAward: 50,
  },
  {
    level: 3,
    name: 'Gold',
    depositExp: 20000,
    betExp: 100000,
    uprankAward: 2000,
    weekAward: 200,
  },
  {
    level: 4,
    name: 'Platinum',
    depositExp: 100000,
    betExp: 500000,
    uprankAward: 10000,
    weekAward: 1000,
  },
  {
    level: 5,
    name: 'Diamond',
    depositExp: 500000,
    betExp: 2500000,
    uprankAward: 50000,
    weekAward: 5000,
  },
]

export async function seedVipLevels(db: NodePgDatabase<typeof schema>) {
  console.log('💎 Seeding VIP levels...')
  await db.insert(vipLevels).values(levels).onConflictDoNothing()
  console.log('✅ VIP levels seeded.')
  return levels
}
