// src/lib/sync/sync-state.ts

import { ref, readonly } from 'vue';

/**
 * A global, reactive reference to the WebSocket connection status.
 * True if the connection is open, false otherwise.
 */
const isConnected = ref(false);

/**
 * A function to update the global connection state.
 * This should only be called from the central sync manager.
 * @param status - The new connection status.
 */
export function setSyncConnected(status: boolean) {
    isConnected.value = status;
}

/**
 * A readonly version of the connection state to be used across the app.
 * Components can react to this value to show connection status indicators, etc.
 */
export const isSyncConnected = readonly(isConnected);
