import type { Game, GameSession, GameSpin, Wallet } from '#/db';

export interface LuckyBetInfo {
    id: string; // spin id
    username: string | null;
    avatar: string | null;
    gameName: string | null;
    winAmount: number; // in cents
    wagerAmount: number; // in cents
    multiplier: number | null;
    timestamp: Date;
    userId?: string; // Added for internal processing
}

export interface NolimitGameLaunchOptions {
    gameName: string;
    user: {
        id: string | number;
    };
}

export interface NetGameOptions {
    gameName: string;
    token: string;
    url: string;
}

export interface RtgGameLaunchOptions {
    gameName: string; // e.g., "777Strike"
    lang?: string;
    currency?: string;
    mode?: 'real' | 'demo';
    rgsApiBase?: string;
    gameCdnBase?: string;
    operator?: string;
    provider?: string;
    depositUrl?: string;
    lobbyUrl?: string;
}

export interface OutputGameBigWinItem {
    id: string;
    userId: string;
    username: string | null;
    avatar: string | null;
    gameId: string | null;
    gameName: string | null;
    winAmount: number;
    wagerAmount: number;
    multiplier?: number | null;
    timestamp: Date;
    total_wagered_cents?: number;
    rank?: number;
    currency_code?: string;
    description?: string | null;
}

export interface GameBigWinResponseData {
    high_rollers: OutputGameBigWinItem[];
    lucky_bets: OutputGameBigWinItem[];
}

export interface HighRollerInfo {
    userId: string;
    username: string | null;
    avatar: string | null;
    totalWagered: number; // in cents, over a period
    lastActivity: Date;
}

export interface ProviderSettingsResponseData {
    user: {
        balance: { cash: string; freeBets?: string; bonus?: string;[key: string]: unknown };
        canGamble: boolean;
        userId: number | string;
        sessionId: string;
        sessionNetPosition?: string;
        token: string;
        country?: string;
        currency?: { code: string; symbol: string };
        stakes?: unknown;
        limits?: unknown;
        serverTime: string;
        [key: string]: unknown;
    };
    game?: {
        version?: string;
        gameType?: string;
        [key: string]: unknown;
    };
    launcher?: {
        version?: string;
        [key: string]: unknown;
    };
    jackpots?: unknown;
}

export interface RTGSettingsResponseDto {
    success: boolean;
    result?: ProviderSettingsResponseData;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
}

export interface ProviderSpinResponseData {
    transactions: {
        roundId: number | string;
        [key: string]: unknown;
    };
    user: {
        balance: {
            cash: { atStart?: string; afterBet?: string; atEnd: string };
            freeBets?: { atStart?: string; afterBet?: string; atEnd: string };
            bonus?: { atStart?: string; afterBet?: string; atEnd: string };
            [key: string]: unknown;
        };
        userId: number | string;
        sessionId: string;
        sessionNetPosition?: string;
        token: string;
        serverTime: string;
        canGamble?: boolean;
        [key: string]: unknown;
    };
    game: {
        win: {
            instantWin?: string;
            lines?: string;
            total: string;
            [key: string]: unknown;
        };
        stake: string;
        multiplier?: number;
        winLines?: unknown[];
        reelsBuffer?: Array<Array<number[]>>;
        [key: string]: unknown;
    };
    jackpots?: unknown | null;
    bonusChance?: unknown | null;
}

export type RtgSpinResult = ProviderSpinResponseData;

export interface RTGSpinResponseDto {
    success: boolean;
    result?: RtgSpinResult;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
}

export interface RTGSettingsRequestDto {
    gameName?: string;
    gameSessionId?: string;
    gameId: string;
    token: string;
    userId: string;
    currency: string;
    language: string;
    playMode: 'real' | 'demo' | 'test';
    custom?: { siteId?: string; extras?: string;[key: string]: unknown };
    userData?: {
        userId?: string | number;
        hash?: string;
        affiliate?: string;
        lang?: string;
        channel?: string;
        userType?: string;
        fingerprint?: string;
        [key: string]: unknown;
    };
}

export interface RTGSpinRequestDto {
    gameSessionId?: string;
    gameName?: string;
    token: string;
    userId: string;
    gameId: string;
    stake: number | string;
    currency: string;
    sessionId: string;
    playMode?: 'real' | 'demo' | 'test';
    actions?: unknown[];
    custom?: { siteId?: string; extras?: string;[key: string]: unknown };
    bonusId?: unknown;
    extras?: unknown;
    siteId?: string;
    userType?: string;
    lang?: string | number;
    fingerprint?: string | number;
    channel?: string | number;
    affiliate?: string | number;
    userData?: {
        userId?: string | number;
        affiliate?: string;
        lang?: string;
        channel?: string;
        userType?: string;
        [key: string]: unknown;
    };
    roundId?: string | number;
    transactionId?: string | number;
}

export interface GamePlatformSpinResultDetails {
    betTransaction: unknown;
    winTransaction?: unknown | null;
    finalPlatformWallet: Wallet;
    updatedGameSession: GameSession;
    gameSpinRecord: GameSpin;
    xpAwardedThisSpin: number;
    tournamentPointsAwardedThisSpin: number;
}

