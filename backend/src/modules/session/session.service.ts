import { db } from '#/db';
import { gameSessions, gameSpins } from '#/db/schema';
import { getGameSessionFromCache, getSpinsFromCache, deleteGameSessionFromCache, deleteSpinsFromCache } from '#/lib/cache';

export const endAndPersistGameSession = async (gameSessionId: string) => {
  const sessionToPersist = getGameSessionFromCache(gameSessionId);
  if (!sessionToPersist) {
    console.log(`Session ${gameSessionId} not found in cache. Nothing to persist.`);
    return;
  }

  const spinsToPersist = await getSpinsFromCache(gameSessionId);

  try {
    await db.transaction(async (tx) => {
      await tx.insert(gameSessions).values(sessionToPersist);
      if (spinsToPersist.length > 0) {
        await tx.insert(gameSpins).values(spinsToPersist);
      }
    });

    await deleteGameSessionFromCache(gameSessionId);
    await deleteSpinsFromCache(gameSessionId);

    console.log(`Session ${gameSessionId} and ${spinsToPersist.length} spins persisted to database and removed from cache.`);
  } catch (error) {
    console.error(`Failed to persist session ${gameSessionId}:`, error);
  }
};
