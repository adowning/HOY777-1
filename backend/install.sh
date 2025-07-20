#!/bin/bash

# Create the directory structure in case it's missing
mkdir -p scripts/seed

# --- Overwrite scripts/seed/reset.ts ---
cat > scripts/seed/reset.ts << 'EOF'
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../src/db/schema';

// IMPORTANT: List tables in order of dependency (children first, then parents)
const tableNames = [
  'wallets', 'products', 'userAchievements', 'inviteCommissionHistory',
  'inviteStats', 'userRewards', 'vipTimesHistory', 'vipLevelRewardHistory',
  'vipRebateHistory', 'vipTasks', 'inviteHistory', 'gameBigWins',
  'gameHistory', 'chatMessages', 'statistics', 'liveWins',
  'explainItems', 'achievementItems', 'promos', 'invites',
  'achievements', 'withdrawals', 'deposits', 'transactions', 'messages',
  'vips', 'promoGroups', 'games', 'gameCategories', 'balances', 'bonuses',
  'rewards', 'vipSigninAwards', 'vipLevelAwards', 'countries', 'languages',
  'currencies', 'announcements', 'banners', 'vipLevels',
  'users',      // users depends on operators
  'operators'   // operators is last as many tables depend on it
];

export async function resetDatabase(db: NodePgDatabase<typeof schema>) {
  console.log('🗑️  Resetting database...');

  // Using TRUNCATE with RESTART IDENTITY and CASCADE to handle foreign keys
  const truncateQuery = `TRUNCATE TABLE ${tableNames.map(name => `"${name}"`).join(', ')} RESTART IDENTITY CASCADE;`;

  try {
    await db.execute(truncateQuery);
    console.log('✅ Database reset successfully.');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    throw error;
  }
}
EOF

# --- Create scripts/seed/operator.ts ---
cat > scripts/seed/operator.ts << 'EOF'
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../src/db/schema';

// This is the single, hardcoded operator for the entire system.
// Using a deterministic ID makes it easy to reference in other seeds.
const defaultOperator = {
  id: 'clxjv0w2z0000356s1szacrqs',
  name: 'Default Operator',
  operatorSecret: crypto.randomUUID(),
  operatorAccess: crypto.randomUUID(),
  callbackUrl: 'https://example.com/callback',
  allowedIps: ['0.0.0.0/0'], // Allows all IPs for dev purposes
  acceptedPayments: ['INSTORE_CASH', 'CREDIT_CARD'],
};

export async function seedOperator(db: NodePgDatabase<typeof schema>) {
    console.log('🏢 Seeding default operator...');
    
    // onConflictDoNothing prevents errors if the operator already exists.
    await db.insert(schema.operators)
        .values(defaultOperator)
        .onConflictDoNothing();

    console.log('✅ Default operator seeded.');
    // Return the operator object so its ID can be used in other seeds.
    return defaultOperator;
}
EOF

# --- Create scripts/seed/products.ts ---
cat > scripts/seed/products.ts << 'EOF'
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../src/db/schema';
import productsData from './json/products.json';

export async function seedProducts(db: NodePgDatabase<typeof schema>, operatorId: string) {
    console.log('🛍️ Seeding products...');

    if(!operatorId) {
        throw new Error('An Operator ID is required to seed products.');
    }
    
    const productsToInsert = productsData.map(product => ({
      ...product,
      id: `prod_${crypto.randomUUID()}`, // Ensure a unique ID for each product
      operatorId: operatorId, // Link each product to the default operator
    }));

    await db.insert(schema.products)
        .values(productsToInsert)
        .onConflictDoNothing();

    console.log(`✅ ${productsData.length} products seeded.`);
}
EOF

# --- Overwrite scripts/seed/users.ts ---
cat > scripts/seed/users.ts << 'EOF'
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../src/db/schema';
import { randNumber, randPastDate, randPassword, randUserName, randElement } from '@ngneat/falso';

