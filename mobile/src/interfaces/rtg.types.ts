
export interface ProviderSettingsResponseData {
  user: {
    balance: { cash: string; freeBets?: string; bonus?: string;[key: string]: any }
    canGamble: boolean
    userId: number | string // Provider's user ID
    sessionId: string // Provider's session ID
    sessionNetPosition?: string
    token: string // Provider's session token
    country?: string
    currency?: { code: string; symbol: string }
    stakes?: any
    limits?: any
    serverTime: string // ISO Date string
    [key: string]: any // Allow other provider-specific fields
  }
  game?: {
    version?: string
    gameType?: string
    [key: string]: any
  }
  launcher?: {
    version?: string
    [key: string]: any
  }
  jackpots?: any
  // ... any other top-level properties from the provider's settings response
}

// The DTO your /rtg/settings endpoint will return to the client
export interface RTGSettingsResponseDto {
  success: boolean
  result?: ProviderSettingsResponseData // If successful, this is the data from the provider
  error?: {
    code: string
    message: string
    details?: any
  }
}

// Provider's raw response shape for a spin/play call (e.g., from RTG)
// This is what `proxyRequestToRgs` will return for a spin.
// Based on your `ProviderSpinResponseData` type in the original game.service.ts context.
export interface ProviderSpinResponseData {
  transactions: {
    roundId: number | string // Provider's round ID
    [key: string]: any
  }
  user: {
    balance: {
      // Balance structure after spin
      cash: { atStart?: string; afterBet?: string; atEnd: string } // atEnd is primary
      freeBets?: { atStart?: string; afterBet?: string; atEnd: string }
      bonus?: { atStart?: string; afterBet?: string; atEnd: string }
      [key: string]: any
    }
    userId: number | string
    sessionId: string
    sessionNetPosition?: string
    token: string
    serverTime: string // ISO Date string
    canGamble?: boolean
    [key: string]: any
  }
  game: {
    win: {
      instantWin?: string
      lines?: string
      total: string // Total win amount as string from provider
      [key: string]: any
    }
    stake: string // Stake amount for this spin
    multiplier?: number
    winLines?: any[]
    reelsBuffer?: Array<Array<number[]>>
    [key: string]: any // Other game-specific outcomes
  }
  jackpots?: any | null
  bonusChance?: any | null
  // Any other fields specific to the provider's spin response
}

// This is the "result" part of RTGSpinResponseDto,
// it should be structurally compatible with ProviderSpinResponseData.
// If they are identical, you can alias: export type RtgSpinResult = ProviderSpinResponseData;
// If not, define RtgSpinResult explicitly and map ProviderSpinResponseData to it.
export type RtgSpinResult = ProviderSpinResponseData // Assuming direct compatibility for now. Adjust if needed.

// The DTO your /rtg/spin endpoint will return to the client
export interface RTGSpinResponseDto {
  success: boolean
  result?: RtgSpinResult // If successful, this is the (potentially mapped) data
  error?: {
    code: string
    message: string
    details?: any
  }
}
export interface LaunchGameResponseDto {
  launch_url: string
  game_session_id?: string
  launch_strategy?: 'IFRAME' | 'REDIRECT' | 'POPUP'
  provider_parameters?: Record<string, any> | string
}

// Request DTOs remain largely the same, ensure they match provider's requirements
export interface RTGSettingsRequestDto {
  gameId: string
  token: string // Platform session token or provider specific?
  userId: string // Platform user ID, possibly prefixed
  currency: string
  language: string
  mode: 'real' | 'demo' | 'test'
  // Include all other fields RTG /settings endpoint expects
  // Based on original game.ts:
  custom?: { siteId?: string; extras?: string;[key: string]: any }
  userData?: {
    userId?: string | number
    hash?: string
    affiliate?: string
    lang?: string
    channel?: string
    userType?: string
    fingerprint?: string
    [key: string]: any
  }
  // [key: string]: any; // For flexibility if many varying fields
}

export interface RTGSpinRequestDto {
  token: string // Platform session token OR provider's game session token
  userId: string // Platform user ID, possibly prefixed for provider
  gameId: string // Provider's game ID
  stake: number | string // Stake amount
  currency: string
  sessionId: string // THIS IS CRUCIAL - Provider's session ID obtained from settings call
  playMode?: 'real' | 'demo' | 'test'
  actions?: any[] // Specific game actions
  // Include all other fields RTG /spin endpoint expects
  // Based on original game.ts context and game.ts type file:
  custom?: { siteId?: string; extras?: string;[key: string]: any }
  bonusId?: any
  extras?: any
  siteId?: string
  userType?: string
  lang?: string | number
  fingerprint?: string | number
  channel?: string | number
  affiliate?: string | number
  userData?: {
    userId?: string | number
    affiliate?: string
    lang?: string
    channel?: string
    userType?: string
    [key: string]: any
  }
  roundId?: string | number // Optional if client tracks/sends it
  transactionId?: string | number // Optional platform-side tx id if sent to provider
  // [key: string]: any;
}
