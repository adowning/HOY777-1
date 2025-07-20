import { Context } from 'hono'
import * as service from './vipinfo.service'

export const getVipInfo = async (c: Context) => {
  const data = await service.findVipInfo(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const getVipLevels = async (c: Context) => {
  const data = await service.findManyVipLevels()
  return c.json({ code: 0, data, message: 'Success' })
}

export const getVipTasks = async (c: Context) => {
  const data = await service.findVipTasks(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const claimVipLevelAward = async (c: Context) => {
  const data = await service.claimVipLevelAward(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const claimVipRebateAward = async (c: Context) => {
  const data = await service.claimVipRebateAward(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const getVipRebateHistory = async (c: Context) => {
  const data = await service.findVipRebateHistory(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const getVipLevelAwardHistory = async (c: Context) => {
  const data = await service.findVipLevelAwardHistory(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const getVipTimesHistory = async (c: Context) => {
  const data = await service.findVipTimesHistory(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const claimVipSigninRewards = async (c: Context) => {
  const data = await service.claimVipSigninRewards(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const getVipSigninList = async (c: Context) => {
  const data = await service.findVipSigninList(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const receiveVipSigninAward = async (c: Context) => {
  const data = await service.receiveVipSigninAward(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const getVipLevelUpList = async (c: Context) => {
  const data = await service.findVipLevelUpList(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const receiveVipLevelUpAward = async (c: Context) => {
  const data = await service.receiveVipLevelUpAward(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const getVipCycleAwardList = async (c: Context) => {
  const data = await service.findVipCycleAwardList(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const receiveVipCycleAward = async (c: Context) => {
  const data = await service.receiveVipCycleAward(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const getVipLevelAwardList = async (c: Context) => {
  const data = await service.findVipLevelAwardList(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const receiveVipLevelAward = async (c: Context) => {
  const data = await service.receiveVipLevelAward(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const getVipBetAwardList = async (c: Context) => {
  const data = await service.findVipBetAwardList(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}

export const receiveVipBetAward = async (c: Context) => {
  const data = await service.receiveVipBetAward(1) // Placeholder user ID
  return c.json({ code: 0, data, message: 'Success' })
}
