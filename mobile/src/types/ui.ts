// Defines the different kinds of notifications we can show.
// Using a string literal union is type-safe and self-documenting.
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

/**
 * Represents a single on-screen notification.
 * This is the shape of the objects our new store will manage.
 */
export type Notification = {
  id: string; // A unique ID is crucial for adding/removing.
  message: string;
  type: NotificationType;
  duration?: number; // Optional duration in milliseconds for auto-dismissal.
};
