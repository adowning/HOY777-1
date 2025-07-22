// src/types/drizzle.types.ts
import {
    games,
    gameSessions,
    gameSpins,
    jackpots,
    jackpotContributions,
    jackpotWins,
    operators,
    products,
    sessions,
    transactions,
    users,
    vipInfo,
    wallets
} from '#/db/schema';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// Base types - for selecting data
export type Game = InferSelectModel<typeof games>;
export type GameSession = InferSelectModel<typeof gameSessions>;
export type GameSpin = InferSelectModel<typeof gameSpins>;
export type Jackpot = InferSelectModel<typeof jackpots>;
export type JackpotContribution = InferSelectModel<typeof jackpotContributions>;
export type JackpotWin = InferSelectModel<typeof jackpotWins>;
export type Operator = InferSelectModel<typeof operators>;
export type Product = InferSelectModel<typeof products>;
export type Session = InferSelectModel<typeof sessions>;
export type Transaction = InferSelectModel<typeof transactions>;
export type User = InferSelectModel<typeof users>;
export type VipInfo = InferSelectModel<typeof vipInfo>;
export type Wallet = InferSelectModel<typeof wallets>;

// Insert types - for creating new records
export type InsertGame = InferInsertModel<typeof games>;
export type InsertGameSession = InferInsertModel<typeof gameSessions>;
export type InsertGameSpin = InferInsertModel<typeof gameSpins>;
export type InsertJackpot = InferInsertModel<typeof jackpots>;
export type InsertJackpotContribution = InferInsertModel<typeof jackpotContributions>;
export type InsertJackpotWin = InferInsertModel<typeof jackpotWins>;
export type InsertOperator = InferInsertModel<typeof operators>;
export type InsertProduct = InferInsertModel<typeof products>;
export type InsertSession = InferInsertModel<typeof sessions>;
export type InsertTransaction = InferInsertModel<typeof transactions>;
export type InsertUser = InferInsertModel<typeof users>;
export type InsertVipInfo = InferInsertModel<typeof vipInfo>;
export type InsertWallet = InferInsertModel<typeof wallets>;

// Relational types
export type UserWithRelations = User & {
    sessions: Session[];
    wallets: Wallet[];
};

export type GameSessionWithRelations = GameSession & {
    user: User;
    game: Game;
    spins: GameSpin[];
};

export type GameSpinWithRelations = GameSpin & {
    gameSession: GameSession;
    jackpotContributions: JackpotContribution[];
    jackpotWin?: JackpotWin;
};

export type JackpotWithRelations = Jackpot & {
    contributions: JackpotContribution[];
    wins: JackpotWin[];
};

export type RTGSettingsRequestDto = unknown;
export type RTGSettingsResponseDto = unknown;
export type RTGSpinRequestDto = unknown;
export type RTGSpinResponseDto = unknown;
export type ProviderSpinResponseData = unknown;
export type RtgSpinResult = unknown;
export type GameCategory = unknown;
export type UserProfile = unknown;