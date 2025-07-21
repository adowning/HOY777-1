#!/bin/bash

# Create directories
mkdir -p src/modules/monitoring
mkdir -p src/modules/test

# Create monitoring files
cat > src/modules/monitoring/monitoring.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Active Users</title>
  <style>
    body { font-family: sans-serif; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 8px; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <h1>Active Users</h1>
  <table>
    <thead>
      <tr>
        <th>User ID</th>
        <th>Username</th>
        <th>Last Seen</th>
        <th>IP Address</th>
        <th>User Agent</th>
      </tr>
    </thead>
    <tbody>
      {{#each sessions}}
      <tr>
        <td>{{this.user.id}}</td>
        <td>{{this.user.username}}</td>
        <td>{{this.lastSeen}}</td>
        <td>{{this.ipAddress}}</td>
        <td>{{this.userAgent}}</td>
      </tr>
      {{/each}}
    </tbody>
  </table>
</body>
</html>
EOF

cat > src/modules/monitoring/monitoring.controller.ts <<'EOF'
import { Context } from 'hono'
import * as service from './monitoring.service'
import { html } from 'hono/html'

export const showMonitoringPage = async (c: Context) => {
  const sessions = await service.getActiveSessions()
  const monitoringHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Active Users</title>
    <style>
      body { font-family: sans-serif; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #ddd; padding: 8px; }
      th { background-color: #f2f2f2; }
    </style>
  </head>
  <body>
    <h1>Active Users</h1>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Last Seen</th>
          <th>IP Address</th>
          <th>User Agent</th>
        </tr>
      </thead>
      <tbody>
        ${sessions.map(session => `
          <tr>
            <td>${session.user?.username ?? 'N/A'}</td>
            <td>${session.lastSeen}</td>
            <td>${session.ipAddress}</td>
            <td>${session.userAgent}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </body>
  </html>
  `
  return c.html(monitoringHtml)
}
EOF

cat > src/modules/monitoring/monitoring.router.ts <<'EOF'
import { createRouter } from '../../lib/create-app'
import * as controller from './monitoring.controller'
import { createRoute } from '@hono/zod-openapi'

const tags = ['Monitoring']

const monitoringRoute = createRoute({
  method: 'get',
  path: '/monitoring',
  tags,
  responses: { 200: { description: 'Server monitoring page' } },
})

const router = createRouter().openapi(
  monitoringRoute,
  controller.showMonitoringPage
)

export default router
EOF

cat > src/modules/monitoring/monitoring.service.ts <<'EOF'
import { db } from '../../db'
import { sessions, users } from '../../db'
import { and, eq, gte } from 'drizzle-orm'

const SESSION_DURATION = 5 * 60 * 1000 // 5 minutes

export const getActiveSessions = async () => {
  const fiveMinutesAgo = new Date(Date.now() - SESSION_DURATION)
  const activeSessions = await db
    .select()
    .from(sessions)
    .leftJoin(users, eq(sessions.userId, users.id))
    .where(gte(sessions.lastSeen, fiveMinutesAgo))

  return activeSessions.map(({ sessions, users }) => ({
    ...sessions,
    user: users,
  }))
}
EOF

# Create test files
cat > src/modules/test/test.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auth System Tests</title>
    <style>
        body { font-family: sans-serif; }
        .container { max-width: 600px; margin: 2em auto; padding: 1em; border: 1px solid #ccc; border-radius: 5px; }
        button { padding: 10px 15px; margin-right: 10px; cursor: pointer; }
        #results { margin-top: 1em; padding: 1em; border: 1px solid #eee; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Auth System Tests</h1>
        <button id="testSignup">Test Signup</button>
        <button id="testLogin">Test Login</button>
        <div id="results"></div>
    </div>
    <script>
        const resultsDiv = document.getElementById('results');

        document.getElementById('testSignup').addEventListener('click', async () => {
            const response = await fetch('/test/signup', { method: 'POST' });
            const data = await response.json();
            resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        });

        document.getElementById('testLogin').addEventListener('click', async () => {
            const response = await fetch('/test/login', { method: 'POST' });
            const data = await response.json();
            resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        });
    </script>
</body>
</html>
EOF

cat > src/modules/test/test.controller.ts <<'EOF'
import { Context } from 'hono'
import * as service from './test.service'
import { html } from 'hono/html'

export const showTestPage = async (c: Context) => {
  const testPageHtml = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auth System Tests</title>
    <style>
        body { font-family: sans-serif; }
        .container { max-width: 600px; margin: 2em auto; padding: 1em; border: 1px solid #ccc; border-radius: 5px; }
        button { padding: 10px 15px; margin-right: 10px; cursor: pointer; }
        #results { margin-top: 1em; padding: 1em; border: 1px solid #eee; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Auth System Tests</h1>
        <button id="testSignup">Test Signup</button>
        <button id="testLogin">Test Login</button>
        <div id="results"></div>
    </div>
    <script>
        const resultsDiv = document.getElementById('results');

        document.getElementById('testSignup').addEventListener('click', async () => {
            const response = await fetch('/test/signup', { method: 'POST' });
            const data = await response.json();
            resultsDiv.innerHTML = \`<pre>\${JSON.stringify(data, null, 2)}</pre>\`;
        });

        document.getElementById('testLogin').addEventListener('click', async () => {
            const response = await fetch('/test/login', { method: 'POST' });
            const data = await response.json();
            resultsDiv.innerHTML = \`<pre>\${JSON.stringify(data, null, 2)}</pre>\`;
        });
    </script>
</body>
</html>
  `
  return c.html(testPageHtml)
}

export const testSignup = async (c: Context) => {
  const result = await service.testSignup()
  return c.json(result)
}

export const testLogin = async (c: Context) => {
  const result = await service.testLogin()
  return c.json(result)
}
EOF

cat > src/modules/test/test.router.ts <<'EOF'
import { createRouter } from '../../lib/create-app'
import * as controller from './test.controller'
import { createRoute } from '@hono/zod-openapi'

const tags = ['Test']

const testIndexRoute = createRoute({
  method: 'get',
  path: '/test',
  tags,
  responses: { 200: { description: 'Auth test page' } },
})

const testSignupRoute = createRoute({
  method: 'post',
  path: '/test/signup',
  tags,
  responses: { 200: { description: 'Test signup endpoint' } },
})

const testLoginRoute = createRoute({
  method: 'post',
  path: '/test/login',
  tags,
  responses: { 200: { description: 'Test login endpoint' } },
})

const router = createRouter()
  .openapi(testIndexRoute, controller.showTestPage)
  .openapi(testSignupRoute, controller.testSignup)
  .openapi(testLoginRoute, controller.testLogin)

export default router
EOF

cat > src/modules/test/test.service.ts <<'EOF'
import * as authService from '../auth/auth.service'
import { nanoid } from '../../utils/nanoid'

export const testSignup = async () => {
  const username = `testuser-${nanoid(8)}`
  const password = 'password123'
  try {
    const result = await authService.signup(username, password)
    return { success: true, ...result }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export const testLogin = async () => {
  const username = 'testuser' // Assume a test user exists
  const password = 'password123'
  try {
    const result = await authService.login(username, password)
    return { success: true, ...result }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
EOF

# Modify src/app.ts
cat > src/app.ts <<'EOF'
import configureOpenAPI from './lib/configure-open-api'
import createApp from './lib/create-app'
import index from './modules/index.route'

import auth from './modules/auth/auth.router'
import games from './modules/games/games.router'
import user from './modules/user/user.router'
import vipinfo from './modules/vipinfo/vipinfo.router'
import monitoring from './modules/monitoring/monitoring.router'
import test from './modules/test/test.router'

const app = createApp()

configureOpenAPI(app)

const routes = [index, auth, user, games, vipinfo, monitoring, test] as const

routes.forEach((route) => {
  app.route('/', route)
})

export type AppType = (typeof routes)[number]

export default app
EOF

echo "Files created and modified successfully."