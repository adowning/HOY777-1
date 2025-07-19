
import { Context } from 'hono';
import * as service from './user.service';

// Basic CRUD
export const listUser = async (c: Context) => {
  const data = await service.findManyUser();
  return c.json(data, 200);
};

export const createUser = async (c: Context) => {
  const data = await c.req.json();
  const newUser = await service.createUser(data);
  return c.json(newUser[0], 201);
};

export const getUserById = async (c: Context) => {
  const id = Number(c.req.param('id'));
  const user = await service.findUserById(id);
  if (!user || user.length === 0) {
    return c.json({ error: 'User not found' }, 404);
  }
  return c.json(user[0], 200);
};

export const updateUser = async (c: Context) => {
  const id = Number(c.req.param('id'));
  const data = await c.req.json();
  const updatedUser = await service.updateUser(id, data);
  if (!updatedUser || updatedUser.length === 0) {
    return c.json({ error: 'User not found' }, 404);
  }
  return c.json(updatedUser[0], 200);
};

export const deleteUser = async (c: Context) => {
  const id = Number(c.req.param('id'));
  const deletedUser = await service.deleteUser(id);
  if (!deletedUser || deletedUser.length === 0) {
    return c.json({ error: 'User not found' }, 404);
  }
  return c.json({ id: deletedUser[0].id }, 200);
};

// From Pinia Store & HAR files
export const checkUser = async (c: Context) => {
    const userId = Number(c.req.param('id'));
    const user = await service.checkUser(userId);
    if (!user || user.length === 0) {
        return c.json({ error: 'User not found' }, 404);
    }
    return c.json({ userCheck: true }, 200);
};

export const getBalance = async (c: Context) => {
    const userId = Number(c.req.param('id'));
    const balance = await service.getUserBalance(userId);
    return c.json(balance, 200);
};

export const setCurrency = async (c: Context) => {
    const userId = Number(c.req.param('id'));
    const { currency } = await c.req.json();
    try {
        const result = await service.setUserCurrency(userId, currency);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const verifyEmail = async (c: Context) => {
    const userId = Number(c.req.param('id'));
    const result = await service.sendEmailVerification(userId);
    return c.json(result, 200);
};

export const getInfo = async (c: Context) => {
    const userId = Number(c.req.param('id'));
    const info = await service.getUserInfo(userId);
     if (!info || info.length === 0) {
    return c.json({ error: 'User not found' }, 404);
  }
  return c.json(info[0], 200);
};

export const getVipInfo = async (c: Context) => {
    const userId = Number(c.req.param('id'));
    const vipInfo = await service.getVipInfo(userId);
    if (!vipInfo || vipInfo.length === 0) {
        return c.json({ vipLevel: null }, 200);
    }
    return c.json(vipInfo[0], 200);
};
