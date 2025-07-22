import type { Context } from 'hono';
import * as service from './viplevel.service';
/**
 * List all VipLevel records.
 */
export const listVipLevel = async (c: Context) => {
  
  try {
    const item = await service.findManyVipLevel(c); // Pass context first, then other args
    
    // Always return status code explicitly for better type matching with openapi()
    return c.json(item, 200);
  } catch (error: unknown) {
    // Check for Prisma client not found in context
    if (error instanceof Error && error.message.includes('Prisma client not found in context')) {
      console.error('Prisma client not found in context. Make sure to use the prismaMiddleware.');
      return c.json({ error: 'Database connection error. Please try again later.' }, 500);
    }
    
    // Generic error handling for other cases
    const message = `Error list vip leveling VipLevel: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(message, error); // Log the detailed error
    return c.json({ error: `Failed to list VipLevel` }, 500);
  }
};

/**
 * Create a new VipLevel.
 */
export const createVipLevel = async (c: Context) => {
  const data = getValidData(c, 'json');
  try {
    const item = await service.createVipLevel(c, data); // Pass context first, then other args
    
    // Always return status code explicitly for better type matching with openapi()
    return c.json(item, 201);
  } catch (error: unknown) {
    // Check for Prisma client not found in context
    if (error instanceof Error && error.message.includes('Prisma client not found in context')) {
      console.error('Prisma client not found in context. Make sure to use the prismaMiddleware.');
      return c.json({ error: 'Database connection error. Please try again later.' }, 500);
    }
    
    // Generic error handling for other cases
    const message = `Error create vip leveling VipLevel: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(message, error); // Log the detailed error
    return c.json({ error: `Failed to create VipLevel` }, 500);
  }
};

/**
 * Get a VipLevel by ID.
 */
export const getVipLevelById = async (c: Context) => {
  const { id } = getValidData(c, 'param');
  try {
    const item = await service.findVipLevelById(c, id); // Pass context first, then other args
    
    if (!item) {
      return c.json({ error: 'VipLevel not found' }, 404);
    }
    // Always return status code explicitly for better type matching with openapi()
    return c.json(item, 200);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      // Use the specific ID in the error message if available
      const message = `Error get vip level by iding VipLevel ${id}: Record not found`;
      console.error(message, error);
      return c.json({ error: 'VipLevel not found' }, 404);
    }
    // Check for Prisma client not found in context
    if (error instanceof Error && error.message.includes('Prisma client not found in context')) {
      console.error('Prisma client not found in context. Make sure to use the prismaMiddleware.');
      return c.json({ error: 'Database connection error. Please try again later.' }, 500);
    }
    
    // Generic error handling for other cases
    const message = `Error get vip level by iding VipLevel ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(message, error); // Log the detailed error
    return c.json({ error: `Failed to get VipLevel` }, 500);
  }
};

/**
 * Update a VipLevel by ID.
 */
export const updateVipLevel = async (c: Context) => {
  const { id } = getValidData(c, 'param');
  const data = getValidData(c, 'json');
  try {
    const item = await service.updateVipLevel(c, id, data); // Pass context first, then other args
    
    // Always return status code explicitly for better type matching with openapi()
    return c.json(item, 200);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      // Use the specific ID in the error message if available
      const message = `Error update vip leveling VipLevel ${id}: Record not found`;
      console.error(message, error);
      return c.json({ error: 'VipLevel not found' }, 404);
    }
    // Check for Prisma client not found in context
    if (error instanceof Error && error.message.includes('Prisma client not found in context')) {
      console.error('Prisma client not found in context. Make sure to use the prismaMiddleware.');
      return c.json({ error: 'Database connection error. Please try again later.' }, 500);
    }
    
    // Generic error handling for other cases
    const message = `Error update vip leveling VipLevel ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(message, error); // Log the detailed error
    return c.json({ error: `Failed to update VipLevel` }, 500);
  }
};

/**
 * Delete a VipLevel by ID.
 */
export const deleteVipLevel = async (c: Context) => {
  const { id } = getValidData(c, 'param');
  try {
    const item = await service.deleteVipLevel(c, id); // Pass context first, then other args
    
    // Always return status code explicitly for better type matching with openapi()
    return c.json(item, 200);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      // Use the specific ID in the error message if available
      const message = `Error delete vip leveling VipLevel ${id}: Record not found`;
      console.error(message, error);
      return c.json({ error: 'VipLevel not found' }, 404);
    }
    // Check for Prisma client not found in context
    if (error instanceof Error && error.message.includes('Prisma client not found in context')) {
      console.error('Prisma client not found in context. Make sure to use the prismaMiddleware.');
      return c.json({ error: 'Database connection error. Please try again later.' }, 500);
    }
    
    // Generic error handling for other cases
    const message = `Error delete vip leveling VipLevel ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(message, error); // Log the detailed error
    return c.json({ error: `Failed to delete VipLevel` }, 500);
  }
};
