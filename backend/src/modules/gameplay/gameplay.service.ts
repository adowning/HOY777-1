import type { Context } from 'hono';
import type { GameSpin, Session, InsertGameSpin, User } from '#/db';
import { saveSessionToCache, addSpinToCache } from '#/lib/cache';


// --- TYPE DEFINITIONS ---
// This interface defines the essential, parsed data from a spin needed by this service.
export interface SpinParams {
  totalSpinWinnings: number;
  wagerAmount: number;
}

/**
 * Handles the core logic for a single game spin. It updates the session state
 * entirely in-memory for maximum performance during gameplay.
 * @param c The Hono context, used to access the current user and session.
 * @param spinInput The raw data for the spin from the game provider.
 * @param spinParams The parsed wager and win amounts for the spin.
 * @returns A promise that resolves to the newly created (in-memory) spin object.
 */
export const handleGameSpin = async (
  c: Context,
  spinInput: InsertGameSpin,
  spinParams: SpinParams
): Promise<Partial<GameSpin>> => {
  const user = c.get('user') as User;
  const session = c.get('session') as Session;

  if (!user || !session) {
    throw new Error("handleGameSpin requires an active game session and authenticated user in the context.");
  }
  console.log(chalk.bgCyan(`Handling game spin for user: ${user.id} in session: ${session.id}`));

  const { totalSpinWinnings, wagerAmount } = spinParams;

  // 1. Accumulate XP in the in-memory session object.
  // This rule can be as simple or complex as needed (e.g., based on wager, win, or specific game events).
  const xpEarned = Math.floor(wagerAmount); // Example: 1 XP per unit wagered
  if (xpEarned > 0) {
    session.totalXpGained = (session.totalXpGained || 0) + xpEarned;
    console.log(chalk.yellow(`User ${user.id} earned ${xpEarned} XP. Session total: ${session.totalXpGained}`));
  }

  // 2. Accumulate wager and win totals directly in the session object.
  session.totalWagered = (session.totalWagered || 0) + wagerAmount;
  session.totalWon = (session.totalWon || 0) + totalSpinWinnings;

  // 3. Save the updated session state back to the cache via the CacheService.
  await saveSessionToCache(session, c);

  // 4. Create the spin object that will be temporarily stored in the cache.
  const newSpin: Partial<GameSpin> = {
    spinData: spinInput.spinData as unknown,
    id: new Date().getTime().toString(), // A temporary ID for the cache. The DB will generate the final one.
    wagerAmount: wagerAmount,
    grossWinAmount: totalSpinWinnings,
    sessionDataId: session.id,
    userId: user.id,
    playerName: user.username,
    gameName: spinInput.gameName,
    sessionId: session.id,
    createdAt: new Date(),
  };

  // 5. Add the new spin to this session's list of spins in the cache.
  await addSpinToCache(session.id, newSpin);

  return newSpin;
};
