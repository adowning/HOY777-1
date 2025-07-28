import { db } from './db';
import { gameBigWins } from './db/schema/games';

async function insertTestWin() {
  const newWin = {
    gameId: 'test-game',
    gameName: 'Test Game',
    gameIcon: 'test-icon',
    userName: 'test-user',
    userVipGroup: 1,
    userVipLevel: 1,
    betAmount: '10',
    multiplier: '100',
    winAmount: '1000',
    time: Math.floor(Date.now() / 1000),
  };

  try {
    await db.insert(gameBigWins).values(newWin);
    console.log('Inserted new big win:', newWin);
  } catch (error) {
    console.error('Error inserting new big win:', error);
  }
}

insertTestWin();
