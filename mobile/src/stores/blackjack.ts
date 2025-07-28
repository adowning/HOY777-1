import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useSocketStore } from './socket';
import { useAuthStore } from './auth.store';
import { useNotificationStore } from './notifications';

export interface Card {
    rank: CardRank;
    suit: CardSuit;
}

export interface Bet {
    amount: {
        main: number;
        sideLeft: number;
        sideRight: number;
    };
    actions: string[];
    cards: Card[];
    cardsLeft: Card[];
    cardsRight: Card[];
}

export interface Player {
    seat: number;
    user: {
        _id: string;
        username: string;
        avatar: string;
    };
    bet: Bet | null;
}

export interface Game {
    _id: string;
    type: 'standard' | 'whale';
    state: 'created' | 'countdown' | 'running' | 'completed';
    updatedAt: string;
    dealerCards: Card[];
}

export interface BlackjackTable {
    table: number; // The table index/ID
    game: Game;
    players: Player[];
    playersPos: number | 'all' | null; // The seat index of the current player
}

export interface RecentBet {
    seat: number;
    amount: number;
}

export const useBlackjackStore = defineStore('blackjack', () => {
    const recent = ref<any[] | null>(null);
    const tables = ref<any[]>([]);

    const socketStore = useSocketStore();
    const authStore = useAuthStore();
    const notificationsStore = useNotificationStore();

    function setRecent(bets: Bet[]) {
        recent.value = bets;
    }

    function setTables(newTables: BlackjackTable[]) {
        tables.value = newTables;
    }

    function updateTable(table: BlackjackTable) {
        const index = tables.value.findIndex((t) => t.table === table.table);
        if (index !== -1) {
            tables.value.splice(index, 1, table);
        }
    }

    function socketInit(data: { tables: BlackjackTable[] }) {
        setTables(data.tables);
    }

    function socketTable(data: { table: BlackjackTable }) {
        if (data.table.game.state === 'completed' && authStore.currentUser) {
            setRecent(
                data.table.players
                    .filter((player: Player) => player.user.id === authStore.currentUser!.id)
                    .map((player: Player) => ({ seat: player.bet.seat, amount: player.bet.amount }))
            );
        }
        updateTable(data.table);
    }

    function sendJoin(data: any) {
        if (!socketStore.blackjack || socketStore.sendLoading) return;
        socketStore.setSendLoading('BlackjackJoin');
        socketStore.blackjack.emit('sendJoin', data, (res: any) => {
            if (!res.success) {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendBet(data: any) {
        if (!socketStore.blackjack || socketStore.sendLoading) return;
        socketStore.setSendLoading('BlackjackBet');
        socketStore.blackjack.emit('sendBet', data, (res: any) => {
            if (res.success) {
                authStore.setUser(res.user);
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendClear(data: any) {
        if (!socketStore.blackjack || socketStore.sendLoading) return;
        socketStore.setSendLoading('BlackjackClear');
        socketStore.blackjack.emit('sendClear', data, (res: any) => {
            if (res.success) {
                authStore.setUser(res.user);
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendInsurance(data: any) {
        if (!socketStore.blackjack || socketStore.sendLoading) return;
        socketStore.setSendLoading('BlackjackInsurance');
        socketStore.blackjack.emit('sendInsurance', data, (res: any) => {
            if (!res.success) {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendHit(data: any) {
        if (!socketStore.blackjack || socketStore.sendLoading) return;
        socketStore.setSendLoading('BlackjackHit');
        socketStore.blackjack.emit('sendHit', data, (res: any) => {
            if (!res.success) {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendStand(data: any) {
        if (!socketStore.blackjack || socketStore.sendLoading) return;
        socketStore.setSendLoading('BlackjackStand');
        socketStore.blackjack.emit('sendStand', data, (res: any) => {
            if (!res.success) {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendSplit(data: any) {
        if (!socketStore.blackjack || socketStore.sendLoading) return;
        socketStore.setSendLoading('BlackjackSplit');
        socketStore.blackjack.emit('sendSplit', data, (res: any) => {
            if (!res.success) {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendDouble(data: any) {
        if (!socketStore.blackjack || socketStore.sendLoading) return;
        socketStore.setSendLoading('BlackjackDouble');
        socketStore.blackjack.emit('sendDouble', data, (res: any) => {
            if (!res.success) {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    return {
        recent,
        tables,
        setRecent,
        setTables,
        updateTable,
        socketInit,
        socketTable,
        sendJoin,
        sendBet,
        sendClear,
        sendInsurance,
        sendHit,
        sendStand,
        sendSplit,
        sendDouble
    };
}, {
    persist: true
});