import type { Context } from 'hono'

import { SessionManager } from '#/lib/session.manager'

import * as service from './players.service'

// Basic CRUD
export async function listPlayer(c: Context) {
    const { limit, page, sortBy, sortOrder } = c.req.query()
    const limitNum = limit ? Number.parseInt(limit, 10) : 10
    const pageNum = page ? Number.parseInt(page, 10) : 1
    const offset = (pageNum - 1) * limitNum

    const data = await service.findManyPlayer({
        limit: limitNum,
        offset,
        sortBy,
        sortOrder,
    })
    return c.json(data, 200)
}

export async function createPlayer(c: Context) {
    const data = await c.req.json()
    const newPlayer = await service.createPlayer(data)
    return c.json(newPlayer[0], 201)
}

export async function getPlayerById(c: Context) {
    const id = c.req.param('id')
    const player = await service.findPlayerById(id)
    if (!player || player.length === 0) {
        return c.json({ error: 'Player not found' }, 404)
    }
    return c.json(player[0], 200)
}

export async function updatePlayer(c: Context) {
    const id = c.req.param('id')
    const data = await c.req.json()
    const updatedPlayer = await service.updatePlayer(id, data)
    if (!updatedPlayer || updatedPlayer.length === 0) {
        return c.json({ error: 'Player not found' }, 404)
    }
    return c.json(updatedPlayer[0], 200)
}

export async function deletePlayer(c: Context) {
    const id = c.req.param('id')
    const deletedPlayer = await service.deletePlayer(id)
    if (!deletedPlayer || deletedPlayer.length === 0) {
        return c.json({ error: 'Player not found' }, 404)
    }
    return c.json({ id: deletedPlayer[0].id }, 200)
}

// From Pinia Store & HAR files
export async function checkPlayer(c: Context) {
    const playerId = c.req.param('id')
    const player = await service.checkPlayer(playerId)
    if (!player || player.length === 0) {
        return c.json({ error: 'Player not found' }, 404)
    }
    return c.json({ playerCheck: true }, 200)
}

export async function verifyEmail(c: Context) {
    const playerId = c.req.param('id')
    const result = await service.sendEmailVerification(playerId)
    return c.json(result, 200)
}

export async function getInfo(c: Context) {
    const playerId = c.req.param('id')
    const info = await service.getPlayerInfo(playerId)
    if (!info || info.length === 0) {
        return c.json({ error: 'Player not found' }, 404)
    }
    return c.json(info[0], 200)
}

export async function getVipInfo(c: Context) {
    const playerId = c.req.param('id')
    const vipInfo = await service.getVipInfo(playerId)
    if (!vipInfo || vipInfo.length === 0) {
        return c.json({ vipLevel: null }, 200)
    }
    return c.json(vipInfo[0], 200)
}

// New Routes
export async function getPlayerAmount(c: Context) {
    const data = await service.getPlayerAmount()
    return c.json(data, 200)
}

export async function updatePlayerInfo(c: Context) {
    const data = await c.req.json()
    const updatedPlayer = await service.updatePlayerInfo(data)
    return c.json(updatedPlayer, 200)
}

export async function updateEmail(c: Context) {
    const data = await c.req.json()
    const updatedPlayer = await service.updateEmail(data)
    return c.json(updatedPlayer, 200)
}

export async function updatePassword(c: Context) {
    const data = await c.req.json()
    await service.updatePassword(data)
    return c.json({ message: 'Password updated' }, 200)
}

export async function suspendPlayer(c: Context) {
    const data = await c.req.json()
    await service.suspendPlayer(data)
    return c.json({ message: 'Player suspended' }, 200)
}

// export async function getBalanceList(c: Context) {
//   const data = await service.getBalanceList();
//   return c.json(data, 200);
// }

// Game Routes
export async function enterGame(c: Context) {
    const data = await service.enterGame() // Placeholder
    return c.json({ code: 0, data, message: 'Success' })
}

export async function playerGame(c: Context) {
    const data = await service.playerGame() // Placeholder
    return c.json({ code: 0, data, message: 'Success' })
}

export async function favoriteGame(c: Context) {
    const data = await service.favoriteGame() // Placeholder
    return c.json({ code: 0, data, message: 'Success' })
}

// export async function gameHistory(c: Context) {
//   const playerId = c.req.param("id");
//   const data = await service.getGameHistory(playerId); // Placeholder
//   return c.json({ code: 0, data, message: "Success" });
// }

export async function spinPage(c: Context) {
    const data = await service.spinPage() // Placeholder
    return c.json({ code: 0, data, message: 'Success' })
}

export async function spin(c: Context) {
    const data = await service.spin() // Placeholder
    return c.json({ code: 0, data, message: 'Success' })
}

export async function favoriteGameList(c: Context) {
    const data = await service.favoriteGameList() // Placeholder
    return c.json({ code: 0, data, message: 'Success' })
}

export async function startSession(c: Context) {
    const { gameId } = await c.req.json()
    const session = await SessionManager.startGameSession(c, gameId)
    return c.json(session, 200)
}

export async function endSession(c: Context) {
    const player = c.get('player')
    if (!player) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    await SessionManager.endCurrentGameSession(player.id)
    return c.json({ success: true, message: 'Game session ended.' })
}
