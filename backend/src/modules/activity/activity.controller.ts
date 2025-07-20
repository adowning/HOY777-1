import { Context } from 'hono'
import * as service from './activity.service'

export const listActivities = async (c: Context) => {
  const data = await service.findManyActivities()
  return c.json({ code: 0, data, message: 'Success' })
}
