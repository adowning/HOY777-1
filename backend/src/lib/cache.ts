import { KeyValueStore, SqliteAdapter } from '@bnk/kv-store';
import type { Context } from 'hono';
import type { GameSpin, GameSession } from '../db/schema';

const adapter = new SqliteAdapter({ path: 'sessions.db', tableName: 'sessions' });
const cache = new KeyValueStore({adapter});
const SPINS_PREFIX = 'spins:';

const normalizeCacheResult = <T>(data: any): T => {
  if (Array.isArray(data)) {
    return data.map(item => normalizeCacheResult(item)) as T;
  }
  if (typeof data === 'object' && data !== null) {
    const normalizedData: { [key: string]: any } = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (Array.isArray(data[key])) {
          normalizedData[key] = data[key][0];
        } else {
          normalizedData[key] = data[key];
        }
      }
    }
    return normalizedData as T;
  }
  return data as T;
};

export const getGameSessionFromCache = (sessionId: string): GameSession | null => {
  const data = cache.get<any>(sessionId);
  if (!data) {
    return null;
  }
  const normalizedData = normalizeCacheResult<GameSession>(data);
  // The session ID MUST be a string. If it's corrupted, use the key we used to fetch it.
  if (typeof normalizedData.id !== 'string' || !normalizedData.id) {
    normalizedData.id = sessionId;
  }
  return normalizedData;
};

export const saveGameSessionToCache = async (session: GameSession, c: Context): Promise<void> => {
  cache.set(session.id, session);
  c.set('gameSession', session);
};

export const deleteGameSessionFromCache = async (sessionId: string): Promise<void> => {
  cache.delete(sessionId);
};

export const getSpinsFromCache = async (sessionId: string): Promise<Partial<GameSpin>[]> => {
  const spinsKey = `${SPINS_PREFIX}${sessionId}`;
  const spins = cache.get<Partial<GameSpin>[]>(spinsKey) || [];
  return normalizeCacheResult(spins);
};

export const addSpinToCache = async (sessionId: string, spin: Partial<GameSpin>): Promise<void> => {
  const spinsKey = `${SPINS_PREFIX}${sessionId}`;
  const spins = await getSpinsFromCache(sessionId);
  spins.push(spin);
  cache.set(spinsKey, spins);
};

export const deleteSpinsFromCache = async (sessionId: string): Promise<void> => {
  const spinsKey = `${SPINS_PREFIX}${sessionId}`;
  cache.delete(spinsKey);
};
