import { createRouter } from '#/lib/create-app';
import * as controller from './rpc.controller';
import { createRoute, z } from '@hono/zod-openapi';
import { rpcAuthMiddleware } from './rpc.middleware';

const tags = ['RPC'];

const rpcRoute = createRoute({
  method: 'post',
  path: '/spin-data/redtiger/platform/:sessionId/:authToken/:gameName',
  tags,
  request: {
    params: z.object({
      sessionId: z.string(),
      authToken: z.string(),
      gameName: z.string(),
    }),
  },
  responses: {
    200: {
      description: 'Game RPC response',
      content: { 'application/json': { schema: z.any() } },
    },
  },
});

const router = createRouter()
  .use('/spin-data/redtiger/platform/*', rpcAuthMiddleware)
  .openapi(rpcRoute, controller.handleRpc);

export default router;
