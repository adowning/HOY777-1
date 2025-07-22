
import { z } from 'zod';
import type { Context } from 'hono';
import chalk from 'chalk';
import { and, desc, eq, inArray } from 'drizzle-orm';
import { db } from '#/db';
import * as schema from '#/db/schema';
import { jackpots, jackpotContributions, jackpotWins, transactions, wallets, gameSpins } from '#/db/schema';
import { canWinJackpot, checkJackpotWin, getEligibleJackpots, calculateContribution, generateRandomSeedAmount, JACKPOT_CONFIG } from './jackpot.utils';
import { createJackpotSchema, updateJackpotSchema } from './gameplay.schema';
import { coinsToDollars } from '#/utils/misc.utils';
import type { Env } from '#/lib/types';


// Define types inferred from Zod schemas for input validation
type CreateJackpotInput = z.infer<typeof createJackpotSchema>;
type UpdateJackpotInput = z.infer<typeof updateJackpotSchema>;

/**
 * Finds multiple Jackpot records.
 * @param c The Hono context.
 * @returns A promise resolving to an array of Jackpot records.
 */
export const findManyJackpot = async (): Promise<schema.Jackpot[]> => {
    try {
        return await db.select().from(jackpots);
    } catch (error) {
        console.error('Error fetching Jackpots:', error);
        throw new Error('Could not fetch Jackpots');
    }
};

/**
 * Creates a new Jackpot record.
 * @param c The Hono context.
 * @param data The data for the new Jackpot.
 * @returns A promise resolving to the created Jackpot record.
 */
export const createJackpot = async (
    c: Context<Env>,
    data: CreateJackpotInput
): Promise<schema.Jackpot> => {
    try {
        const [newJackpot] = await db.insert(jackpots).values(data).returning();
        return newJackpot;
    } catch (error) {
        console.error('Error creating Jackpot:', error);
        throw new Error('Could not create Jackpot');
    }
};

/**
 * Finds a single Jackpot record by its ID.
 * @param c The Hono context.
 * @param id The ID of the Jackpot to find.
 * @returns A promise resolving to the Jackpot record or null if not found.
 */
export const findJackpotById = async (
    c: Context<Env>,
    id: string
): Promise<schema.Jackpot | undefined> => {
    try {
        const [jackpot] = await db.select().from(jackpots).where(eq(jackpots.id, id));
        return jackpot;
    } catch (error) {
        console.error(`Error fetching Jackpot by ID ${id}:`, error);
        throw new Error('Could not fetch Jackpot by ID');
    }
};

/**
 * Updates a Jackpot record by its ID.
 * @param c The Hono context.
 * @param id The ID of the Jackpot to update.
 * @param data The data to update the Jackpot with.
 * @returns A promise resolving to the updated Jackpot record.
 */
export const updateJackpot = async (
    c: Context<Env>,
    id: string,
    data: UpdateJackpotInput
): Promise<schema.Jackpot> => {
    try {
        const [updatedJackpot] = await db.update(jackpots).set(data).where(eq(jackpots.id, id)).returning();
        return updatedJackpot;
    } catch (error) {
        console.error(`Error updating Jackpot ${id}:`, error);
        throw new Error('Could not update Jackpot');
    }
};

/**
 * Deletes a Jackpot record by its ID.
 * @param c The Hono context.
 * @param id The ID of the Jackpot to delete.
 * @returns A promise resolving to the deleted Jackpot record.
 */
export const deleteJackpot = async (
    c: Context<Env>,
    id: string
): Promise<schema.Jackpot> => {
    try {
        const [deletedJackpot] = await db.delete(jackpots).where(eq(jackpots.id, id)).returning();
        return deletedJackpot;
    } catch (error) {
        console.error(`Error deleting Jackpot ${id}:`, error);
        throw new Error('Could not delete Jackpot');
    }
};

