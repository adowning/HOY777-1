// src/middlewares/session.middleware.ts
import type { Context, Next } from 'hono'

import { SessionManager } from '#/lib/session.manager'
import chalk from 'chalk'

export async function sessionMiddleware(c: Context, next: Next) {
    console.log(chalk.cyan('--- Session Middleware Start ---'))

    const user = c.get('user')
    if (!user) {
        console.log(chalk.red('Error: User not found in context.'))
        return c.json({ error: 'User not authenticated' }, 401)
    }

    // Only check for a game session on routes that require it, like /spin
    console.log(c.req.url)
    if (c.req.url.includes('/game/spin')) {
        const sessionId = user.currentGameSessionDataId
        console.log(sessionId)
        if (!sessionId) {
            console.log(
                chalk.red(
                    'Error: No current game session ID found on user object.'
                )
            )
            return c.json({ message: 'no gameSession' }, 404)
        }

        // console.log(chalk.blue(`Found game session ID on user: ${sessionId}`))
        const gameSession = await SessionManager.getGameSession(sessionId)

        if (!gameSession) {
            console.log(
                chalk.red(`Error: Game session not found for ID: ${sessionId}`)
            )
            return c.json({ message: 'no gameSession' }, 404)
        }
        c.set('gameSession', gameSession)
    }

    console.log(chalk.cyan('--- Session Middleware End ---'))
    await next()
}
