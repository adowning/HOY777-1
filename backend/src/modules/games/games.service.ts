import { db } from '#/db';
import { games } from '#/db/schema';
import { eq } from 'drizzle-orm';
import {
    gameCategories,
    games,
    users,
    gameHistory,
    favoriteGames, // Assuming you've added this to your schema
    gameSessions,  // Assuming you've added this to your schema
} from '../../db/schema'
import { desc, eq, and, sql, inArray } from 'drizzle-orm'
import { GameHistoryResponse, GameHistoryItem } from '../gameplay/redtiger/game';

export const findGameCategories = async () => {
    return await db.query.gameCategories.findMany();
}


export const findAllGames = async () => {
    const games = await db.query.games.findMany();
    return games;
}

export const searchGames = async (params: { game_categories_slug?: string, page: number, limit: number }) => {
    if (!params.game_categories_slug) {
        const allGames = await db.query.games.findMany({
            limit: params.limit,
            offset: (params.page - 1) * params.limit,
        });
        const totalCount = await db.select({ count: sql<number>`count(*)` }).from(games);
        return { games: allGames, total: totalCount[0].count };
    }

    const category = await db.query.gameCategories.findFirst({
        where: eq(gameCategories.slug, params.game_categories_slug),
    });

    if (!category) return { games: [], total: 0 };

    const result = await db.query.games.findMany({
        where: eq(games.categoryId, category.id),
        limit: params.limit,
        offset: (params.page - 1) * params.limit,
    });

    const totalCount = await db.select({ count: sql<number>`count(*)` }).from(games).where(eq(games.categoryId, category.id));

    return { games: result, total: totalCount[0].count };
}

export const findUserGames = async (userId: string, params: { game_categories_slug: string, page: number, limit: number }) => {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const offset = (page - 1) * limit;

    if (params.game_categories_slug === 'favorite') {
        const favoriteGameIdsQuery = db
            .select({ id: favoriteGames.gameId })
            .from(favoriteGames)
            .where(eq(favoriteGames.userId, userId));

        const favoriteGameIds = await favoriteGameIdsQuery;
        if (favoriteGameIds.length === 0) return { games: [], total: 0 };

        const gameIds = favoriteGameIds.map(f => f.id);

        const favGames = await db.query.games.findMany({
            where: inArray(games.id, gameIds),
            limit,
            offset,
        });
        return { games: favGames, total: gameIds.length };

    } else if (params.game_categories_slug === 'history') {
        const history = await db.query.gameHistory.findMany({
            where: eq(gameHistory.userId, userId),
            orderBy: desc(gameHistory.createdAt),
            limit,
            offset,
        });

        const totalCount = await db.select({ count: sql<number>`count(*)` }).from(gameHistory).where(eq(gameHistory.userId, userId));

        return { games: history, total: totalCount[0].count };
    }
    return { games: [], total: 0 };
}

export const addFavoriteGame = async (userId: string, gameId: string) => {
    await db.insert(favoriteGames).values({ userId, gameId }).onConflictDoNothing();
}

export const removeFavoriteGame = async (userId: string, gameId: string) => {
    await db.delete(favoriteGames).where(and(eq(favoriteGames.userId, userId), eq(favoriteGames.gameId, gameId)));
}

export const findFavoriteGames = async (userId: string): Promise<string[]> => {
    const favorites = await db.select({ gameId: favoriteGames.gameId }).from(favoriteGames).where(eq(favoriteGames.userId, userId));
    return favorites.map(f => f.gameId);
}


export const enterGame = async (userId: string, gameId: string, token: string) => {
    console.log(userId,gameId)
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  const game = await db.query.games.findFirst({ where: eq(games.id, gameId) });

  if (!user || !game) {
    throw new Error('User or Game not found');
  }

  const newSession = await db.transaction(async (tx) => {
    await tx
      .update(gameSessions)
      .set({ status: 'ended', endedAt: new Date() })
      .where(and(eq(gameSessions.userId, userId), eq(gameSessions.status, 'active')));

    const [createdSession] = await tx
      .insert(gameSessions)
      .values({ userId, gameId, status: 'active' })
      .returning();

    await tx
      .update(users)
      .set({ currentGameSession: createdSession.id })
      .where(eq(users.id, userId));

    return createdSession;
  });
  game.name = game.name.replace('RTG', '')

  const gameConfig = {
    authToken: token,
    gameSessionId: newSession.id,
    userId: user.id,
    gameName: game.name,
    lang: user.language || 'en',
    currency: 'USD',
    operator: 'redtiger',
    provider: 'kronos',
    depositUrl: '/wallet/deposit',
    lobbyUrl: '/',
    mode: 'real',
    rgsApiBase: `http://localhost:9999/rpc/spin-data/redtiger/platform`,
    cdn: `https://cdn-eu.cloudedge.info/all/games/slots/${game.name}/`,
    baseCdn: 'https://cdn-eu.cloudedge.info/all/games/',
    // --- Adding missing properties ---
    skin: 'next-name-payouts',
    gameType: 'slot',
    hasTurboMode: true,
    hasAutoplay: true,
    addedAnticipation: true,
    bonusWheelEnabled: false,
    hasGamble: false,
  };

  return {
    webUrl: '/games/redtiger/loader.html',
    gameConfig,
  };
};
export const leaveGame = async (userId: string) => {
    // NOTE: This logic also depends on `currentSessionDataId` in the `users` schema.
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: { currentGameSession: true }
    });

    if (user?.currentGameSession) {
        await db.update(gameSessions)
            .set({ status: 'ended', endedAt: new Date() })
            .where(eq(gameSessions.id, user.currentGameSession));

        await db.update(users).set({ currentGameSession: null }).where(eq(users.id, userId));
    }
};

export const findGameHistory = async (userId: string): Promise<GameHistoryResponse> => {
    // NOTE: Ensure your `gameHistory` table has a `userId` column.
    const records: GameHistoryItem[] = await db.query.gameHistory.findMany({
        where: eq(gameHistory.userId, userId),
        orderBy: desc(gameHistory.createdAt)
    });

    const totalCountResult = await db.select({ count: sql<number>`count(*)` }).from(gameHistory).where(eq(gameHistory.userId, userId));
    const totalCount = totalCountResult[0].count;

    return {
        total_pages: Math.ceil(totalCount / 10), // Assuming 10 per page
        record: records
    };
};