export const initializeJackpots = async (): Promise<void> => {
    const existingJackpotsCount = await db.select({ count: '*' }).from(jackpots);

    if (existingJackpotsCount.length === 0) {
        console.log(chalk.yellow('Initializing jackpots...'));
        const jackpotData = Object.values(JACKPOT_CONFIG).map(config => ({
            type: config.type,
            currentAmountCoins: config.seedAmountCoins,
            seedAmountCoins: config.seedAmountCoins,
            minimumBetCoins: config.minimumBetCoins,
            contributionRateBasisPoints: config.contributionRateBasisPoints,
            probabilityPerMillion: config.probabilityPerMillion,
            minimumTimeBetweenWinsMinutes: config.minimumTimeBetweenWinsMinutes,
            isActive: true,
        }));

        await db.insert(jackpots).values(jackpotData);
        console.log('Jackpots initialized successfully.');
    }
};

export interface AsyncJackpotProcessingRequest {
    gameSpinId: string;
    userId: string;
    wagerAmountCoins: number;
    gameCategory: string;
}


interface JackpotContribution {
    jackpotType: string;
    contributionAmountCoins: number;
}

interface JackpotWin {
    id: string;
    jackpotType: string;
    winAmountCoins: number;
    gameSpinId: string;
}

export const processJackpots = async (c: Context<Env>, request: AsyncJackpotProcessingRequest) => {
    const { gameSpinId, userId, wagerAmountCoins, gameCategory } = request;
    console.log(chalk.yellow('Processing jackpots for spin:', gameSpinId));

    if (gameCategory !== 'SLOTS') {
        return { contributions: [] };
    }

    const eligibleJackpotTypes = getEligibleJackpots(wagerAmountCoins);
    if (eligibleJackpotTypes.length === 0) {
        return { contributions: [] };
    }

    const activeJackpots = await db.select().from(jackpots).where(and(inArray(jackpots.type, eligibleJackpotTypes), eq(jackpots.isActive, true)));

    if (activeJackpots.length === 0) {
        return { contributions: [] };
    }

    return db.transaction(async (tx) => {
        const contributions: JackpotContribution[] = [];
        let jackpotWin: JackpotWin | null = null;

        for (const jackpot of activeJackpots) {
            const config = JACKPOT_CONFIG[jackpot.type as keyof typeof JACKPOT_CONFIG];
            if (!config) continue;

            const contributionAmount = calculateContribution(wagerAmountCoins, config.contributionRateBasisPoints);

            if (contributionAmount > 0) {
                await tx.insert(jackpotContributions).values({
                    jackpotId: jackpot.id,
                    gameSpinId: gameSpinId,
                    contributionAmountCoins: contributionAmount,
                });

                const [updatedJackpot] = await tx.update(jackpots).set({
                    currentAmountCoins: jackpot.currentAmountCoins + contributionAmount,
                }).where(eq(jackpots.id, jackpot.id)).returning();

                contributions.push({
                    jackpotType: jackpot.type,
                    contributionAmountCoins: contributionAmount,
                });

                if (!jackpotWin && canWinJackpot(jackpot.lastWonAt, config.minimumTimeBetweenWinsMinutes) && checkJackpotWin(config.probabilityPerMillion)) {
                    const winAmount = updatedJackpot.currentAmountCoins;
                    const newSeedAmount = generateRandomSeedAmount(jackpot.seedAmountCoins);

                    await tx.update(jackpots).set({
                        currentAmountCoins: newSeedAmount,
                        lastWonAt: new Date(),
                        lastWonBy: userId,
                    }).where(eq(jackpots.id, jackpot.id));

                    const [win] = await tx.insert(jackpotWins).values({
                        jackpotId: jackpot.id,
                        winnerId: userId,
                        winAmountCoins: winAmount,
                        gameSpinId: gameSpinId,
                    }).returning();

                    jackpotWin = {
                        id: win.id,
                        jackpotType: jackpot.type,
                        winAmountCoins: winAmount,
                        gameSpinId: gameSpinId,
                    };
                }
            }
        }
        return { contributions, jackpotWin };
    });
};

