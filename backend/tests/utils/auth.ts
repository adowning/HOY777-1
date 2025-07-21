import { APIRequestContext } from '@playwright/test';

type UserCredentials = {
  email: string;
  password: string;
  username?: string;
};

export class AuthHelper {
  private apiContext: APIRequestContext;
  private baseUrl: string;

  constructor(apiContext: APIRequestContext, baseUrl: string = 'http://localhost:3000') {
    this.apiContext = apiContext;
    this.baseUrl = baseUrl;
  }

  async register(user: UserCredentials): Promise<{ token: string; userId: string }> {
    const response = await this.apiContext.post(`${this.baseUrl}/api/auth/register`, {
      data: {
        username: user.username || `testuser_${Date.now()}`,
        email: user.email || `test_${Date.now()}@example.com`,
        password: user.password || 'Test@1234',
      },
    });

    if (!response.ok()) {
      const error = await response.json();
      throw new Error(`Registration failed: ${error.message || response.statusText()}`);
    }

    const data = await response.json();
    return {
      token: data.token,
      userId: data.userId,
    };
  }

  async login(credentials: Omit<UserCredentials, 'username'>): Promise<string> {
    const response = await this.apiContext.post(`${this.baseUrl}/api/auth/login`, {
      data: credentials,
    });

    if (!response.ok()) {
      const error = await response.json();
      throw new Error(`Login failed: ${error.message || response.statusText()}`);
    }

    const data = await response.json();
    return data.token;
  }

  async getAuthHeaders(token: string): Promise<Record<string, string>> {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async createAuthenticatedContext() {
    const token = await this.login({
      email: process.env.TEST_USER_EMAIL || 'test@example.com',
      password: process.env.TEST_USER_PASSWORD || 'Test@1234',
    });

    const headers = await this.getAuthHeaders(token);
    
    return {
      token,
      headers,
    };
  }
}
