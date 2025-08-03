import configureOpenAPI from '#/lib/configure-open-api'
import createApp from '#/lib/create-app'
import auth from '#/routes/auth/auth.router'
import index from '#/routes/index.route'
import updates from '#/routes/updates/updates.router'
import users from '#/routes/user/user.router'
import redtiger from '#/routes/redtiger/redtiger.router'
import { cors } from 'hono/cors'

const app = createApp()
app.use(
    '*',
    cors({
        origin: [
            'http://localhost',
            'http://localhost:5173',
            'http://localhost:9999',
            'http://localhost:3001',
            'http://localhost:3000',
            'https://slots.cashflowcasino.com', // Add the game's origin
        ],
        allowHeaders: [
            'X-Custom-Header',
            'Authorization',
            'Content-Type',
            'Upgrade-Insecure-Requests',
        ],
        allowMethods: ['POST', 'GET', 'OPTIONS'],
        exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
        maxAge: 600,
        credentials: true,
    })
)
configureOpenAPI(app)

const routes = [
    auth,
    index,
    updates,
    users,
    redtiger,
] as const

routes.forEach((route) => {
    app.route('/', route)
})

export type AppType = (typeof routes)[number]

export default app