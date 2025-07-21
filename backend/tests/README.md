# Authentication Test Suite

This directory contains end-to-end tests for the authentication system, including:

- User registration and login flows
- Authentication middleware
- Session management

## Test Structure

- `auth/` - Contains authentication-related tests
  - `auth.spec.ts` - Tests for user registration and login
  - `middleware.spec.ts` - Tests for authentication middleware
  - `session.spec.ts` - Tests for session management
- `utils/` - Test utilities
  - `auth.ts` - Helper functions for authentication in tests

## Prerequisites

1. Node.js 16+ and Bun installed
2. Backend server dependencies installed (`bun install`)
3. Environment variables set up (copy `.env.example` to `.env` and configure)

## Running Tests

1. Start the development server in a separate terminal:
   ```bash
   bun run dev
   ```

2. In another terminal, run the tests:
   ```bash
   # Run all tests
   bun test
   
   # Run a specific test file
   bun test tests/auth/auth.spec.ts
   
   # Run in UI mode (for debugging)
   bun test --ui
   
   # Run in debug mode
   bun test --debug
   ```

## Test Data

- Test users are automatically created with unique emails and usernames
- Test data is cleaned up after each test run
- You can customize test users by modifying the test files

## Writing New Tests

1. Create a new `.spec.ts` file in the appropriate directory
2. Use the `AuthHelper` class from `utils/auth.ts` for authentication
3. Follow the existing test patterns for consistency
4. Use descriptive test names and group related tests with `test.describe`

## Best Practices

- Each test should be independent and not rely on state from other tests
- Use unique test data to prevent test collisions
- Clean up any test data after tests complete
- Test both success and error cases
- Mock external services when necessary
