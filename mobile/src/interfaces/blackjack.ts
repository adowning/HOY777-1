export type CardRank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'hidden';
export type CardSuit = 'club' | 'spade' | 'heart' | 'diamond';

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
