import type { User } from "@/plugins/api/gen";


export interface Bet {
    _id: string;
    method: 'crash' | 'roll' | 'blackjack' | 'duels' | 'mines' | 'towers' | 'unbox' | 'battles' | string;
    user: User | null;
    updatedAt: string | Date;
    amount: number | { main: number; sideLeft: number; sideRight: number }; // Handle complex amount for blackjack
    payout: number;
    multiplier: number;
    actions?: string[]; // Optional property for games like blackjack
}