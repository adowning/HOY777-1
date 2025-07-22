import { Context } from 'hono'
import * as service from './test.service'
import { setCookie } from 'hono/cookie'

// Keep existing functions: showTestPage, testSignup

export const showLoginPage = (c: Context) => {
  return c.html(loginPageHtml)
}

export const handleTestLogin = async (c: Context) => {
  const { username, password } = await c.req.json()
  const result = await service.testLogin(username, password)

  if (result.success && result.accessToken) {
    setCookie(c, 'access_token', result.accessToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 60 * 15, // 15 minutes
    })
    return c.json({ success: true })
  }

  return c.json({ success: false, error: result.error }, 401)
}


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
        .nav { margin-bottom: 1em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="nav">
            <a href="/test/login">Go to Test Login Page</a>
        </div>
        <h1>Auth System Tests</h1>
        <button id="testSignup">Test Signup</button>
        <div id="results"></div>
    </div>
    <script>
        const resultsDiv = document.getElementById('results');

        document.getElementById('testSignup').addEventListener('click', async () => {
            resultsDiv.innerHTML = 'Running signup test...';
            const response = await fetch('/test/signup', { method: 'POST' });
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

const loginPageHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Login</title>
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f2f5; }
        .login-container { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 300px; }
        h1 { text-align: center; color: #333; }
        .input-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.5rem; color: #555; }
        input { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        button { width: 100%; padding: 0.75rem; border: none; border-radius: 4px; background-color: #007bff; color: white; font-size: 1rem; cursor: pointer; }
        button:hover { background-color: #0056b3; }
        .message { text-align: center; margin-top: 1rem; color: red; }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>Test Login</h1>
        <form id="loginForm">
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
        <div id="message" class="message"></div>
    </div>
    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            const messageDiv = document.getElementById('message');

            const response = await fetch('/test/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                messageDiv.style.color = 'green';
                messageDiv.textContent = 'Login successful! Redirecting...';
                // Redirect to the monitoring page after successful login
                setTimeout(() => {
                    window.location.href = '/monitoring';
                }, 1000);
            } else {
                const data = await response.json();
                messageDiv.style.color = 'red';
                messageDiv.textContent = 'Login failed: ' + (data.error || 'Unknown error');
            }
        });
    </script>
</body>
</html>
`;