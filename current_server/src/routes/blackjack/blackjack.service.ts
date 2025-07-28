import type { JoinPayload, BlackjackTable, BetPayload } from './types'
import {
    blackjackCheckSendJoinData,
    blackjackCheckSendJoinTable,
    blackjackCheckSendJoinUser,
    blackjackCheckSendBetData,
    blackjackCheckSendBetTable,
    blackjackCheckSendBetBets,
    blackjackCheckSendBetSeat,
    blackjackCheckSendBetUser,
    blackjackTableListSanitize,
    blackjackTableSanitize,
    blackjackGetBetAmount,
} from './utils/blackjack.utils'
import { socketRemoveAntiSpam } from './utils/socket'
import { generalUserGetRakeback } from './utils/user'
import { TableUpdateMessage, UserUpdateMessage } from './blackjack.schema'
import type { ServerWebSocket } from 'bun'
import db from '#/db'
import { BlackjackBet, User } from '#/db/schema'
import { eq } from 'drizzle-orm'
import type { UserWithRelations } from '#/db/schema'

const blackjackTables: BlackjackTable[] = []
const blackjackBetPendingCounts: { [key: string]: number } = {}

// ============================================================================
// Exported Functions
// ============================================================================

export function blackjackGetData() {
    return { tables: blackjackTableListSanitize(blackjackTables) }
}

export async function blackjackSendJoinSocket(
    ws: ServerWebSocket<any>,
    payload: JoinPayload
) {
    const user = ws.data.user
    blackjackCheckSendJoinData(payload)
    const blackjackIndexTable = blackjackTables.findIndex(
        (element) => element.table === Math.floor(payload.table)
    )
    const blackjackTable = blackjackTables[blackjackIndexTable]
    blackjackCheckSendJoinTable(payload, user, blackjackTable)
    blackjackCheckSendJoinUser(user, blackjackTable!)
    if (!blackjackTable) {
        throw new Error('Table not found')
    }
    const level = Math.floor(
        (user!.vipInfo[0]!.totalXp / 1000 / 100) ** (1 / 3)
    )
    const rakeback = generalUserGetRakeback(user)

    blackjackTable.players.push({
        seat: payload.seat,
        user: {
            ...user,
            level,
            rakeback: rakeback.name,
        },
        bet: null,
    })

    blackjackTable.players.sort((a, b) => a.seat - b.seat)

    if (blackjackTable.game.state === 'created') {
        blackjackGameCountdown(blackjackTable)
    }

    return {
        broadcasts: [
            {
                topic: 'blackjack',
                schema: TableUpdateMessage,
                payload: { table: blackjackTableSanitize(blackjackTable) },
            },
        ],
        response: { success: true },
    }
}

export async function blackjackSendBetSocket(
    user: UserWithRelations,
    payload: BetPayload
) {
    const { table: tableId, bets } = payload
    const blackjackIndexTable = blackjackTables.findIndex((t) => t.table === tableId)
    const blackjackTable = blackjackTables[blackjackIndexTable]
    if (!blackjackTable) {
        throw new Error('Table not found')
    }
    blackjackCheckSendBetData(payload)
    blackjackCheckSendBetTable(blackjackTable)
    blackjackCheckSendBetBets(bets)

    let amountTotal = 0
    for (const bet of bets) {
        const blackjackSeat = blackjackTable.players.find(
            (p) => p.seat === bet.seat
        )
        blackjackCheckSendBetSeat(bet, user, blackjackTable, blackjackSeat)
        amountTotal += blackjackGetBetAmount(bet.amount)
    }
    blackjackCheckSendBetUser(user, amountTotal)

    try {
        blackjackBetPendingCounts[tableId.toString()] =
            (blackjackBetPendingCounts[tableId.toString()] || 0) + 1

        const result = await db.transaction(async (tx) => {
            const [updatedUser] = await tx
                .update(User)
                .set({
                    activeWalletId: user.activeWallet!.id,
                })
                .where(eq(User.id, user.id))
                .returning()

            const betPromises = bets.map(async (betData) => {
                const blackjackSeat = blackjackTable.players.find(
                    (p) => p.seat === betData.seat
                )
                const betId = blackjackSeat?.bet?.id

                if (betId) {
                    const [bet] = await tx
                        .select()
                        .from(BlackjackBet)
                        .where(eq(BlackjackBet.id, betId))
                    const amt = {
                        main: (bet!.amount as any).main + betData.amount.main,
                        sideLeft:
                            (bet!.amount as any).sideLeft + betData.amount.sideLeft,
                        sideRight:
                            (bet!.amount as any).sideRight +
                            betData.amount.sideRight,
                    }
                    return tx
                        .update(BlackjackBet)
                        .set({ amount: amt })
                        .where(eq(BlackjackBet.id, betId))
                        .returning()
                } else {
                    return tx
                        .insert(BlackjackBet)
                        .values({
                            amount: {
                                main: Math.floor(betData.amount.main),
                                sideLeft: Math.floor(betData.amount.sideLeft),
                                sideRight: Math.floor(
                                    betData.amount.sideRight
                                ),
                            },
                            cards: [],
                            actions: ['created'],
                            seat: betData.seat,
                            gameId: blackjackTable.game.id,
                            userId: user.id,
                        })
                        .returning()
                }
            })

            const createdOrUpdatedBets = await Promise.all(betPromises)
            return { updatedUser, bets: createdOrUpdatedBets }
        })

        result.bets.forEach((dbBet) => {
            const seatIndex = blackjackTable.players.findIndex(
                (p) => p.seat === dbBet[0].seat
            )
            if (seatIndex !== -1 && blackjackTable.players[seatIndex]) {
                // @ts-ignore
                blackjackTable.players[seatIndex].bet = dbBet[0]
            }
        })

        return {
            broadcasts: [
                {
                    topic: 'blackjack',
                    schema: TableUpdateMessage,
                    payload: { table: blackjackTableSanitize(blackjackTable) },
                },
            ],
            direct: {
                schema: UserUpdateMessage,
                payload: { user: result.updatedUser },
            },
            response: { success: true, user: result.updatedUser },
        }
    } finally {
        blackjackBetPendingCounts[tableId.toString()]--
        socketRemoveAntiSpam(user.id)
    }
}

export async function blackjackSendClearSocket() {
    // Implementation goes here
}

export async function blackjackSendInsuranceSocket() {
    // Implementation goes here
}

export async function blackjackSendHitSocket() {
    // Implementation goes here
}

export async function blackjackSendStandSocket() {
    // Implementation goes here
}

export async function blackjackSendSplitSocket() {
    // Implementation goes here
}

export async function blackjackSendDoubleSocket() {
    // Implementation goes here
}

function blackjackGameCountdown() {
    // Implementation goes here
}