export async function seedUsers(db: NodePgDatabase<typeof schema>, count: number, operatorId: string) {
  console.log(`🌱 Seeding ${count} random users, each with a wallet...`);
  
  const allVipLevels = await db.query.vipLevels.findMany();
  if (allVipLevels.length === 0) {
    throw new Error('VIP levels must be seeded before users.');
  }

  for (let i = 0; i < count; i++) {
    const username = randUserName();
    const password = randPassword();
    const hashedPassword = await Bun.password.hash(password);
    const createdAt = randPastDate({ years: 1 });

    // Use a transaction to ensure user and wallet are created together
    await db.transaction(async (tx) => {
      // 1. Create the user
      const [newUser] = await tx.insert(schema.users).values({
        username,
        passwordHash: hashedPassword,
        createdAt,
        vipLevel: randElement(allVipLevels).level,
      }).returning();

      // 2. Create the associated wallet
      await tx.insert(schema.wallets).values({
        id: `wallet_${crypto.randomUUID()}`,
        userId: newUser.id,
        operatorId: operatorId, // Link to the hardcoded operator
        balance: 0, // Wallets start empty
      });

      // 3. Create an initial balance record for compatibility
      const initialBalance = randNumber({ min: 1000, max: 20000 });
      await tx.insert(schema.balances).values({
        userId: newUser.id,
        amount: initialBalance,
        availableBalance: initialBalance,
      });

      console.log(`👤 Created user '${username}' (Password: ${password}) with an associated wallet.`);
    });
  }
}

export async function seedHardcodedUser(db: NodePgDatabase<typeof schema>, operatorId: string) {
    console.log("🔒 Seeding hardcoded user 'asdf' with a wallet...");
    const username = 'asdf';
    const password = 'asdfasdf';

    const existingUser = await db.query.users.findFirst({ where: (users, { eq }) => eq(users.username, username) });
    if(existingUser) {
        console.log("✅ Hardcoded user 'asdf' already exists.");
        return;
    }
    
    const hashedPassword = await Bun.password.hash(password);

    await db.transaction(async (tx) => {
        // 1. Create the user
        const [newUser] = await tx.insert(schema.users).values({
            username,
            passwordHash: hashedPassword,
            vipLevel: 1,
        }).returning();

        // 2. Create the wallet
        await tx.insert(schema.wallets).values({
            id: `wallet_${crypto.randomUUID()}`,
            userId: newUser.id,
            operatorId: operatorId,
            balance: 50000, // 500 USD
        });

        // 3. Create a balance record
        await tx.insert(schema.balances).values({
          userId: newUser.id,
          amount: 50000,
          availableBalance: 50000,
        });
    });

    console.log(`✅ Hardcoded user 'asdf' created. Password is '${password}'`);
}
EOF

# --- Overwrite scripts/seed.ts ---
cat > scripts/seed.ts << 'EOF'
import db, { connection } from '../src/db';
import * as schema from '../src/db/schema';
import { resetDatabase } from './seed/reset';
import { seedVipLevels } from './seed/vip';
import { seedGames } from './seed/games';
import { seedOperator } from './seed/operator';
import { seedProducts } from './seed/products';
import { seedUsers, seedHardcodedUser } from './seed/users';

// --- Script Configuration ---
const RESET_DATABASE = true;
const USER_COUNT = 10;
// --- End Configuration ---

async function main() {
  console.log('🚀 Starting database seeding process...');
  const startTime = Date.now();

  try {
    if (RESET_DATABASE) {
      await resetDatabase(db as any);
    }

    // 1. Seed foundational data that has no dependencies
    const operator = await seedOperator(db as any);
    await seedVipLevels(db as any);
    await seedGames(db as any);
    
    // 2. Seed data that depends on the operator
    await seedProducts(db as any, operator.id);
    
    // 3. Seed users, which now depend on the operator for their wallets
    await seedUsers(db as any, USER_COUNT, operator.id);
    await seedHardcodedUser(db as any, operator.id);
    
  } catch (error) {
    console.error('❌ An error occurred during the seeding process:');
    console.error(error);
    process.exit(1);
  } finally {
    // Ensure the database connection is closed to prevent hanging processes
    await connection.end();
  }

  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  console.log(`\n✅ Seeding complete in ${duration.toFixed(2)} seconds.`);
}

main();
EOF

echo "✅ Seeding script files have been successfully updated."