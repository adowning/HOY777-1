import * as authService from '../auth/auth.service'
import { nanoid } from '../../utils/nanoid'

export const testSignup = async () => {
  const username = `testuser-${nanoid(8)}`
  const password = 'password123'
  try {
    const result = await authService.signup(username, password)
    return { success: true, ...result }
  } catch (error) {
    // Ignore error if 'testuser' already exists
    if (!(error as Error).message.includes('already exists')) {
      return { success: false, error: (error as Error).message }
    }
    return { success: true }
  }
}

export const testLogin = async (username: string, password: string) => {
  try {
    const result = await authService.login(username, password)
    return { success: true, ...result }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}