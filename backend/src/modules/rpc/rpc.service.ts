import { db } from '#/db';
import { wallets } from '#/db/schema';
import { eq } from 'drizzle-orm';
import * as gameSpinsService from '../gamespins/gameSpins.service';

export const handleGameRequest = async (
  userId: string,
  sessionId: string,
  gameName: string,
  requestBody: unknown,
  user: unknown
) => {
  const wagerAmount = requestBody.stake?.cash || 1;
  const winAmount = Math.random() > 0.5 ? wagerAmount * Math.floor(Math.random() * 10) : 0;

  const [userWallet] = await db.select().from(wallets).where(eq(wallets.userId, userId));
  if (!userWallet) {
    throw new Error('Wallet not found');
  }

  const newBalance = userWallet.balance - wagerAmount + winAmount;
  await db.update(wallets).set({ balance: newBalance }).where(eq(wallets.userId, userId));

  await gameSpinsService.createSpin({
      gameName,
      wagerAmount,
      grossWinAmount: winAmount,
      sessionId,
      userId,
      playerName: user?.username,
      spinData: { body: requestBody },
  });

  return {
    balance: {
      cash: newBalance,
    },
    wins: {
      totalWin: winAmount,
    },
    nextAction: 'spin',
  };
};
