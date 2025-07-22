// This file contains TypeScript types that should mirror your Prisma models.
// Keeping the frontend types in sync with the backend schema is crucial for type safety.

/**
 * Represents the user's profile data.
 * This is separate from authentication data and holds application-specific user info.
 */
export type UserProfile = {
  id: string;
  username: string;
  email: string;
  balance: number;
  role: 'user' | 'admin' | 'cashier'; // Using string literal union over enums
  is_blocked: boolean;
  created_at: string; // ISO date string
  last_login?: string; // Optional ISO date string
};

// Add other types for your models here as needed.
// For now, these are simple placeholders.

export type Game = {
  id: string;
  name: string;
  category: string;
};

export type Transaction = {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win';
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
};

export type Tournament = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
};

// It's a good practice to define a type for your VIP levels
export type VipLevel = {
  level: number;
  name: string;
  required_points: number;
  benefits: string[];
};
