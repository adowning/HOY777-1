// src/lib/sync/sync-types.ts

import type { BaseServerMessage, BaseClientMessage } from '@bnk/sync-client';

/**
 * =================================================================
 * INCOMING MESSAGES (Server -> Client)
 * =================================================================
 */

// Existing message types...
export interface PlayAnimationServerMessage extends BaseServerMessage {
  type: 'PLAY_ANIMATION';
  payload: { name: string; options?: Record<string, any>; };
}
export interface StopAnimationServerMessage extends BaseServerMessage {
    type: 'STOP_ANIMATION';
    payload: { name: string; };
}
export interface StopAllAnimationsServerMessage extends BaseServerMessage {
    type: 'STOP_ALL_ANIMATIONS';
}
export interface UserJoinedRoom extends BaseServerMessage {
    type: 'USER_JOINED';
}
export interface UpdateUserStateServerMessage extends BaseServerMessage {
  type: 'UPDATE_USER_STATE';
  payload: { status?: string; newItems?: string[]; };
}
export interface ServerErrorNotification extends BaseServerMessage {
    type: 'SERVER_ERROR';
    payload: { message: string; code?: string; };
}

// --- NEW MESSAGE TYPES ---

/**
 * Message to update the user's VIP experience points.
 * This is sent when the user gains XP from an action.
 */
export interface UpdateVipXpServerMessage extends BaseServerMessage {
  type: 'UPDATE_VIP_XP';
  payload: {
    newTotalXp: number; // The new, absolute total XP value.
    xpGained: number;   // The amount of XP gained in this event for animation.
  };
}

/**
 * Message to update the user's wallet balance.
 * This is sent after a bet, win, deposit, or withdrawal.
 */
export interface UpdateBalanceServerMessage extends BaseServerMessage {
  type: 'UPDATE_BALANCE';
  payload: {
    newBalance: number;   // The new, absolute balance.
    changeAmount: number; // The amount the balance changed by (can be negative).
  };
}


// A union type representing all possible messages the server can send.
export type AppServerMessage =
  | UserJoinedRoom
  | StopAnimationServerMessage
  | StopAllAnimationsServerMessage
  | UpdateUserStateServerMessage
  | ServerErrorNotification
  | UpdateVipXpServerMessage      // Added
  | UpdateBalanceServerMessage;   // Added


/**
 * =================================================================
 * OUTGOING MESSAGES (Client -> Server)
 * =================================================================
 *    const crash = syncClient.setListener( 'crash',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    const roll = syncClient.setListener( 'roll',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    const blackjack = syncClient.setListener( 'blackjack',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    const duels = syncClient.setListener( 'duels',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    const mines = syncClient.setListener( 'mines',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    const towers = syncClient.setListener( 'towers',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    const unbox = syncClient.setListener( 'unbox',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    const battles = syncClient.setListener( 'battles',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    const upgrader = syncClient.setListener( 'upgrader', )//{ auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    const cashier = syncClient.setListener( 'cashier',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    const admin = syncClient.setListener( 'admin',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    general.emitter.on('general.init', (data: any) => { generalStore.socketInit(data); chatStore.socketInit(data); });
        general.emitter.on('general.settings', (data: any) => { generalStore.setSettings(data.settings); });
        general.emitter.on('general.auth', (data: any) => { authStore.setUser(data.user); });
        general.emitter.on('general.bet', (data: any) => { generalStore.addBet(data.bet, 'all'); });
        // general.on('rain', (data: any) => { generalStore.setRainSite(data.rain); });
        // general.on('userTip', (data: any) => { userStore.tipSocket(data); });
        general.emitter.on('general.chatOnline', (data: any) => { chatStore.socketOnline(data); });
        general.emitter.on('general.chatMessage', (data: any) => { chatStore.socketMessage(data); });
        general.emitter.on('general.chatRemove', (data: any) => { chatStore.socketRemove(data); });
        general.emitter.on('general.chatClear', (data: any) => { chatStore.socketClear(); });
 */
export type Channels = {
  'general': string  ,'crash': string,'roll': string,'blackjack': string,'duels': string
  'mines': string  ,'towers': string,'unbox': string,'battles': string,'upgrader': string
  'cashier': string,'admin': string
};
export type Events = {
  'general.init': string  ,'general.settings': string ,'general.auth': string ,'general.bet': string ,
  'general.chatOnline': string  ,'general.chatMessage': string ,'general.chatRemove': string ,'general.chatClear': string ,
};
export interface ClientReadyMessage extends BaseClientMessage {
    type: 'CLIENT_READY';
    // topic: keyof Events

}
export interface SubscribeMessage extends BaseClientMessage {
    type: 'SUBSCRIBE';
    channel: keyof Channels
}
export interface UnsubscribeMessage extends BaseClientMessage {
    type: 'UNSUBSCRIBE';
    topic: keyof Events

}
export interface UserActionClientMessage extends BaseClientMessage {
    type: 'USER_ACTION';
    payload: { action: string; details: Record<string, any>; }
}

// A union type representing all possible messages the client can send.
export type AppClientMessage = 
    | ClientReadyMessage
    | UserActionClientMessage
    | SubscribeMessage
    | UnsubscribeMessage
