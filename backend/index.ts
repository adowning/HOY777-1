import { serve } from '@hono/node-server';

import app from "./app";
import env from "./env";

const port = env.PORT;
// eslint-disable-next-line no-console
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
// import { Hono } from 'hono';
// import { logger } from 'hono/logger';
// import { serve } from '@hono/node-server';

// import user from './modules/user/user.router';
// import games from './modules/games';
// import statistics from './modules/statistics';
// import login from './modules/login';
// import viplevels from './modules/viplevels';
// import depositbonuscfg from './modules/depositbonuscfg';
// import signup from './modules/signup';
// import banners from './modules/banners';
// import announcements from './modules/announcements';
// import currencies from './modules/currencies';
// import languages from './modules/languages';
// import countries from './modules/countries';

// const app = new Hono();

// app.use('*', logger());

// app.route('/user', user);
// app.route('/games', games);
// app.route('/statistics', statistics);
// app.route('/login', login);
// app.route('/viplevels', viplevels);
// app.route('/depositbonuscfg', depositbonuscfg);
// app.route('/signup', signup);
// app.route('/banners', banners);
// app.route('/announcements', announcements);
// app.route('/currencies', currencies);
// app.route('/languages', languages);
// app.route('/countries', countries);

// serve({
//   fetch: app.fetch,
//   port: 3000,
// });

// console.log('Server running on port 3000');
