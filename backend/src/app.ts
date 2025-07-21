import configureOpenAPI from './lib/configure-open-api'
import createApp from './lib/create-app'
import index from './modules/index.route'

import auth from './modules/auth/auth.router'

import games from './modules/games/games.router'

import user from './modules/user/user.router'
import vipinfo from './modules/vipinfo/vipinfo.router'

const app = createApp()

configureOpenAPI(app)

const routes = [index, auth, user, games, vipinfo] as const

routes.forEach((route) => {
  app.route('/', route)
})

export type AppType = (typeof routes)[number]

export default app
