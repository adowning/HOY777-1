import { KeyValueStore, SqliteAdapter } from '@bnk/kv-store';
import type { Context } from 'hono';
import type { GameSpin as GameSpinType, SessionData } from '../db/schema';
// It's recommended to move these shared types to a central file (e.g., `src/modules/session/types.ts`)
const adapter = new SqliteAdapter({ path: 'sessions.db', tableName: 'sessions' });

// --- SETUP ---

// Instantiate the cache store. This singleton instance will be used by all functions in this service.
const cache = new KeyValueStore({adapter});
const SPINS_PREFIX = 'spins:'; // Prefix for keys that store an array of spins for a session.

// --- SESSION CACHE FUNCTIONS ---

/**
 * Retrieves a session from the in-memory cache by its ID.
 * @param sessionId The ID of the session to retrieve.
 * @returns A promise that resolves to the session data or null if not found.
 */
export const getSessionFromCache =  (sessionId: string):SessionData | null => {
  let data
  if(typeof sessionId == 'string')
   data = cache.get<SessionData>(sessionId);
  if (!data) {
    return null;
  }
  // Re-hydrate Date objects that may have been stringified if a different cache store were used.
  // if (data.createdAt) data.createdAt = new Date(data.createdAt);
  // if (data.updatedAt) data.updatedAt = new Date(data.updatedAt);
  return data;
};
// export const getOrCreateSessionFromCache = async (sessionId: string): Promise<SessionData | null> => {
//   let data = cache.get<SessionData>(sessionId);
//   if (!data) {
//     data =  saveSessionToCache(sessionId) as SessionData;
//   }
//   // Re-hydrate Date objects that may have been stringified if a different cache store were used.
//   if (data.createdAt) data.createdAt = new Date(data.createdAt);
//   if (data.updatedAt) data.updatedAt = new Date(data.updatedAt);
//   return data;
// };
/**
 * Saves a session object to the in-memory cache and updates the Hono context.
 * @param session The session object to save.
 * @param c The Hono context, which will also be updated with the session.
 */
export const saveSessionToCache = async (session: SessionData, c: Context): Promise<void> => {
  cache.set(session.id, session);
  c.set('session', session); // Keep the context in sync with the cache for the current request.
};

/**
 * Deletes a session from the cache.
 * @param sessionId The ID of the session to delete.
 */
export const deleteSessionFromCache = async (sessionId: string): Promise<void> => {
  cache.delete(sessionId);
};


// --- SPIN CACHE FUNCTIONS ---

/**
 * Retrieves the list of spins for a given session from the cache.
 * @param sessionId The ID of the session.
 * @returns A promise that resolves to an array of spin objects, or an empty array if none are found.
 */
export const getSpinsFromCache = async (sessionId: string): Promise<Partial<GameSpinType>[]> => {
  const spinsKey = `${SPINS_PREFIX}${sessionId}`;
  return (cache.get(spinsKey) as Partial<GameSpinType>[]) || [];
};

/**
 * Adds a new spin to a session's list of spins in the cache.
 * @param sessionId The ID of the session to add the spin to.
 * @param spin The spin object to add.
 */
export const addSpinToCache = async (sessionId: string, spin: Partial<GameSpinType>): Promise<void> => {
  const spinsKey = `${SPINS_PREFIX}${sessionId}`;
  const spins = await getSpinsFromCache(sessionId);
  spins.push(spin);
  cache.set(spinsKey, spins);
};

/**
 * Deletes the list of spins for a session from the cache.
 * @param sessionId The ID of the session whose spins should be deleted.
 */
export const deleteSpinsFromCache = async (sessionId: string): Promise<void> => {
  const spinsKey = `${SPINS_PREFIX}${sessionId}`;
  cache.delete(spinsKey);
};