export const getJackpotStats = async () => {
    console.log(chalk.yellow('Getting jackpot stats'));
    const allJackpots = await db.query.jackpots.findMany({
        where: eq(jackpots.isActive, true),
        with: {
            lastWinner: {
                columns: {
                    username: true
                }
            }
        },
    });

    const totalPoolCoins = allJackpots.reduce((sum, j) => sum + j.currentAmountCoins, 0);

    return {
        totalPoolCoins,
        totalPoolDollars: coinsToDollars(totalPoolCoins),
        jackpots: allJackpots.map(j => ({
            type: j.type,
            currentAmountCoins: j.currentAmountCoins,
            currentAmountDollars: coinsToDollars(j.currentAmountCoins),
            lastWonAt: j.lastWonAt,
            lastWinnerUsername: j.lastWinner?.username || null,
        })),
    };
};


interface RecentJackpotWin {
    jackpot: {
        type: string;
    };
    winner: {
        username: string | null;
        avatar: string | null;
    };
}

export const getRecentJackpotWins = async (c: Context<Env>, limit: number = 10): Promise<RecentJackpotWin[]> => {
    console.log(chalk.yellow('Getting recent jackpot wins'));
    return await db.query.jackpotWins.findMany({
        limit,
        orderBy: [desc(jackpotWins.createdAt)],
        with: {
            jackpot: {
                columns: {
                    type: true
                }
            },
            winner: {
                columns: {
                    username: true,
                    avatar: true,
                }
            }
        }
    })
};

export const getUserJackpotContributions = async (c: Context<Env>, userId: string, limit: number = 50): Promise<schema.JackpotContribution[]> => {
    console.log(chalk.yellow('Getting user jackpot contributions for user:', userId));
    const contributions = await db
        .select({
            id: jackpotContributions.id,
            jackpotId: jackpotContributions.jackpotId,
            gameSpinId: jackpotContributions.gameSpinId,
            contributionAmountCoins: jackpotContributions.contributionAmountCoins,
            createdAt: jackpotContributions.createdAt,
        })
        .from(jackpotContributions)
        .innerJoin(gameSpins, eq(jackpotContributions.gameSpinId, gameSpins.id))
        .where(eq(gameSpins.userId, userId))
        .orderBy(desc(jackpotContributions.createdAt))
        .limit(limit);

    return contributions;
};

export const getUserJackpotWins = async (c: Context<Env>, userId: string): Promise<schema.JackpotWin[]> => {
    console.log(chalk.yellow('Getting user jackpot wins for user:', userId));
    return await db.select().from(jackpotWins).where(eq(jackpotWins.winnerId, userId)).orderBy(desc(jackpotWins.createdAt));
};

export const getJackpotById = async (c: Context<Env>, id: string): Promise<schema.Jackpot | undefined> => {
    console.log(chalk.yellow('Getting jackpot by id:', id));
    const [jackpot] = await db.query.jackpots.findMany({
        where: eq(jackpots.id, id),
        with: {
            lastWinner: {
                columns: {
                    username: true,
                    avatar: true,
                }
            }
        }
    });
    return jackpot;
};

interface JackpotWinParams {
    userId: string;
    gameId: string;
    amount: number;
    jackpotType: string;
    walletId: string;
}

/**
 * Handles jackpot wins by creating transactions and updating the wallet
 */
export async function handleJackpotWin({
    userId,
    gameId,
    amount,
    jackpotType,
    walletId
}: JackpotWinParams) {
    if (!amount || amount <= 0) {
        throw new Error('Invalid jackpot amount');
    }

    return await db.transaction(async (tx) => {
        const [wallet] = await tx.select({ balance: wallets.balance }).from(wallets).where(eq(wallets.id, walletId));

        if (!wallet) {
            throw new Error('Wallet not found');
        }

        const newBalance = wallet.balance + amount;

        await tx.insert(transactions).values({
            type: 'JACKPOT_WIN',
            amount,
            userProfileId: userId,
            walletId,
            relatedGameId: gameId,
            description: `${jackpotType.toUpperCase()} Jackpot Win`,
            balanceBefore: wallet.balance,
            balanceAfter: newBalance,
        });

        await tx.update(wallets).set({ balance: newBalance }).where(eq(wallets.id, walletId));

        console.log(`Jackpot win processed: ${amount} for user ${userId}`);

        return { success: true, newBalance };
    });
}