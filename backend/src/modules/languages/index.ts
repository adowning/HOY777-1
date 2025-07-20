import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    code: 0,
    data: [],
    message: 'Success',
  })
})

export default app
