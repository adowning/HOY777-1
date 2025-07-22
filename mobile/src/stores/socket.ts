import { defineStore } from 'pinia';
import { ref } from 'vue';
// import socketIo from 'socket.io-client';
import { useAuthStore } from './auth.store';
import { useSyncClient } from '@/composables/useSyncClient';
import { useGeneralStore } from './general';
import { useChatStore } from './chat.store';
// import { useCrashStore } from './crash';
// import { useRollStore } from './roll';
import { useBlackjackStore } from './blackjack';
// import { useDuelsStore } from './duels';
// import { useMinesStore } from './mines';
// import { useTowersStore } from './towers';
// import { useUnboxStore } from './unbox';
import { useBattlesStore } from './battles';
import { useCashierStore } from './cashier';
import { initializeAndConnectSync } from '@/services/sync-manager';
// import { useRainStore } from './rain';
// import { useUserStore } from './user';

export const useSocketStore = defineStore('socket', () => {
    const sendLoading = ref<string | null>(null);
const syncClient = useSyncClient()

    const authStore = useAuthStore();
    const generalStore = useGeneralStore();
    const chatStore = useChatStore();
    // const crashStore = useCrashStore();
    // const rollStore = useRollStore();
    const blackjackStore = useBlackjackStore();
    // const duelsStore = useDuelsStore();
    // const minesStore = useMinesStore();
    // const towersStore = useTowersStore();
    // const unboxStore = useUnboxStore();
    const battlesStore = useBattlesStore();
    const cashierStore = useCashierStore();
    // const rainStore = useRainStore();
    // const userStore = useUserStore();
    
    const general = syncClient.setListener( 'general',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
    const crash = syncClient.setListener( 'crash',)// { auth: {}, autoConnect: false, reconnection: true, reconnectionDelay: 5000, transports: ['websocket'] });
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

    function setSendLoading(value: string | null) {
        sendLoading.value = value;
    }

    function connectGeneral() {
        if (general.connected) general.removeAllListeners();
        if (authStore.accessToken) general.auth.token = authStore.accessToken;
        general.disconnect()
        general.connect()
        listenGeneral();
        console.log('general connected')
    }

    function disconnectGeneral() {
        general.removeAllListeners();
        general.disconnect();
    }

    function listenGeneral() {
        general.emitter.on('general.init' as any, (data: any) => { generalStore.socketInit(data); chatStore.socketInit(data); });
        general.emitter.on('general.settings' as any, (data: any) => { generalStore.setSettings(data.settings); });
        general.emitter.on('general.auth' as any, (data: any) => { authStore.setUser(data.user); });
        general.emitter.on('general.bet' as any, (data: any) => { generalStore.addBet(data.bet, 'all'); });
        // general.on('rain', (data: any) => { generalStore.setRainSite(data.rain); });
        // general.on('userTip', (data: any) => { userStore.tipSocket(data); });
        general.emitter.on('general.chatOnline' as any, (data: any) => { chatStore.socketOnline(data); });
        general.emitter.on('general.chatMessage' as any, (data: any) => { chatStore.socketMessage(data); });
        general.emitter.on('general.chatRemove' as any, (data: any) => { chatStore.socketRemove(data); });
        general.emitter.on('general.chatClear' as any, (data: any) => { chatStore.socketClear(); });
        // general.on('rainPayout', (data: any) => { rainStore.payoutSocket(data: any); });
    }

    function connectCrash() {
        if (crash.connected) crash.removeAllListeners();
        if (authStore.accessToken) crash.auth.token = authStore.accessToken;
         crash.disconnect()
        crash.connect()
        listenGeneral();
        listenCrash();
    }

    function disconnectCrash() {
        crash.removeAllListeners();
        crash.disconnect();
    }

    function listenCrash() {
        // crash.on('init', (data: any) => { crashStore.socketInit(data: any); });
        // crash.on('game', (data: any) => { crashStore.socketGame(data: any); });
        // crash.on('tick', (data: any) => { crashStore.socketTick(data: any); });
        // crash.on('bet', (data: any) => { crashStore.socketBet(data: any); });
    }

    function connectRoll() {
        // if (roll.connected) roll.removeAllListeners();
        // if (authStore.authToken) roll.auth.token = authStore.authToken;
        // roll.disconnect().connect();
        // listenRoll();
    }

    function disconnectRoll() {
        roll.removeAllListeners();
        roll.disconnect();
    }

    function listenRoll() {
        // roll.on('init', (data: any) => { rollStore.socketInit(data: any); });
        // roll.on('game', (data: any) => { rollStore.socketGame(data: any); });
        // roll.on('bet', (data: any) => { rollStore.socketBet(data: any); });
    }

    function connectBlackjack() {
        if (blackjack.connected) blackjack.removeAllListeners();
        if (authStore.accessToken) blackjack.auth.token = authStore.accessToken;
        blackjack.disconnect()
        blackjack.connect();
        listenBlackjack();
    }

    function disconnectBlackjack() {
        blackjack.removeAllListeners();
        blackjack.disconnect();
    }

    function listenBlackjack() {
        blackjack.emitter.on('blackjack.init' as any, (data: any) => { blackjackStore.socketInit(data); });
        blackjack.emitter.on('blackjack.table' as any, (data: any) => { blackjackStore.socketTable(data); });
    }

    function connectDuels() {
        if (duels.connected) duels.removeAllListeners();
        if (authStore.accessToken) duels.auth.token = authStore.accessToken;
        duels.disconnect()
        duels.connect()
        listenDuels();
    }

    function disconnectDuels() {
        duels.removeAllListeners();
        duels.disconnect();
    }

    function listenDuels() {
        // duels.on('init', (data: any) => { duelsStore.socketInit(data); });
        // duels.on('game', (data: any) => { duelsStore.socketGame(data); });
    }

    function connectMines() {
        if (mines.connected) mines.removeAllListeners();
        if (authStore.accessToken) mines.auth.token = authStore.accessToken;
        mines.disconnect()
        mines.connect()
        listenMines();
    }

    function disconnectMines() {
        mines.removeAllListeners();
        mines.disconnect();
    }

    function listenMines() {
        // mines.on('init', (data: any) => { minesStore.socketInit(data: any); });
    }

    function connectTowers() {
        if (towers.connected) towers.removeAllListeners();
        if (authStore.accessToken) towers.auth.token = authStore.accessToken;
        towers.disconnect()
        towers.connect()
        listenTowers();
    }

    function disconnectTowers() {
        towers.removeAllListeners();
        towers.disconnect();
    }

    function listenTowers() {
        // towers.on('init', (data: any) => { towersStore.socketInit(data: any); });
    }

    function connectUnbox() {
        if (unbox.connected) unbox.removeAllListeners();
        if (authStore.accessToken) unbox.auth.token = authStore.accessToken;
        unbox.disconnect()
        unbox.connect()
        listenUnbox();
    }

    function disconnectUnbox() {
        unbox.removeAllListeners();
        unbox.disconnect();
    }

    function listenUnbox() {
        // unbox.on('init', (data: any) => { unboxStore.socketInit(data: any); });
    }

    function connectBattles() {
        if (battles.connected) battles.removeAllListeners();
        if (authStore.accessToken) battles.auth.token = authStore.accessToken;
        battles.disconnect()
        battles.connect()
        listenBattles();
    }

    function disconnectBattles() {
        battles.removeAllListeners();
        battles.disconnect();
    }

    function listenBattles() {
        // battles.on('init', (data: any) => { battlesStore.socketInit(data); });
        // battles.on('game', (data: any) => { battlesStore.socketGame(data); });
    }

    function connectUpgrader() {
        if (upgrader.connected) upgrader.removeAllListeners();
        if (authStore.accessToken) upgrader.auth.token = authStore.accessToken;
        upgrader.disconnect()
        upgrader.connect()
        listenUpgrader();
    }

    function disconnectUpgrader() {
        upgrader.removeAllListeners();
        upgrader.disconnect();
        upgrader.connect();
    }

    function listenUpgrader() {
        // No listeners for upgrader socket
    }

    function connectCashier() {
        if (cashier.connected) cashier.removeAllListeners();
        if (authStore.accessToken) cashier.auth.token = authStore.accessToken;
        cashier.disconnect()
        cashier.connect()
        listenCashier();
    }

    function disconnectCashier() {
        cashier.removeAllListeners();
        cashier.disconnect();
    }

    function listenCashier() {
        // cashier.on('robuxOffer', (data: any) => { cashierStore.setRobuxData(data); });
        // cashier.on('limitedTransaction', (data: any) => { cashierStore.setLimitedData(data); });
        // cashier.on('cryptoTransaction', (data: any) => { cashierStore.setCryptoData(data); });
    }

    function connectAdmin() {
        if (admin.connected) admin.removeAllListeners();
        if (authStore.accessToken) admin.auth.token = authStore.accessToken;
        admin.disconnect()
        admin.connect()
        listenAdmin();
    }

    function disconnectAdmin() {
        admin.removeAllListeners();
        admin.disconnect();
    }

    function listenAdmin() {
        // No listeners for admin socket
    }

    return {
        sendLoading,
        general,
        crash,
        roll,
        blackjack,
        duels,
        mines,
        towers,
        unbox,
        battles,
        upgrader,
        cashier,
        admin,
        setSendLoading,
        connectGeneral,
        connectBlackjack,
        disconnectBlackjack,
        disconnectGeneral
    };
});