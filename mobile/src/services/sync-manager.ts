// src/services/sync-manager.ts

// import { SyncClientManager } from '@bnk/sync-client';
import { useEventManager } from '@/composables/EventManager';
import { useAuthStore } from '@/stores/auth.store';
import { useVipStore } from '@/stores/vip.store';
import type { AppServerMessage, AppClientMessage, Events, Channels } from '@/interfaces/sync';
import { setSyncConnected, isSyncConnected } from '@/services/sync-state';
import { SyncClientManager } from '@bnk/sync-client';
import mitt, { type Emitter } from 'mitt';

export interface Subscription {
    emitter: Emitter<Channels | Events>
    id: string;
    connected: boolean
    auth: {
        token: string;
    };
    callback: (data: any) => void;
    removeAllListeners: () => void;
    disconnect: () => void;
    connect: () => void;

}
const eventManager = useEventManager();
export class WSManager extends SyncClientManager<AppServerMessage, AppClientMessage> {
    subscriptions: Subscription[] | []//Emitter<Record<string, unknown>>[]
    // onConnect: any;
    // onDisconnect: any;
    // onMessage: any;
    constructor(config: any) {
        super(config);
        // this.connected = false;
        this.subscriptions = [];
        // this.onConnect = this.onConnect.bind(this);
        // this.onDisconnect = this.onDisconnect.bind(this);
        // this.onMessage = this.onMessage.bind(this);
        // this.onConnect = this.onConnect.bind(this);
        // this.onDisconnect = this.onDisconnect.bind(this);
        // this.onMessage = this.onMessage.bind(this);
    }
    sendTypedMessage(message: AppClientMessage) {
        const m: AppClientMessage = {
            ...message,
            // type
        }
        super.sendMessage(m)
    }
}
// Keep a reference to the manager instance at the module level
let managerInstance: WSManager | null = null //SyncClientManager<AppServerMessage, AppClientMessage> | null = null;
// let managerInstance: SyncClientManager<AppServerMessage, AppClientMessage>; 
/**
 * Initializes and connects the shared WebSocket manager.
 * This function should be called only when an auth token is available.
 */
export function initializeAndConnectSync() {
    // Prevent re-initialization if already connected
    if (managerInstance && isSyncConnected.value) {
        console.log("SyncManager: Already connected.");
        return managerInstance;
    }

    const authStore = useAuthStore();
    const token = authStore.accessToken || localStorage.getItem('accessToken');

    if (!token) {
        console.log("SyncManager: No auth token found. Cannot connect.");
        return;
    }

    const websocketUrl = `${import.meta.env.VITE_WEBSOCKET_URL}/ws?token=${token}`;
    const connected = isSyncConnected.value;
    console.log("SyncManager: Initializing with URL:", websocketUrl);

    // Define message handlers within this function's scope
    const messageHandlers = {
        UPDATE_VIP_XP: (message: any) => {
            console.log('SyncManager: Received UPDATE_VIP_XP.', message.payload);
            const vipStore = useVipStore();
            vipStore.updateXp(message.payload.newTotalXp, message.payload.xpGained);
        },
        WALLET_UPDATE: (message: any) => {
            console.log('SyncManager: Received WALLET_UPDATE.', message);
            const authStore = useAuthStore();
            if (authStore.currentUser?.activeWallet)
                authStore.currentUser.activeWallet.balance = message.payload.content.data.balance

            // authStore.updateUserBalance( message.payload.content.data.balance);
        },
        USER_UPDATE: (message: any) => {
            console.log('SyncManager: Received USER_UPDATE.', message.payload);
            const authStore = useAuthStore();
            authStore.updateUser(Object.keys(message.payload)[0], Object.values(message.payload)[0]);
        },
        VIP_INFO_UPDATE: (message: any) => {
            console.log('SyncManager: Received VIP_INFO_UPDATE.', message.payload.content.data);
            const key = Object.keys(message.payload.content.data)[0]
            console.log(key)
            console.log(message.payload.content.data[key])
            const authStore = useAuthStore();
            // if(authStore.currentUser?.vipInfo)
            // authStore.currentUser.vipInfo[key] =  message.payload.content.data[key]
            const oldValue = authStore.currentUser.vipInfo[key]
            const newValue = message.payload.content.data[key]
            // if(oldValue < newValue){
            eventManager.emit('vipInfoChanged', { key, oldValue, newValue, })
            // }
            authStore.currentUser.vipInfo[key] = message.payload.content.data[key]
            authStore.updateUserVipInfo(key, message.payload.content.data[key]);
        },
        USER_JOINED: (message: any) => {
            console.log('SyncManager: Received USER_JOINED.', message.payload);
            // const authStore = useAuthStore();
            // authStore.updateUserBalance(message.payload.newBalance, message.payload.changeAmount);
        },
        // Add other message handlers here...
    };

    // Instantiating the manager will automatically trigger the connection process.
    if (token) {
        managerInstance = new WSManager({ //SyncClientManager<AppServerMessage, AppClientMessage>({
            url: websocketUrl,
            autoReconnect: true,
            maxReconnectAttempts: 2,
            debug: import.meta.env.DEV,
            messageHandlers: messageHandlers,
            connected: true,
            /**
             * 
             */
            // connected: true,
            onOpen: () => {
                console.log("SyncManager: Connection opened.");
                setSyncConnected(true);
            },
            onClose: () => {
                console.log("SyncManager: Connection closed.");
                setSyncConnected(false);
            },
            onError: (event: any) => {
                console.error("SyncManager: WebSocket error observed:", event);
            }
        });
        return managerInstance;
    } else {
        return null
    }

}

/**
 * Returns the shared manager instance.
 * Throws an error if the manager has not been initialized.
 */
export function getSharedSyncManager() {
    if (!managerInstance) {
        // throw new Error("SyncManager has not been initialized. Call initializeAndConnectSync() first.");
        console.log("SyncManager has not been initialized. Call initializeAndConnectSync() first.");
    }
    return managerInstance;
}

/**
 * Disconnects the shared manager.
 */
export function disconnectSync() {
    if (managerInstance) {
        managerInstance.disconnect(true); // Stop reconnect attempts
        managerInstance = null;
        setSyncConnected(false);
        console.log("SyncManager: Disconnected successfully.");
    }
}
