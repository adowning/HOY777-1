import { UserWithRelations } from '#/db/schema'

interface SocketActiveConnections {
    [key: string]: string[]
}

const socketActiveConnections: SocketActiveConnections = {
    general: [],
    crash: [],
    roll: [],
    blackjack: [],
    duels: [],
    combat_legend: [],
    mines: [],
    towers: [],
    unbox: [],
    slots: [],
    battles: [],
    upgrader: [],
    cashier: [],
    admin: [],
}

const socketActiveRequests: string[] = []

export function socketCheckUserData(
    user: UserWithRelations | null,
    checkAuth: boolean
): void {
    if (checkAuth && !user) {
        throw new Error('You need to sign in to perform this action.')
    }
    // if (checkAuth && user!.banExpire && new Date(user!.banExpire).getTime() > Date.now()) {
    //     throw new Error(`You are banned for the following reason: ${user!.banReason}.`);
    // }
}

// export function socketCheckUserRank(
//     user: UserWithRelations | undefined,
//     ranks: string[] | undefined
// ): void {
//     // if (user === undefined || ranks === undefined) {
//     //     throw new Error('Something went wrong. Please try again in a few seconds.');
//     // } else if (user.vipInfo.rank === undefined || !ranks.includes(user.vipInfo.rank)) {
//     //     throw new Error('You are not authorized to perform the requested action.');
//     // }
// }

export function socketAddConnectionLimit(
    room: string,
    identifier: string
): void {
    if (socketActiveConnections[room]) {
        socketActiveConnections[room].push(identifier.toString())
    }
}


export function socketRemoveConnectionLimit(
    room: string,
    identifier: string
): void {
    // const index = socketActiveConnections[room].findIndex((element) => element === identifier.toString());
    // if (index !== -1) { socketActiveConnections[room].splice(index, 1); }
}

export function socketCheckAntiSpam(identifier: string): Promise<void> {
    return new Promise(async (resolve) => {
        resolve()
    })
}

export function socketRemoveAntiSpam(identifier: string): void {
    const index = socketActiveRequests.indexOf(identifier.toString())
    if (index !== -1) {
        socketActiveRequests.splice(index, 1)
    }
}
