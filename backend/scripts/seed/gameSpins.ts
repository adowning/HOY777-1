import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { gameSessions, gameSpins } from '../../src/db'; // Direct imports
import * as schema from '../../src/db'; // Keep for db type, but prefer direct for tables
import { rand, randFloat, randNumber, randPastDate } from '@ngneat/falso';

/**
 * Seeds the database with game sessions and game spins.
 * This function depends on users and games already being seeded.
 * @param db The Drizzle database instance.
 */
export async function seedGameSpins(db: NodePgDatabase<typeof schema>) {
    console.log('🔄 Seeding game sessions and spins...');

    // 1. Fetch existing users and games to create relationships
    const allUsers = await db.query.users.findMany({
        columns: { id: true, username: true, avatar: true },
    });
    const allGames = await db.query.games.findMany({
        columns: { id: true, name: true },
    });

    if (allUsers.length === 0 || allGames.length === 0) {
        console.log('⚠️ Cannot seed spins without users and games. Skipping.');
        return;
    }

    // 2. Create a variety of game sessions for each user
    const sessionsToInsert: (typeof gameSessions.$inferInsert)[] = [];
    for (const user of allUsers) {
        const sessionCount = randNumber({ min: 1, max: 5 });
        for (let i = 0; i < sessionCount; i++) {
            const status = rand(['active', 'ended']);
            const createdAt = randPastDate({ years: 1 });
            
            const sessionData: typeof gameSessions.$inferInsert = {
                userId: user.id,
                gameId: rand(allGames).id,
                playerAvatar: user.avatar,
                status: status,
                createdAt: createdAt,
                // Explicitly set endedAt to null if the session is not ended
                endedAt: status === 'ended' ? new Date(createdAt.getTime() + randNumber({ min: 60000, max: 3600000 })) : null,
            };
            sessionsToInsert.push(sessionData);
        }
    }

    if (sessionsToInsert.length === 0) {
        console.log('ℹ️ No new game sessions to seed.');
        return;
    }
    
    console.log(`🌱 Creating ${sessionsToInsert.length} game sessions...`);
    const createdSessions = await db
        .insert(gameSessions) // Use the directly imported schema
        .values(sessionsToInsert)
        .returning();


    // 3. Generate game spins for each of the newly created sessions
    const spinsToInsert: (typeof gameSpins.$inferInsert)[] = [];
    for (const session of createdSessions) {
        const spinCount = randNumber({ min: 5, max: 50 });
        const user = allUsers.find((u) => u.id === session.userId);
        const game = allGames.find((g) => g.id === session.gameId);

        if (!user || !game) continue;

        for (let i = 0; i < spinCount; i++) {
            const wagerAmount = randFloat({ min: 0.1, max: 5, fraction: 2 });
            const grossWinAmount = rand([
                0, 0, 0, // ~75% chance of no win
                randFloat({ min: 0.01, max: wagerAmount * 100, fraction: 2 }),
            ]);

            spinsToInsert.push({
                playerName: user.username,
                gameName: game.name,
                spinData: { lines: 10, multiplier: grossWinAmount > 0 ? grossWinAmount / wagerAmount : 0 },
                grossWinAmount,
                wagerAmount,
                spinNumber: i + 1,
                playerAvatar: user.avatar,
                sessionId: session.id,
                userId: user.id,
                occurredAt: randPastDate({ years: 1 }),
            });
        }
    }
    
    if (spinsToInsert.length > 0) {
        await db.insert(gameSpins).values(spinsToInsert); // Use direct import here too
        console.log(`✅ Seeded ${spinsToInsert.length} game spins.`);
    } else {
        console.log('ℹ️  No new game spins to seed.');
    }
}