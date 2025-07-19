
import { Hono } from 'hono';

const app = new Hono();

app.post('/', (c) => {
  return c.json({
    "code": 0,
    "data": {
        "token": "test-token"
    },
    "message": "Success"
  });
});

export default app;
