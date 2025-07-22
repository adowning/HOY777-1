// This file is updated to reflect the data structures needed by your new components.

// A more detailed Game type for the GameCarousel
export type Game = {
  id: number | string;
  title: string;
  name: string; // Used for the banner
  developer: string;
  temperature: 'hot' | 'cold' | 'none'; // For styling the card border
  featured?: boolean;
  category: GameCategory;
  thumbnailUrl?: string;
};

// A new type for the LiveWin component
export type BigWin = {
  id: string;
  userName: string;
  userAvatar: string;
  amount: number;
  gameName: string;
  gameImage: string;
};

export type GameCategory =
  | 'ALL'
  | 'FISH'
  | 'POKER'
  | 'SLOTS'
  | 'TABLE_GAMES'
  | 'LIVE_CASINO'
  | 'CRASH';

// Re-defining other types for completeness
export type UserProfile = {
  id: string;
  username: string;
  balance: number;
  role: string;
};
