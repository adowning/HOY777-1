
import { Hono } from 'hono';

const app = new Hono();

app.post('/report', (c) => {
  return c.json({
    "code": 0,
    "data": null,
    "message": "Success"
  });
});

export default app;
