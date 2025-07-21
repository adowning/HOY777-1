import { describe, expect, test, beforeAll, afterAll } from 'bun:test'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { join } from 'path'

// Load test environment variables first
expand(
  config({
    path: join(process.cwd(), '.env.test'),
  }),
)

import app from '../../src/app'
import { createUser, loginUser, generateTestUser } from './utils/auth'
import { Server } from 'http'

const testUser = generateTestUser()

describe('Auth Middleware', () => {
  let server: Server
  let baseUrl: string
  let token: string

  beforeAll((done) => {
    // Start server on random available port
    server = new Server(app.fetch)
    server.listen(0, () => {
      const port = (server.address() as { port: number }).port
      baseUrl = `http://localhost:${port}`

      // Create and login test user
      createUser(testUser, baseUrl).then(() => {
        loginUser(
          { username: testUser.username, password: testUser.password },
          baseUrl,
        ).then(({ token: authToken }) => {
          token = authToken
          done()
        })
      })
    })
  })

  afterAll(() => {
    server.close()
  })

  test('should return 401 if no token is provided', async () => {
    const response = await fetch(`${baseUrl}/api/protected-route`)
    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data).toHaveProperty('message')
    expect(data.message).toMatch(/no token provided|unauthorized/i)
  })

  test('should return 401 if token is invalid', async () => {
    const response = await fetch(`${baseUrl}/api/protected-route`, {
      headers: {
        Authorization: 'Bearer invalid.token.here',
      },
    })
    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data).toHaveProperty('message')
    expect(data.message).toMatch(/invalid token|unauthorized/i)
  })

  test('should allow access with valid token', async () => {
    const response = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    expect(response.status).toBe(200)
  })

  test('should include user info in request if token is valid', async () => {
    const response = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('id')
    expect(data).toHaveProperty('email', testUser.email)
    expect(data).toHaveProperty('username', testUser.username)
  })

  test('should invalidate token after logout', async () => {
    // First verify the token is valid
    const meResponse = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    expect(meResponse.status).toBe(200)

    // Logout
    const logoutResponse = await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    expect(logoutResponse.status).toBe(200)

    // Verify token is now invalid
    const meResponseAfterLogout = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    expect(meResponseAfterLogout.status).toBe(401)
  })
})
