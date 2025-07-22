import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../../src/db/schema'
import { eq } from 'drizzle-orm'

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

  // Use the standard query builder
  const allVipLevels = await db.select().from(schema.vipLevels)

  if (allVipLevels.length === 0) {
    throw new Error('VIP levels must be seeded before users.')
  }

  for (let i = 0; i < count; i++) {
    const username = randUserName()
    const password = randPassword()
    const hashedPassword = await Bun.password.hash(password)
    const createdAt = randPastDate({ years: 1 })
      const avatarN = randNumber({ min: 1, max: 9 })
  const playerAvatar = `avatar-0${avatarN}.webp`

    await db.transaction(async (tx) => {
      const [newUser] = await tx
        .insert(schema.users)
        .values({
          username,
          passwordHash: hashedPassword,
          createdAt,
          avatar: playerAvatar,
          vipLevel: rand(allVipLevels).level,
        })
        .returning()
      const initialBalance = randNumber({ min: 1000, max: 20000 })

      await tx.insert(schema.wallets).values({
        id: `wallet_${crypto.randomUUID()}`,
        userId: newUser.id,
        balance: initialBalance,
        operatorId: operatorId,
        balance: 0,
      })

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

  // Use the standard query builder `db.select()` to check for the user
  const [existingUser] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, username))

  if (existingUser) {
    console.log("✅ Hardcoded user 'asdf' already exists.")
    return
  }

  const hashedPassword = await Bun.password.hash(password)
  await db.transaction(async (tx) => {
    const [newUser] = await tx
      .insert(schema.users)
      .values({
        username,
        avatar: `avatar-01.webp`,
        passwordHash: hashedPassword,
        vipLevel: 1,
      })
      .returning()

    await tx.insert(schema.wallets).values({
      id: `wallet_${crypto.randomUUID()}`,
      userId: newUser.id,
      operatorId: operatorId,
      balance: 50000, // 500 USD
    })

    await tx.insert(schema.balances).values({
      userId: newUser.id,
      amount: 50000,
      availableBalance: 50000,
    })
  })

  console.log(`✅ Hardcoded user 'asdf' created. Password is '${password}'`)
}
