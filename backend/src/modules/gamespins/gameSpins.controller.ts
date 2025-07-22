// routes/gameSpin/gameSpin.controller.ts
import { Context } from 'hono'
import * as service from './gameSpins.service'

export const createGameSpin = async (c: Context) => {
  const user = c.get('user')
  const body = await c.req.json()

  // The user's active session is required to create a spin
  if (!user.currentSessionDataId) {
    return c.json({ error: 'User is not in an active game session' }, 400)
  }

  const newSpin = await service.createSpin({
    ...body,
    userId: user.id,
    playerName: user.username,
    playerAvatar: user.playerAvatar,
    sessionId: user.currentSessionDataId,
  })

  return c.json(newSpin, 201)
}

export const getGameSpins = async (c: Context) => {
  // const user = c.get('user')
  const spins = await service.findSpins()
  return c.json(spins)
}

export const getTopWins = async (c: Context) => {
  console.log('here ')
    const topSpins = await service.findTopWins();
    return c.json(topSpins);
};

export const getGameSpinById = async (c: Context) => {
    const { id } = c.req.param();
    const user = c.get('user');
    const spin = await service.findSpinById(id, user.id);

    if (!spin) {
        return c.json({ error: 'Spin not found or you do not have permission to view it' }, 404);
    }
    return c.json(spin);
};

export const updateGameSpin = async (c: Context) => {
    const { id } = c.req.param();
    const user = c.get('user');
    const body = await c.req.json();

    const updatedSpin = await service.updateSpin(id, body, user.id);

    if (!updatedSpin) {
        return c.json({ error: 'Spin not found or you do not have permission to update it' }, 404);
    }
    return c.json(updatedSpin);
};

export const deleteGameSpin = async (c: Context) => {
    const { id } = c.req.param();
    const user = c.get('user');

    const result = await service.deleteSpin(id, user.id);
    if (!result) {
        return c.json({ error: 'Spin not found or you do not have permission to delete it' }, 404);
    }
    return c.json({ message: 'Spin deleted successfully' });
};

export const getUserGameSpins = async (c: Context) => {
    const { page, limit } = c.req.query();
    const userId = c.get('userId'); // Assuming you have middleware to get userId
    const data = await service.findUserGameSpins(userId, {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10
    });
    return c.json({ list: data.games, total: data.total });
}
