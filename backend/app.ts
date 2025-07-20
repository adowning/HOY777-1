import configureOpenAPI from './lib/configure-open-api'
import createApp from './lib/create-app'
import routes from './modules/index.route'

const app = createApp()

configureOpenAPI(app)

app.route('/', routes)

export type AppType = typeof routes

export default app
