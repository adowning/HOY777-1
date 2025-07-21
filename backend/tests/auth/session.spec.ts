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

interface Session {
  id: string
  isCurrent: boolean
  isActive: boolean
  userAgent?: string
  ipAddress?: string
  lastActiveAt: string
  createdAt: string
}

const testUser = generateTestUser()

describe('Session Management', () => {
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

  afterAll((done) => {
    server.close(done)
  })

  test('should create a new session on login', async () => {
    // Login to create a new session
    const { token: sessionToken } = await loginUser(
      { username: testUser.username, password: testUser.password },
      baseUrl,
    )

    // Get user sessions
    const sessionsResponse = await fetch(`${baseUrl}/api/auth/sessions`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })

    expect(sessionsResponse.status).toBe(200)
    const sessions = (await sessionsResponse.json()) as Session[]

    expect(Array.isArray(sessions)).toBe(true)
    expect(sessions.length).toBeGreaterThan(0)

    // Verify the current session is active
    const currentSession = sessions.find((s) => s.isCurrent)
    expect(currentSession).toBeDefined()
    expect(currentSession?.isActive).toBe(true)
  })

  test('should end session on logout', async () => {
    // First verify session exists
    const sessionResponse = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    expect(sessionResponse.status).toBe(200)

    // Logout
    const logoutResponse = await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    expect(logoutResponse.status).toBe(200)

    // Verify token is invalidated
    const invalidMeResponse = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    expect(invalidMeResponse.status).toBe(401)
  })

  test('should prevent access with expired token', async () => {
    const response = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: 'Bearer expired.token.here',
      },
    })

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data).toHaveProperty('message')
    expect(data.message).toMatch(/token.*expired|invalid|unauthorized/i)
  })

  test('should allow multiple concurrent sessions', async () => {
    // Create first session
    const firstSession = await loginUser(
      { username: testUser.username, password: testUser.password },
      baseUrl,
    )

    // Create second session
    const secondSession = await loginUser(
      { username: testUser.username, password: testUser.password },
      baseUrl,
    )

    // Verify both tokens work
    const firstResponse = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${firstSession.token}`,
      },
    })
    expect(firstResponse.status).toBe(200)

    const secondResponse = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${secondSession.token}`,
      },
    })
    expect(secondResponse.status).toBe(200)
  })

  test('should list all active sessions', async () => {
    // Login with the test user
    const { token } = await loginUser(
      { username: testUser.username, password: testUser.password },
      baseUrl,
    )

    // Get sessions list
    const sessionsResponse = await fetch(`${baseUrl}/api/auth/sessions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(sessionsResponse.status).toBe(200)
    const sessions = (await sessionsResponse.json()) as Session[]

    expect(Array.isArray(sessions)).toBe(true)
    expect(sessions.length).toBeGreaterThan(0)

    // Verify session properties
    const session = sessions[0]
    expect(session).toHaveProperty('id')
    expect(session).toHaveProperty('isActive', true)
    expect(session).toHaveProperty('lastActiveAt')
    expect(session).toHaveProperty('createdAt')
  })
})
