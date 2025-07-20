import { Context } from 'hono'
import * as service from './user.service'

// Basic CRUD
export const listUser = async (c: Context) => {
  const data = await service.findManyUser()
  return c.json(data, 200)
}

export const createUser = async (c: Context) => {
  const data = await c.req.json()
  const newUser = await service.createUser(data)
  return c.json(newUser[0], 201)
}

export const getUserById = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const user = await service.findUserById(id)
  if (!user || user.length === 0) {
    return c.json({ error: 'User not found' }, 404)
  }
  return c.json(user[0], 200)
}

export const updateUser = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const data = await c.req.json()
  const updatedUser = await service.updateUser(id, data)
  if (!updatedUser || updatedUser.length === 0) {
    return c.json({ error: 'User not found' }, 404)
  }
  return c.json(updatedUser[0], 200)
}

export const deleteUser = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const deletedUser = await service.deleteUser(id)
  if (!deletedUser || deletedUser.length === 0) {
    return c.json({ error: 'User not found' }, 404)
  }
  return c.json({ id: deletedUser[0].id }, 200)
}

// From Pinia Store & HAR files
export const checkUser = async (c: Context) => {
  const userId = Number(c.req.param('id'))
  const user = await service.checkUser(userId)
  if (!user || user.length === 0) {
    return c.json({ error: 'User not found' }, 404)
  }
  return c.json({ userCheck: true }, 200)
}

export const getBalance = async (c: Context) => {
  const userId = Number(c.req.param('id'))
  const balance = await service.getUserBalance(userId)
  return c.json(balance, 200)
}

export const setCurrency = async (c: Context) => {
  const userId = Number(c.req.param('id'))
  const { currency } = await c.req.json()
  try {
    const result = await service.setUserCurrency(userId, currency)
    return c.json(result, 200)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400)
    }
    return c.json({ error: 'An unknown error occurred' }, 400)
  }
}

export const verifyEmail = async (c: Context) => {
  const userId = Number(c.req.param('id'))
  const result = await service.sendEmailVerification(userId)
  return c.json(result, 200)
}

export const getInfo = async (c: Context) => {
  const userId = Number(c.req.param('id'))
  const info = await service.getUserInfo(userId)
  if (!info || info.length === 0) {
    return c.json({ error: 'User not found' }, 404)
  }
  return c.json(info[0], 200)
}

export const getVipInfo = async (c: Context) => {
  const userId = Number(c.req.param('id'))
  const vipInfo = await service.getVipInfo(userId)
  if (!vipInfo || vipInfo.length === 0) {
    return c.json({ vipLevel: null }, 200)
  }
  return c.json(vipInfo[0], 200)
}

// New Routes
export const getUserAmount = async (c: Context) => {
  const data = await service.getUserAmount()
  return c.json(data, 200)
}

export const updateUserInfo = async (c: Context) => {
  const data = await c.req.json()
  const updatedUser = await service.updateUserInfo(data)
  return c.json(updatedUser, 200)
}

export const updateEmail = async (c: Context) => {
  const data = await c.req.json()
  const updatedUser = await service.updateEmail(data)
  return c.json(updatedUser, 200)
}

export const updatePassword = async (c: Context) => {
  const data = await c.req.json()
  await service.updatePassword(data)
  return c.json({ message: 'Password updated' }, 200)
}

export const suspendUser = async (c: Context) => {
  const data = await c.req.json()
  await service.suspendUser(data)
  return c.json({ message: 'User suspended' }, 200)
}

export const getBalanceList = async (c: Context) => {
  const data = await service.getBalanceList()
  return c.json(data, 200)
}

// Game Routes
export const enterGame = async (c: Context) => {
  const data = await service.enterGame(1) // Placeholder
  return c.json({ code: 0, data, message: 'Success' })
}

export const userGame = async (c: Context) => {
  const data = await service.userGame(1) // Placeholder
  return c.json({ code: 0, data, message: 'Success' })
}

export const favoriteGame = async (c: Context) => {
  const data = await service.favoriteGame(1) // Placeholder
  return c.json({ code: 0, data, message: 'Success' })
}

export const gameHistory = async (c: Context) => {
  const data = await service.gameHistory(1) // Placeholder
  return c.json({ code: 0, data, message: 'Success' })
}

export const spinPage = async (c: Context) => {
  const data = await service.spinPage(1) // Placeholder
  return c.json({ code: 0, data, message: 'Success' })
}

export const spin = async (c: Context) => {
  const data = await service.spin(1) // Placeholder
  return c.json({ code: 0, data, message: 'Success' })
}

export const favoriteGameList = async (c: Context) => {
  const data = await service.favoriteGameList(1) // Placeholder
  return c.json({ code: 0, data, message: 'Success' })
}
