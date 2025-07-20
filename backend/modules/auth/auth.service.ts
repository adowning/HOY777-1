// This is a placeholder for the actual auth logic
export const login = async (email: string, password: string) => {
  console.log('Logging in with:', { email, password })
  return { token: 'test-token' }
}

export const signup = async (
  email: string,
  password: string,
  username: string
) => {
  console.log('Signing up with:', { email, password, username })
  return { token: 'test-token' }
}
