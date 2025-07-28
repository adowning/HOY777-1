import type { Context } from 'hono';
import type { GameSpin, GameSession, InsertGameSpin, User } from '#/db';
import { saveGameSessionToCache, addSpinToCache } from '#/lib/cache';
import chalk from 'chalk';

export interface SpinParams {
  totalSpinWinnings: number;
  wagerAmount: number;
}

export const handleGameSpin = async (
  c: Context,
  spinInput: InsertGameSpin,
  spinParams: SpinParams
): Promise<Partial<GameSpin>> => {
  const user = c.get('user') as User;
  const gameSession = c.get('gameSession') as GameSession;

  if (!user || !gameSession) {
    throw new Error("handleGameSpin requires an active game session and authenticated user in the context.");
  }
  console.log(chalk.bgCyan(`Handling game spin for user: ${user.id} in session: ${gameSession.id}`));

  const { totalSpinWinnings, wagerAmount } = spinParams;

  const xpEarned = Math.floor(wagerAmount);
  if (xpEarned > 0) {
    gameSession.totalXpGained = (gameSession.totalXpGained || 0) + xpEarned;
    console.log(chalk.yellow(`User ${user.id} earned ${xpEarned} XP. Session total: ${gameSession.totalXpGained}`));
  }

  gameSession.totalWagered = (gameSession.totalWagered || 0) + wagerAmount;
  gameSession.totalWon = (gameSession.totalWon || 0) + totalSpinWinnings;

  await saveGameSessionToCache(gameSession, c);

  const newSpin: Partial<GameSpin> = {
    spinData: spinInput.spinData as unknown,
    id: new Date().getTime().toString(),
    wagerAmount: wagerAmount,
    grossWinAmount: totalSpinWinnings,
    sessionId: gameSession.id,
    userId: user.id,
    playerName: user.username,
    gameName: spinInput.gameName,
    createdAt: new Date(),
  };

  await addSpinToCache(gameSession.id, newSpin);

  return newSpin;
};
