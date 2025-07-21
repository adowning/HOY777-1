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

// Import app after environment variables are loaded
import app from '../../src/app'
import { createUser, loginUser, generateTestUser } from './utils/auth'
import { Server } from 'http'

const testUser = generateTestUser()

describe('Authentication', () => {
  let server: Server
  let baseUrl: string

  beforeAll((done) => {
    // Start server on random available port
    server = new Server(app.fetch)
    server.listen(0, () => {
      const port = (server.address() as { port: number }).port
      baseUrl = `http://localhost:${port}`
      done()
    })
  })

  afterAll((done) => {
    server.close(done)
  })

  test('should allow user to register', async () => {
    const user = await createUser(
      {
        username: testUser.username,
        password: testUser.password,
      },
      baseUrl,
    )

    expect(user).toHaveProperty('id')
    expect(user.username).toBe(testUser.username)
  })

  test('should allow user to login', async () => {
    // First register the user
    await createUser(
      {
        username: testUser.username,
        password: testUser.password,
      },
      baseUrl
    )

    // Then try to login
    const { token, user } = await loginUser(
      { username: testUser.username, password: testUser.password },
      baseUrl
    )

    expect(token).toBeDefined()
    expect(user).toBeDefined()
    expect(user.username).toBe(testUser.username)
  })

  test('should protect authenticated routes', async () => {
    // First register
    await createUser(
      {
        username: testUser.username,
        password: testUser.password,
      },
      baseUrl
    )

    // Then login to get token
    const { token } = await loginUser(
      { username: testUser.username, password: testUser.password },
      baseUrl
    )

    // Try to access a protected route
    const response = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('id')
    expect(data.email).toBe(testUser.email)
  })

  test('should handle invalid login credentials', async () => {
    // Try to login with invalid credentials
    let error: Error | null = null
    try {
      await loginUser(
        { username: 'nonexistentuser', password: 'wrongpassword' },
        baseUrl,
      )
    } catch (err) {
      error = err as Error
    }
    expect(error).toBeDefined()
  })

  test('should not allow duplicate username registration', async () => {
    // First register a user
    await createUser(
      {
        username: testUser.username,
        password: testUser.password,
      },
      baseUrl,
    )

    // Try to register again with the same username
    let error: Error | null = null
    try {
      await createUser(
        {
          username: testUser.username,
          password: 'differentpassword',
        },
        baseUrl,
      )
    } catch (err) {
      error = err as Error
    }
    expect(error).toBeDefined()
  })
})
