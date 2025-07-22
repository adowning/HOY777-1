import { Context } from 'hono';
import * as service from './rpc.service';

export const handleRpc = async (c: Context) => {
  const user = c.get('user');
  const { sessionId, gameName } = c.req.param();
  const body = await c.req.json();

  const response = await service.handleGameRequest(user.id, sessionId, gameName, body, user);
  
  return c.json(response);
};
