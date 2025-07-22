
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { VipLevelSchema, createVipLevelSchema, updateVipLevelSchema } from './viplevel.schema';
import * as controller from './viplevel.controller';
import type { Handler } from 'hono';

// Define ErrorSchema locally for OpenAPI responses
const ErrorSchema = z.object({
  error: z.string(),
});


// --- Route Definitions ---
const listVipLevelRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['VipLevel'],
  summary: 'List all vipLevels',
  responses: {
    200: {
      description: 'Returns a list of vipLevels',
      content: {
        'application/json': {
          schema: z.array(VipLevelSchema),
        },
      },
    },
    // --- Add standard error responses ---
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

const createVipLevelRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['VipLevel'],
  summary: 'Create a new vipLevel',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createVipLevelSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Returns the created vipLevel',
      content: {
        'application/json': {
          schema: VipLevelSchema,
        },
      },
    },
    // --- Add standard error responses ---
    400: {
      description: "Invalid input data",
      content: {
        "application/json": {
          schema: ErrorSchema, // Use standard error schema
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

const getVipLevelByIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['VipLevel'],
  summary: 'Get a vipLevel by ID',
  request: {
    params: z.object({
      id: z.coerce.number(), // Use dynamic ID type
    }),
  },
  responses: {
    200: {
      description: 'Returns the vipLevel',
      content: {
        'application/json': {
          schema: VipLevelSchema,
        },
      },
    },
    // --- Add standard error responses ---
    400: { // Potential for bad ID format, though covered by Zod param validation
        description: "Invalid ID format",
        content: {
           'application/json': {
               schema: ErrorSchema
           }
        }
    },
    404: {
      description: "VipLevel not found",
      content: {
        "application/json": {
          schema: ErrorSchema, // Use standard error schema
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

const updateVipLevelRoute = createRoute({
  method: 'patch',
  path: '/{id}',
  tags: ['VipLevel'],
  summary: 'Update a vipLevel by ID',
  request: {
    params: z.object({
      id: z.coerce.number(), // Use dynamic ID type
    }),
    body: {
      content: {
        'application/json': {
          schema: updateVipLevelSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Returns the updated vipLevel',
      content: {
        'application/json': {
          schema: VipLevelSchema,
        },
      },
    },
    // --- Add standard error responses ---
    400: {
      description: "Invalid input data or ID format",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: "VipLevel not found",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

const deleteVipLevelRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['VipLevel'],
  summary: 'Delete a vipLevel by ID',
  request: {
    params: z.object({
      id: z.coerce.number(), // Use dynamic ID type
    }),
  },
  responses: {
    200: { // Consider 204 No Content if not returning the object
      description: 'VipLevel deleted successfully',
      content: {
        'application/json': {
            // Optional: Return the deleted object's ID or a success message
            schema: z.object({ level: z.coerce.number() })
        },
      },
    },
    // --- Add standard error responses ---
     400: { // Potential for bad ID format
        description: "Invalid ID format",
        content: {
           'application/json': {
               schema: ErrorSchema
           }
        }
    },
    404: {
      description: "VipLevel not found",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});
// --- Hono App Setup ---
const vipLevelRoutes = new OpenAPIHono();

// Register routes using app.openapi()
// We need to use type casting to ensure compatibility between the OpenAPI route definitions
// and the actual controller responses, especially for fields like JSON that can have various formats
vipLevelRoutes.openapi(listVipLevelRoute, controller.listVipLevel as Handler);
vipLevelRoutes.openapi(createVipLevelRoute, controller.createVipLevel as Handler);

vipLevelRoutes.openapi(getVipLevelByIdRoute, controller.getVipLevelById as Handler);
vipLevelRoutes.openapi(updateVipLevelRoute, controller.updateVipLevel as Handler);
vipLevelRoutes.openapi(deleteVipLevelRoute, controller.deleteVipLevel as Handler);

export default vipLevelRoutes;
