import configureOpenAPI from './lib/configure-open-api'
import createApp from './lib/create-app'
import index from './modules/index.route'
// import achievementRouter from './modules/achievement/achievement.router'
// import activities from './modules/achievement/achievement.router'
import auth from './modules/auth/auth.router'
// import bonus from './modules/achievement/achievement.router'
// import countries from './modules/achievement/achievement.router'
// import currencies from './modules/achievement/achievement.router'
// import currency from './modules/achievement/achievement.router'
// import deposit from './modules/achievement/achievement.router'
import games from './modules/games/games.router'
// import invite from './modules/achievement/achievement.router'
// import languages from './modules/achievement/achievement.router'
// import reward from './modules/achievement/achievement.router'
// import transaction from './modules/achievement/achievement.router'
import user from './modules/user/user.router'
// import vipinfo from './modules/achievement/achievement.router'
// import withdraw from './modules/achievement/achievement.router'

const app = createApp()

configureOpenAPI(app)

const routes = [index, auth, user, games] as const

routes.forEach((route) => {
  app.route('/', route)
})

export type AppType = (typeof routes)[number]

export default app
