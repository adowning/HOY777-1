import { db } from '#/db'
import { gameSpins, insertGameSpinsSchema, games } from '#/db'
import { eq, desc, and, inArray } from 'drizzle-orm'
import { z } from 'zod'

type CreateSpinInput = z.infer<typeof insertGameSpinsSchema>

export const createSpin = async (input: CreateSpinInput) => {
  const [newSpin] = await db
    .insert(gameSpins)
    .values({
      ...input,
      occurredAt: new Date(input.occurredAt),
    })
    .returning()

  return newSpin
}

export const findSpinsByUserId = async (userId: string) => {
  const spins = await db.query.gameSpins.findMany({
    where: eq(gameSpins.userId, userId),
  })
  return spins
}

export const findTopWins = async () => {
    const topSpins = await db.query.gameSpins.findMany({
        orderBy: [desc(gameSpins.grossWinAmount)],
        limit: 40,
    });
    return topSpins;
};

export const findSpinById = async (id: string, userId: string) => {
    return await db.query.gameSpins.findFirst({
        where: and(eq(gameSpins.id, id), eq(gameSpins.userId, userId)),
    });
};
export const findSpins = async () => {
    return await db.query.gameSpins.findMany();
};

export const updateSpin = async (id: string, data: Partial<z.infer<typeof insertGameSpinsSchema>>, userId: string) => {
    const [updatedSpin] = await db
        .update(gameSpins)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(gameSpins.id, id), eq(gameSpins.userId, userId)))
        .returning();

    return updatedSpin || null;
};

export const deleteSpin = async (id: string, userId: string) => {
    const result = await db
        .delete(gameSpins)
        .where(and(eq(gameSpins.id, id), eq(gameSpins.userId, userId)));
        
    return result.rowCount > 0;
};


export const findUserGameSpins = async (userId: string, params: { page: number, limit: number }) => {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const offset = (page - 1) * limit;

        const userGameIdsQuery = db
            .select({ id: gameSpins.gameId })
            .from(gameSpins)
            .where(eq(gameSpins.userId, userId));
            
        const userGameIds = await userGameIdsQuery;
        if (userGameIds.length === 0) return { games: [], total: 0 };

        const gameIds = userGameIds.map(f => f.id);
        
        const favGames = await db.query.gameSpins.findMany({
            where: inArray(games.id, gameIds),
            limit,
            offset,
        });
        return { games: favGames, total: gameIds.length };
 
}
