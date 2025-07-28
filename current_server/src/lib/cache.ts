import { createStorage, prefixStorage } from 'unstorage'
import chalk from 'chalk'

import type { AuthSessionType, GameSessionType, GameSpinType } from '#/db/schema'

const storage = createStorage()

const authSessionCache = prefixStorage<AuthSessionType>(storage, 'sessions:auth')
const gameSessionCache = prefixStorage<GameSessionType>(storage, 'sessions:game')
const spinCache = prefixStorage<GameSpinType[]>(storage, 'spins')

export async function getAuthSessionFromCache(
    authSessionId: string
): Promise<AuthSessionType | null> {
    const item = await authSessionCache.getItem(authSessionId)
    return item ? JSON.parse(JSON.stringify(item)) : null
}

export async function saveAuthSessionToCache(
    session: AuthSessionType
): Promise<void> {
    console.log(chalk.blue(`Saving auth session ${session.id} to cache.`))
    await authSessionCache.setItem(session.id, session)
}

export async function deleteAuthSessionFromCache(
    authSessionId: string
): Promise<void> {
    console.log(chalk.blue(`Deleting auth session ${authSessionId} from cache.`))
    await authSessionCache.removeItem(authSessionId)
}

export async function getGameSessionFromCache(
    sessionId: string
): Promise<GameSessionType | null> {
    const item = await gameSessionCache.getItem(sessionId)
    return item ? JSON.parse(JSON.stringify(item)) : null
}

export async function saveGameSessionToCache(
    session: GameSessionType
): Promise<void> {
    console.log(chalk.blue(`Saving game session ${session.id} to cache.`))
    await gameSessionCache.setItem(session.id, session)
}

export async function deleteGameSessionFromCache(
    sessionId: string
): Promise<void> {
    console.log(chalk.blue(`Deleting game session ${sessionId} from cache.`))
    await gameSessionCache.removeItem(sessionId)
}

export async function getSpinsFromCache(
    sessionId: string
): Promise<GameSpinType[]> {
    return (await spinCache.getItem(sessionId)) || []
}

export async function addSpinToCache(
    sessionId: string,
    spin: GameSpinType
): Promise<void> {
    const spins = await getSpinsFromCache(sessionId)
    spins.push(spin)
    await spinCache.setItem(sessionId, spins)
}

export async function deleteSpinsFromCache(sessionId: string): Promise<void> {
    await spinCache.removeItem(sessionId)
}
