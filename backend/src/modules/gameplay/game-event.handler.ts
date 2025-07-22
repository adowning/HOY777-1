import type { Context } from 'hono';
import { db } from '#/db';
import { games, users, vipInfos } from '#/db/schema';
import { eq } from 'drizzle-orm';
import { getXPForLevel, processXpGains, getXPProgress } from '../vip/viplevel/viplevel.service';
import type { WebSocketRouter } from '../socket.router';
import { AppEvents, typedAppEventEmitter } from '#/lib/events';
import type { User } from '#/db';

export class GameEventHandler {
    private wsRouter: WebSocketRouter;

    constructor(wsRouter: WebSocketRouter) {
        this.wsRouter = wsRouter;
    }

    private async getGameId(gameName: string): Promise<string | null> {
        const [game] = await db.select({ id: games.id }).from(games).where(eq(games.name, gameName)).limit(1);
        return game?.id || null;
    }

    private async getCurrentXP(userId: string): Promise<number> {
        const [vipInfo] = await db.select({ xp: vipInfos.xp }).from(vipInfos).where(eq(vipInfos.userId, userId)).limit(1);
        return vipInfo?.xp || 0;
    }

    private async getCurrentBalance(userId: string): Promise<number> {
        const [user] = await db.select({ balance: users.balance }).from(users).where(eq(users.id, userId)).limit(1);
        return user?.balance || 0;
    }

    public async handleGameSpin(c: Context, gameId: string, spinData: unknown): Promise<void> {
        const user = c.get('user') as User;
        if (!user) {
            console.error('No user found in context');
            return;
        }

        // Broadcast game spin event
        this.wsRouter.broadcastGameEvent(gameId, {
            type: 'game_spin',
            data: {
                gameId,
                userId: user.id,
                spinData,
                timestamp: new Date().toISOString()
            }
        });

        // Calculate XP gain based on bet amount
        const wagerAmount = spinData?.game?.stake || 0;
        const xpGain = wagerAmount * 0.1; // 10% of wager amount as XP

        // Process XP gains in a transaction
        await db.transaction(async (tx) => {
            await processXpGains(c, tx, user.id, xpGain);
        });

        // Broadcast XP update event
        const currentXP = await this.getCurrentXP(user.id);
        this.wsRouter.broadcastGameEvent(gameId, {
            type: 'xp_update',
            data: {
                userId: user.id,
                currentXP,
                nextLevelXP: getXPForLevel(getXPProgress(currentXP) + 1),
                timestamp: new Date().toISOString()
            }
        });
    }

    public async handleGameResult(c: Context, gameName: string, resultData: unknown): Promise<void> {
        // Get the game ID from the game name
        const gameId = await this.getGameId(gameName);
        if (!gameId) {
            console.error(`Game not found: ${gameName}`);
            return;
        }

        // Broadcast game result event via WebSocket
        this.wsRouter.broadcastGameEvent(gameId, {
            type: 'game_result',
            data: {
                gameName,
                resultData,
                timestamp: new Date().toISOString()
            }
        });

        // Process game result
        const { totalSpinWinnings } = resultData;
        if (totalSpinWinnings > 0) {
            const user = c.get('user') as User;
            if (user?.id) {
                // Emit game win event
                typedAppEventEmitter.emit(AppEvents.GAME_WIN, {
                    userId: user.id,
                    gameId,
                    amount: totalSpinWinnings,
                    timestamp: new Date().toISOString()
                });

                // Broadcast balance update via WebSocket
                this.wsRouter.broadcastGameEvent(gameId, {
                    type: 'balance_update',
                    data: {
                        userId: user.id,
                        amount: totalSpinWinnings,
                        balanceType: 'game',
                        timestamp: new Date().toISOString()
                    }
                });
            }
        }
    }
}