export type GameCategoryName = 'TABLE' | 'FISH' | 'POKER' | 'SLOTS' | 'OTHER';

export interface GameListResponse {
    code: number;
    list: Game[];
    total: number;
}

export interface LaunchGameResponseDto {
    launch_url: string;
    game_session_id?: string;
    launch_strategy?: 'IFRAME' | 'REDIRECT' | 'POPUP';
    provider_parameters?: Record<string, unknown> | string;
}

export interface Autoplay {
    type: string;
    options: Options;
}

export interface Options {
    spins: RtgSpins;
    stopOnFeature: StopOnFeature;
    stopOnLossLimits: StopOnLossLimits;
    stopOnWin: StopOnWin;
    hasRestart: boolean;
}

export interface RtgSpins {
    values: string[];
    default: number;
}

export interface StopOnFeature {
    enabled: boolean;
}

export interface StopOnLossLimits {
    mandatory: boolean;
    enabled: boolean;
    values: string[];
    default: number;
}

export interface StopOnWin {
    enabled: boolean;
    values: string[];
}

export interface RtgSettingsBalance {
    cash: string;
    freeBets: string;
    sessionCash: string;
    sessionFreeBets: string;
    bonus: string;
}

export interface Currency {
    code: string;
    symbol: string;
}

export interface Limits {
    maxGambleStake: string;
    maxTotalStake: TotalStake;
    minTotalStake: TotalStake;
    spinDuration: null;
}

export interface TotalStake {
    total: string;
}

export interface Stakes {
    defaultIndex: number;
    lastIndex: number;
    types: string[];
}

export interface Search {
    id: string;
    name: string;
    image: string;
    developer: string;
    is_demo: boolean;
}

export interface GameItem {
    id: number;
    name: string;
    image: string;
    developer: string;
    producer: string;
    is_demo: boolean;
}

export interface GameEnterBody {
    id: string | Array<string>;
    demo: boolean;
}

export interface GameUserBody {
    game_categories_slug: string;
    id: string;
    demo: boolean;
    page: number;
    limit: number;
}

export interface GameEnterResponse {
    method: string;
    parames: string;
    developer: string;
    reserve: string;
    weburl: string;
}

export interface GameHistoryItem {
    name: string;
    created_at: number;
    amount: string | number;
    multiplier: string | number;
    bet_id: string | number;
    status: string | number;
    profit: number;
}

export interface GameBigWinItem {
    game_id: string;
    game_name: string;
    game_icon: string;
    user_name: string;
    user_vip_group: number;
    user_vip_level: number;
    bet_amount: string;
    multiplier: string;
    win_amount: string;
    time: number;
}

export interface GameBigWinData {
    high_rollers: Array<GameBigWinItem>;
    lucky_bets: Array<GameBigWinItem>;
}

export interface GameHistoryResponse {
    total_pages: number;
    record: Array<GameHistoryItem>;
}

export interface GameSearchResponse {
    items: Array<Game>;
    total: number;
}

export type GetGameFavoriteListResponse = {
    code: number;
    data: Array<number | string>;
    message: string;
};

export type GetGameBigWinResponse = {
    code: number;
    data: GameBigWinData;
    message: string;
};

export type Category = {
    name: string;
    games: Game[];
};

export type GetGameCategoriesResponse = {
    code: number;
    data: Array<unknown>;
    messsage: string;
};

export type GetGameEnterResponse = {
    code: number;
    data: GameEnterResponse;
    gameSession: GameSession;
    message: string;
};

export type GetGameHistoryResponse = {
    code: number;
    data: GameHistoryResponse;
    message: string;
};

export interface GameProvider {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    logo_url?: string | null;
    is_enabled: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface GameType {
    id: string;
    name: string;
    slug: string;
    provider_id: string;
    category_id?: string | null;
    description?: string | null;
    thumbnail_url?: string | null;
    banner_url?: string | null;
    external_game_id?: string | null;
    tags?: string[];
    rtp?: number | null;
    volatility?: string | null;
    is_active: boolean;
    is_featured?: boolean;
    launch_options?: Record<string, unknown> | null;
    created_at: Date;
    updated_at: Date;
    provider?: GameProvider;
}

export interface RawGameSpinBody {
    user_id: string;
    game_id: string;
    currency_id: string;
    rawVendorData: unknown;
    created_at: Date;
}

export interface RtgGame {
    win: Win;
    winsMultipliers: Win;
    stake: string;
    multiplier: number;
    winLines: unknown[];
    spinMode: string;
    fatTiles: FatTile[];
    instantWin: InstantWin;
    actions: Action[];
    scatters: unknown[];
    reelsBuffer: Array<Array<number[]>>;
    features: unknown[];
    hasState: boolean;
}

export interface Action {
    type: string;
    data: Data;
}

export interface Data {
    multiplier?: number;
    index?: number;
    fatTiles?: FatTile[];
}

export interface FatTile {
    tileId: number;
    reel: number;
    index: number;
    width: number;
    height: number;
    multiplier: number;
    amount: string;
}

export interface InstantWin {
    multiplier: string;
    amount: string;
    options: string[];
}

export interface Win {
    instantWin: string;
    lines: string;
    total: string;
}

export interface Transactions {
    roundId: number;
}