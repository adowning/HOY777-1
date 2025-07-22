// src/composables/useSyncClient.ts

import { onUnmounted, computed, } from "vue";
import type {
    BaseServerMessage,
    BaseClientMessage,
} from "@bnk/sync-client";
import { getSharedSyncManager, WSManager, type Subscription } from "@/services/sync-manager";
import { isSyncConnected } from "@/services/sync-state"; // Import the global reactive state
import type { AppServerMessage, AppClientMessage, Events, SubscribeMessage, Channels } from "@/interfaces/sync";
import type { Emitter, Handler } from "mitt";
import mitt from "mitt";

// type WSManager = SyncClientManager<AppServerMessage, AppClientMessage>;


export interface UseSyncClientConfig<
    TIncoming extends BaseServerMessage = BaseServerMessage,
    TOutgoing extends BaseClientMessage = BaseClientMessage
> {
    /**
     * Optionally provide a pre-instantiated manager.
     * This is now a less common use case for our app.
     */
    manager?: WSManager;
}

/**
 * Vue composable for interacting with the WebSocket connection from within a component.
 * It provides reactive state (status) and methods (sendMessage, disconnect).
 *
 * This function should be called within a component's setup() function or a <script setup> block.
 */
export function useSyncClient<
    TIncoming extends BaseServerMessage = AppServerMessage,
    TOutgoing extends BaseClientMessage = AppClientMessage
>({
    manager: managerProp,
}: UseSyncClientConfig<TIncoming, TOutgoing> = {}) {
    
    const manager = managerProp || (getSharedSyncManager() as WSManager);

    /**
     * A reactive string representing the connection status.
     * Will be 'OPEN' or 'CLOSED'.
     */
    const status = computed(() => isSyncConnected.value ? 'OPEN' : 'CLOSED');

    onUnmounted(() => {
        if (manager !== getSharedSyncManager()) {
            manager?.disconnect();
        }
    });

    // const sendSubscribe= (msg: AppClientMessage): void => {
    //     manager?.sendTypedMessage(
    //         msg,
    //      ); // Cast to TOutgoing
    // };
    const setListener = (channel: keyof Channels,):  Subscription => { // Removed redundant `void` and corrected syntax
         manager?.sendTypedMessage(
            {type: `SUBSCRIBE`, channel},
         );
        const emitter: Emitter<Channels | Events> = mitt<Channels | Events>()
        emitter.on(channel as any, (data: any) => {
            console.log(`Received data for channel ${channel}:`, data);
            return data
        }
        )
        const subscription: Subscription = {
            id: channel,
            connected: true,
            // callback,
            auth: {
                token: ""
            },
            removeAllListeners: function (): void {
                throw new Error("Function not implemented.");
            },
            disconnect: function (): void {
                throw new Error("Function not implemented.");
            },
            connect: function (): void {
                throw new Error("Function not implemented.");
            },
            emitter,
            callback: function (data: any): void {
                throw new Error("Function not implemented.");
            }
        }
        return subscription// Cast to TOutgoing
    }
    const disconnect = (stopReconnect = false): void => {
        if (manager !== getSharedSyncManager()) {
            manager?.disconnect(stopReconnect);
        } else {
            console.warn("useSyncClient: Attempted to disconnect the shared manager. Please use the global disconnectSync() function instead.");
        }
    };

    return {
        manager,
        setListener,
        /**
         * A readonly, reactive string that mirrors the global WebSocket connection status ('OPEN' | 'CLOSED').
         */
        status,
        // sendMessage,
        disconnect,
    };
}
