import configureOpenAPI from './lib/configure-open-api'
import createApp from './lib/create-app'
import index from './modules/index.route'

import auth from './modules/auth/auth.router'
import games from './modules/games/games.router'
import user from './modules/user/user.router'
import updates from './modules/updates/updates.router'
import vipinfo from './modules/vip/vipinfo/vipinfo.router'
import gameSpins from './modules/gamespins/gamespins.router'
import monitoring from './modules/monitoring/monitoring.router'
import redtiger from './modules/gameplay/redtiger/routes'
import test from './modules/test/test.router'
import { cors } from "hono/cors";
import { serveStatic } from '@hono/node-server/serve-static'

const app = createApp()

app.use('/static/*', serveStatic({ root: './public' }))
app.use('/games/*', serveStatic({ root: './public/games' }))

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.35:5173",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://slots.cashflowcasino.com",
      "http://localhost:9999",
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
  })
);
configureOpenAPI(app)

const routes = [index, updates, test, auth, user, games, gameSpins, vipinfo, monitoring,redtiger] as const

routes.forEach((route) => {
  app.route('/', route)
})

export type AppType = (typeof routes)[number]

export default app
