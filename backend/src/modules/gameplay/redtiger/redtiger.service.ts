import { eq, and } from 'drizzle-orm';
import { db } from '#/db';
import { gameSessions, Jackpot } from '#/db/schema';
import type { Context } from 'hono';
import type { GameSession, InsertGameSpin, User, RTGSettingsRequestDto, RTGSettingsResponseDto, RTGSpinRequestDto, RTGSpinResponseDto, ProviderSpinResponseData } from '#/db';
import { atlantis_settings, atlantis_spin } from './data';
import { handleGameSpin } from '../gameplay.service';
import { dollarsToCoins, coinsToDollars } from '#/utils/misc.utils';
import { processJackpots } from '../jackpot.service';
import type { JackpotType } from '#/lib/constants';

async function getGameSessionById(_c: Context, gameSessionId: string): Promise<GameSession | null> {
    const [session] = await db.select().from(gameSessions).where(eq(gameSessions.id, gameSessionId));
    return session || null;
}

export const createRedtigerSettings = async (
    c: Context,
    data: RTGSettingsRequestDto
): Promise<RTGSettingsResponseDto> => {
    try {
        const user = c.get('user') as User;
        if (!user) {
            throw new Error('User not authenticated.');
        }

        const { gameSessionId, gameName } = data;
        if (!gameSessionId || !gameName) {
            throw new Error('gameSessionId and gameName are required.');
        }

        const gameSession = await getGameSessionById(c, gameSessionId);
        if (!gameSession) {
            throw new Error('Game session not found.');
        }

        const gameSettingsFromDeveloper: RTGSettingsResponseDto = atlantis_settings;
        gameSettingsFromDeveloper.result!.user.balance.cash = (user.balance / 100).toFixed(2);

        return gameSettingsFromDeveloper;
    } catch (error) {
        console.error('Error creating Redtiger settings:', error);
        throw new Error('Could not create Redtiger settings');
    }
};

export const createRedtigerSpin = async (
    c: Context,
    data: RTGSpinRequestDto
): Promise<RTGSpinResponseDto> => {
    try {
        const user = c.get('user') as User;
        if (!user) {
            throw new Error('User not authenticated.');
        }

        const { gameSessionId } = data;
        if (!gameSessionId) {
            throw new Error('gameSessionId is required.');
        }

        const session = await getGameSessionById(c, gameSessionId);
        if (!session) {
            throw new Error('Game session not found');
        }

        const gameResultFromDeveloper: RTGSpinResponseDto = atlantis_spin;

        if (!gameResultFromDeveloper.success) {
            return gameResultFromDeveloper;
        }

        const spinData: InsertGameSpin = {
            gameSessionId: gameSessionId,
            spinData: gameResultFromDeveloper as unknown,
            userId: user.id,
            wagerAmount: dollarsToCoins(parseFloat(gameResultFromDeveloper.result!.game.stake)),
            grossWinAmount: dollarsToCoins(parseFloat(gameResultFromDeveloper.result!.game.win.total)),
            gameName: data.gameName,
        };

        const gameSpin = await handleGameSpin(c, spinData, {
            totalSpinWinnings: spinData.grossWinAmount!,
            wagerAmount: spinData.wagerAmount!,
        });

        const jackpotResult = await processJackpots(c, {
            gameSpinId: gameSpin.id as string,
            wagerAmountCoins: spinData.wagerAmount as number,
            gameCategory: 'SLOTS',
            userId: user.id,
        });

        const enhancedResponse = await enhanceRTGResponseWithJackpots(
            gameResultFromDeveloper.result as ProviderSpinResponseData,
            jackpotResult
        );
        
        gameResultFromDeveloper.result = enhancedResponse;

        return gameResultFromDeveloper;
    } catch (error) {
        console.error('Error creating Redtiger spin:', error);
        throw new Error('Could not create Redtiger spin');
    }
};

async function enhanceRTGResponseWithJackpots(
    originalResponse: ProviderSpinResponseData,
    jackpotResult: { contributions: { jackpotType: string; contributionAmountCoins: number; }[]; jackpotWin: { id: string; jackpotType: string; winAmountCoins: number; } | null; }
): Promise<ProviderSpinResponseData> {
    const enhancedResponse = { ...originalResponse };

    if (jackpotResult?.contributions?.length > 0) {
        enhancedResponse.jackpots = {
            contributions: jackpotResult.contributions.map((contrib: { jackpotType: string; contributionAmountCoins: number; }) => ({
                type: contrib.jackpotType,
                amount: coinsToDollars(contrib.contributionAmountCoins),
                amountCoins: contrib.contributionAmountCoins,
            })),
            totalContribution: coinsToDollars(
                jackpotResult.contributions.reduce((acc: number, contrib: { contributionAmountCoins: number; }) => acc + contrib.contributionAmountCoins, 0)
            ),
        };
    }

    if (jackpotResult?.jackpotWin) {
        const jackpotWin = jackpotResult.jackpotWin;

        enhancedResponse.jackpots = {
            ...enhancedResponse.jackpots,
            type: jackpotWin.jackpotType,
            amount: coinsToDollars(jackpotWin.winAmountCoins),
            amountCoins: jackpotWin.winAmountCoins,
            winId: jackpotWin.id,
        };

        if (enhancedResponse.user?.balance?.cash?.atEnd) {
            const currentBalance = parseFloat(enhancedResponse.user.balance.cash.atEnd);
            const newBalance = currentBalance + coinsToDollars(jackpotWin.winAmountCoins);
            enhancedResponse.user.balance.cash.atEnd = newBalance.toFixed(2);
        }

        if (enhancedResponse.game?.win?.total) {
            const currentWin = parseFloat(enhancedResponse.game.win.total);
            const newWin = currentWin + coinsToDollars(jackpotWin.winAmountCoins);
            enhancedResponse.game.win.total = newWin.toFixed(2);
        }
    }

    const eligibleTypes: JackpotType[] = ['MAJOR', 'MINOR', 'GRAND'];
    const currentJackpots = await db.query.jackpots.findMany({
        where: (jackpots, { inArray, eq }) => and(inArray(jackpots.type, eligibleTypes), eq(jackpots.isActive, true)),
    });

    (enhancedResponse as ProviderSpinResponseData & { currentJackpots: unknown[] }).currentJackpots = currentJackpots.map((jackpot: Jackpot) => ({
        type: jackpot.type,
        amount: coinsToDollars(jackpot.currentAmountCoins),
        amountCoins: jackpot.currentAmountCoins,
    }));

    return enhancedResponse;
}