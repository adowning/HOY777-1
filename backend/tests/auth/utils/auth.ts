import { randomUUID } from 'crypto'

interface CreateUserParams {
  username: string
  email: string
  password: string
}

export async function createUser(
  { username, password }: Omit<CreateUserParams, 'email'>,
  baseUrl: string,
) {
  const response = await fetch(`${baseUrl}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to create user: ${JSON.stringify(error)}`)
  }

  const data = await response.json()
  return data.user
}

export async function loginUser(
  { username, password }: { username: string; password: string },
  baseUrl: string,
) {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Login failed: ${JSON.stringify(error)}`)
  }

  return response.json()
}

export function generateTestUser() {
  const id = randomUUID().substring(0, 8)
  return {
    username: `testuser_${id}`,
    email: `test_${id}@example.com`,
    password: `Test@${id}123`,
  }
}
