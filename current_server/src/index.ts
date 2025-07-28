import type { Server } from 'bun'

import { and, eq } from 'drizzle-orm'
import * as jose from 'jose'

import app from './app'
import db from './db'
import { AuthSession, User } from './db/schema'
import env from './env'
import { websocketHandler } from './routes/websocket/websocket.handler'

const port = env.PORT

console.log(`Server is running on http://localhost:${port}`)

// Assign the server instance to a constant
const server: Server = Bun.serve({
    port,
    async fetch(req, server) {
        const url = new URL(req.url)
        const match = /^\/ws\/(?<topic>\w+)$/.exec(url.pathname)

        if (match) {
            const topic = match.groups?.topic as keyof typeof websocketHandler
            const token = url.searchParams.get('token')

            if (!token) {
                console.error(chalk.red('[WS Auth] No token provided.'))
                return new Response('Unauthorized: No token provided', {
                    status: 401,
                })
            }

            try {
                const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
                const { payload } = await jose.jwtVerify(token, secret)

                if (!payload.userId || !payload.sessionId) {
                    console.error(
                        chalk.red('[WS Auth] Invalid token payload.')
                    )
                    return new Response('Unauthorized: Invalid token payload', {
                        status: 401,
                    })
                }

                const authSession = await db.query.AuthSession.findFirst({
                    where: and(
                        eq(AuthSession.id, payload.sessionId as string),
                        eq(AuthSession.status, 'ACTIVE')
                    ),
                })

                if (!authSession) {
                    console.error(
                        chalk.red(
                            `[WS Auth] Session not found or expired for session ID: ${payload.sessionId}`
                        )
                    )
                    return new Response(
                        'Unauthorized: Session not found or has expired',
                        { status: 401 }
                    )
                }

                const user = await db.query.User.findFirst({
                    where: eq(User.id, payload.userId as string),
                })

                if (!user) {
                    console.error(
                        chalk.red(
                            `[WS Auth] User not found for user ID: ${payload.userId}`
                        )
                    )
                    return new Response('Unauthorized: User not found', {
                        status: 401,
                    })
                }

                // If all checks pass, upgrade the connection.
                if (
                    server.upgrade(req, { data: { user, authSession, topic } })
                ) {
                    console.log(
                        chalk.green(
                            `[WS Auth] Successful upgrade for user ${user.username} on topic '${topic}'`
                        )
                    )
                    return // Bun handles the response after a successful upgrade.
                }

                // This should not be reached if upgrade is successful.
                return new Response('WebSocket upgrade failed', { status: 500 })
            } catch (error: any) {
                console.error(
                    chalk.red('[WS Auth] Token verification failed:'),
                    error.message
                )
                return new Response(`Unauthorized: ${error.message}`, {
                    status: 401,
                })
            }
        }

        // Fallback to Hono for all non-WebSocket requests.
        return app.fetch(req, server)
    },
    websocket: websocketHandler,
    error() {
        return new Response('Uh oh!!', { status: 500 })
    },
})

// Export the server instance
export { server }
