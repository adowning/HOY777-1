import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import * as controller from './user.controller';
import * as HttpStatusCodes from "stoker/http-status-codes";
import { notFoundSchema } from "../../lib/constants";

import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { insertUsersSchema, patchUsersSchema, selectUsersSchema, selectBalancesSchema, selectCurrenciesSchema } from "../../db/schemelibsql";

const tags = ["User"];

const listUser = createRoute({
  path: "/users",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectUsersSchema),
      "The list of users",
    ),
  },
});

const createUser = createRoute({
  path: "/users",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertUsersSchema,
      "The user to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectUsersSchema,
      "The created user",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertUsersSchema),
      "The validation error(s)",
    ),
  },
});

const getOneUser = createRoute({
  path: "/users/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectUsersSchema,
      "The requested user",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "User not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

const updateUser = createRoute({
  path: "/users/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      patchUsersSchema,
      "The user updates",
  ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectUsersSchema,
      "The updated user",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "User not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchUsersSchema)
        .or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)",
    ),
  },
});

const removeUser = createRoute({
  path: "/users/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "User deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "User not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

const checkUser = createRoute({
    method: 'get',
    path: '/users/{id}/check',
    tags,
    summary: 'Check if a user exists',
    request: { params: IdParamsSchema },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.object({ userCheck: z.boolean() }), 'User status'),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'User not found'),
    },
});

const getBalance = createRoute({
    method: 'get',
    path: '/users/{id}/balance',
    tags,
    summary: "Get user's balance",
    request: { params: IdParamsSchema },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.array(selectBalancesSchema), 'User balance'),
    },
});

const setCurrency = createRoute({
    method: 'post',
    path: '/users/{id}/currency',
    tags,
    summary: "Set user's currency",
    request: {
        params: IdParamsSchema,
        body: jsonContentRequired({ currency: z.string() }, 'The currency to set')
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectCurrenciesSchema, 'Currency set'),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(createErrorSchema(z.object({ currency: z.string() })), 'Invalid currency'),
    },
});

const verifyEmail = createRoute({
    method: 'post',
    path: '/users/{id}/verify-email',
    tags,
    summary: 'Send email verification',
    request: { params: IdParamsSchema },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.object({ status: z.string(), time: z.number() }), 'Verification sent'),
    },
});

const getInfo = createRoute({
    method: 'get',
    path: '/users/{id}/info',
    tags,
    summary: 'Get user info',
    request: { params: IdParamsSchema },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectUsersSchema, 'User info'),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'User not found'),
    },
});

const getVipInfo = createRoute({
    method: 'get',
    path: '/users/{id}/vipinfo',
    tags,
    summary: 'Get user VIP info',
    request: { params: IdParamsSchema },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.object({ vipLevel: z.number().nullable() }), 'VIP info'),
    },
});

const userRoutes = new OpenAPIHono();

// Basic CRUD
userRoutes.openapi(listUser, controller.listUser);
userRoutes.openapi(createUser, controller.createUser);
userRoutes.openapi(getOneUser, controller.getUserById);
userRoutes.openapi(updateUser, controller.updateUser);
userRoutes.openapi(removeUser, controller.deleteUser);

// From Pinia Store & HAR files
userRoutes.openapi(checkUser, controller.checkUser);
userRoutes.openapi(getBalance, controller.getBalance);
userRoutes.openapi(setCurrency, controller.setCurrency);
userRoutes.openapi(verifyEmail, controller.verifyEmail);
userRoutes.openapi(getInfo, controller.getInfo);
userRoutes.openapi(getVipInfo, controller.getVipInfo);

export default userRoutes;