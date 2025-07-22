import { Context } from 'hono'
import * as service from './games.service'

// Existing functions
export const getGameCategories = async (c: Context) => {
  const data = await service.findGameCategories()
  return c.json({ code: 0, data, message: 'Success' })
}



// New and updated functions
export const getAllGames = async (c: Context) => {
    console.log('hsdfsfher')
    const data = await service.findAllGames();
    console.log(data)
    return c.json(data);
}

export const searchGames = async (c: Context) => {
    const { game_categories_slug, page, limit } = c.req.query();
    const data = await service.searchGames({
        game_categories_slug,
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
    });
    return c.json({ list: data.games, total: data.total });
}

export const getUserGames = async (c: Context) => {
    const { game_categories_slug, page, limit } = c.req.query();
    const userId = c.get('userId'); // Assuming you have middleware to get userId
    const data = await service.findUserGames(userId, {
        game_categories_slug,
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10
    });
    return c.json({ list: data.games, total: data.total });
}

export const favoriteGame = async (c: Context) => {
    const userId = c.get('userId');
    const { add_game, del_game } = await c.req.json();
    if (add_game) {
        await service.addFavoriteGame(userId, add_game);
    } else if (del_game) {
        await service.removeFavoriteGame(userId, del_game);
    }
    return c.json({ message: 'Success' });
}

export const getFavoriteGames = async (c: Context) => {
    const userId = c.get('userId');
    const data = await service.findFavoriteGames(userId);
    return c.json(data);
}

export const enterGame = async (c: Context) => {
    const user = c.get('user')
    const userId = user.id
    const id = c.req.param('id')
    const gameId = id
    const token = c.get('token')
    console.log('enterGame', userId, gameId)
    
    const data = await service.enterGame(userId, gameId, token);
    console.log(data)
    return c.json(data)
};

export const leaveGame = async (c: Context) => {
    const userId = c.get('userId');
    await service.leaveGame(userId);
    return c.json({ message: 'Success' });
};

export const getGameHistory = async (c: Context) => {
    const userId = c.get('userId');
    const data = await service.findGameHistory(userId);
    return c.json(data);
};