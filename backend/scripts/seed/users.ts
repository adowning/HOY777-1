import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../../src/db/schema'
import {
  randNumber,
  randPastDate,
  randPassword,
  randUserName,
  rand,
} from '@ngneat/falso'

export async function seedUsers(
  db: NodePgDatabase<typeof schema>,
  count: number,
  operatorId: string
) {
  console.log(`🌱 Seeding ${count} random users, each with a wallet...`)

  const allVipLevels = await db.query.vipLevels.findMany()
  if (allVipLevels.length === 0) {
    throw new Error('VIP levels must be seeded before users.')
  }

  for (let i = 0; i < count; i++) {
    const username = randUserName()
    const password = randPassword()
    const hashedPassword = await Bun.password.hash(password)
    const createdAt = randPastDate({ years: 1 })

    // Use a transaction to ensure user and wallet are created together
    await db.transaction(async (tx) => {
      // 1. Create the user
      const [newUser] = await tx
        .insert(schema.users)
        .values({
          username,
          passwordHash: hashedPassword,
          createdAt,
          vipLevel: rand(allVipLevels).level,
        })
        .returning()

      // 2. Create the associated wallet
      await tx.insert(schema.wallets).values({
        id: `wallet_${crypto.randomUUID()}`,
        userId: newUser.id,
        operatorId: operatorId, // Link to the hardcoded operator
        balance: 0, // Wallets start empty
      })

      // 3. Create an initial balance record for compatibility
      const initialBalance = randNumber({ min: 1000, max: 20000 })
      await tx.insert(schema.balances).values({
        userId: newUser.id,
        amount: initialBalance,
        availableBalance: initialBalance,
      })

      console.log(
        `👤 Created user '${username}' (Password: ${password}) with an associated wallet.`
      )
    })
  }
}

export async function seedHardcodedUser(
  db: NodePgDatabase<typeof schema>,
  operatorId: string
) {
  console.log("🔒 Seeding hardcoded user 'asdf' with a wallet...")
  const username = 'asdf'
  const password = 'asdfasdf'

  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  })
  if (existingUser) {
    console.log("✅ Hardcoded user 'asdf' already exists.")
    return
  }

  const hashedPassword = await Bun.password.hash(password)

  await db.transaction(async (tx) => {
    // 1. Create the user
    const [newUser] = await tx
      .insert(schema.users)
      .values({
        username,
        passwordHash: hashedPassword,
        vipLevel: 1,
      })
      .returning()

    // 2. Create the wallet
    await tx.insert(schema.wallets).values({
      id: `wallet_${crypto.randomUUID()}`,
      userId: newUser.id,
      operatorId: operatorId,
      balance: 50000, // 500 USD
    })

    // 3. Create a balance record
    await tx.insert(schema.balances).values({
      userId: newUser.id,
      amount: 50000,
      availableBalance: 50000,
    })
  })

  console.log(`✅ Hardcoded user 'asdf' created. Password is '${password}'`)
}
