import { OpenAPIHono } from '@hono/zod-openapi'
import authRouter from './auth/auth.router'
import userRouter from './user/user.router'
import vipInfoRouter from './vipinfo/vipinfo.router'
// import announcementsRouter from './announcements/announcements.router'
// import bannersRouter from './banners/banners.router'
import gamesRouter from './games/games.router'
// import promotionsRouter from './promotions/promotions.router'
// import statisticsRouter from './statistics/statistics.router'
import depositRouter from './deposit/deposit.router'
import withdrawRouter from './withdraw/withdraw.router'
import inviteRouter from './invite/invite.router'
import achievementRouter from './achievement/achievement.router'
import bonusRouter from './bonus/bonus.router'
import transactionRouter from './transaction/transaction.router'
import activityRouter from './activity/activity.router'
import rewardRouter from './reward/reward.router'
import currencyRouter from './currency/currency.router'

const app = new OpenAPIHono()

app.route('/', authRouter)
app.route('/', userRouter)
app.route('/', vipInfoRouter)
app.route('/', announcementsRouter)
app.route('/', bannersRouter)
app.route('/games', gamesRouter)
app.route('/', promotionsRouter)
app.route('/', statisticsRouter)
app.route('/user', depositRouter)
app.route('/user', withdrawRouter)
app.route('/user', inviteRouter)
app.route('/user', achievementRouter)
app.route('/user', bonusRouter)
app.route('/user', transactionRouter)
app.route('/activity', activityRouter)
app.route('/user/reward', rewardRouter)
app.route('/user', currencyRouter)

export default app
