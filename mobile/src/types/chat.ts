// src/types/chat.ts

/**
 * Represents a user in the chat.
 */
export interface ChatUser {
  id: string; // Unique identifier for the user
  username: string;
  avatarUrl?: string; // Optional: URL to the user's avatar
}

export interface ChatMessage {
  id: string; // Unique identifier for the message
  user: ChatUser; // Information about the sender
  text: string;
  timestamp: number; // Unix timestamp (e.g., Date.now())
  isMe?: boolean; // Optional: client-side flag to identify if the message is from the current user
}