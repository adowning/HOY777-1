import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useSocketStore } from './socket';
import { useAuthStore } from './auth.store';
import { useNotificationStore } from './notifications';
import { useModalsStore } from './modals';

interface Bets {
    bets: {
        all: any[];
        whale: any[];
        lucky: any[];
        my: any[];
    } | null;
    loading: boolean;
}

interface Rain {
    site: any | null;
    active: any | null;
}

interface UserInfo {
    data: any | null;
    loading: boolean;
}

export const useGeneralStore = defineStore('general', () => {
    const sidebarMobile = ref<boolean | null>(null);
    const settings = ref<any | null>(null);
    const timeDiff = ref<number | null>(null);
    const bets = reactive<Bets>({
        bets: null,
        loading: false
    });
    const rain = reactive<Rain>({
        site: null,
        active: null
    });
    const userInfo = reactive<UserInfo>({
        data: null,
        loading: false
    });

    const socketStore = useSocketStore();
    const authStore = useAuthStore();
    const notificationsStore = useNotificationStore();
    const modalsStore = useModalsStore();

    function setSidebarMobile(value: boolean | null) {
        sidebarMobile.value = value;
    }

    function clearRainActive() {
        rain.active = null;
    }

    function setUserInfoData(user: any) {
        userInfo.data = user;
    }

    function socketInit(data: any) {
        settings.value = data.settings;
        timeDiff.value = data.time - new Date().getTime();
        rain.site = data.rains.site;
        rain.active = data.rains.active;
    }

    function socketBet(data: any) {
        if (bets.bets) {
            addBet(data.bet, 'all');
            if (bets.bets.all.length >= 15) removeLastBet('all');

            if (data.bet.payout >= 10000000) {
                addBet(data.bet, 'whale');
                if (bets.bets.whale.length >= 15) removeLastBet('whale');
            }

            if (data.bet.payout >= 10 && data.bet.multiplier >= 500) {
                addBet(data.bet, 'lucky');
                if (bets.bets.lucky.length >= 15) removeLastBet('lucky');
            }

            if (authStore.currentUser && data.bet.user && authStore.currentUser.id === data.bet.user.id) {
                addBet(data.bet, 'my');
                if (bets.bets.my.length >= 15) removeLastBet('my');
            }
        }
    }

    function socketSettings(data: any) {
        settings.value = data.settings;
    }

    function socketUser(data: any) {
        if (new Date(authStore.currentUser!.updatedAt!).getTime() <= new Date(data.user.updatedAt).getTime()) {
            authStore.setUser(data.user);
        }
    }

    function socketRain(data: any) {
        if (data.rain.type === 'site') {
            rain.site = data.rain;
        }

        if (data.rain.state === 'running') {
            rain.active = data.rain;
        }
    }

    function getBetsData(data: any) {
        if (!socketStore.general || bets.loading) return;
        bets.loading = true;
        socketStore.general.emit('getBetsData', data, (res: any) => {
            if (res.success) {
                bets.bets = res.bets;
            } else {
                notificationsStore.show(res.error);
            }
            bets.loading = false;
        });
    }

    function getUserInfo(data: any) {
        if (!socketStore.general || userInfo.loading) return;
        userInfo.loading = true;
        socketStore.general.emit('getUserInfo', data, (res: any) => {
            if (res.success) {
                userInfo.data = res.user;
            } else {
                notificationsStore.show(res.error);
                if (['ChatUser', 'Tip', 'Mute', 'Ban'].includes(modalsStore.show || '')) {
                    modalsStore.setShow(null);
                }
            }
            userInfo.loading = false;
        });
    }

    function sendVaultDeposit(data: any) {
        if (!socketStore.general || socketStore.sendLoading) return;
        socketStore.setSendLoading('GeneralVaultDeposit');
        socketStore.general.emit('sendVaultDeposit', data, (res: any) => {
            if (res.success) {
                authStore.setUser({ ...authStore.currentUser, balance: res.user.balance, vault: res.user.vault });
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendVaultWithdraw(data: any) {
        if (!socketStore.general || socketStore.sendLoading) return;
        socketStore.setSendLoading('GeneralVaultWithdraw');
        socketStore.general.emit('sendVaultWithdraw', data, (res: any) => {
            if (res.success) {
                authStore.setUser({ ...authStore.currentUser, balance: res.user.balance, vault: res.user.vault });
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendVaultLock(data: any) {
        if (!socketStore.general || socketStore.sendLoading) return;
        socketStore.setSendLoading('GeneralVaultLock');
        socketStore.general.emit('sendVaultLock', data, (res: any) => {
            if (res.success) {
                authStore.setUser({ ...authStore.currentUser, balance: res.user.balance, vault: res.user.vault });
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendPromoClaim(data: any) {
        if (!socketStore.general || socketStore.sendLoading) return;
        socketStore.setSendLoading('GeneralPromoClaim');
        socketStore.general.emit('sendPromoClaim', data, (res: any) => {
            if (res.success) {
                notificationsStore.show({ type: 'success', message: 'You\'ve successfully claimed a promo code.' });
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendRainCreate(data: any) {
        if (!socketStore.general || socketStore.sendLoading) return;
        socketStore.setSendLoading('GeneralRainCreate');
        socketStore.general.emit('sendRainCreate', data, (res: any) => {
            if (!res.success) {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendRainTip(data: any) {
        if (!socketStore.general || socketStore.sendLoading) return;
        socketStore.setSendLoading('GeneralRainTip');
        socketStore.general.emit('sendRainTip', data, (res: any) => {
            if (!res.success) {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendRainJoin(data: any) {
        if (!socketStore.general || socketStore.sendLoading) return;
        socketStore.setSendLoading('GeneralRainJoin');
        socketStore.general.emit('sendRainJoin', data, (res: any) => {
            if (res.success) {
                notificationsStore.show({ type: 'success', message: 'You\'ve successfully joined the rain.' });
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function addBet(bet: any, type: 'all' | 'whale' | 'lucky' | 'my') {
        if (!bets.bets) return;
        bets.bets[type].unshift(bet);
        bets.bets[type].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
    function setSettings(settings: any) {
        settings.value = settings
    }
    function removeLastBet(type: 'all' | 'whale' | 'lucky' | 'my') {
        if (!bets.bets) return;
        bets.bets[type].pop();
    }

    return {
        sidebarMobile,
        setSettings,
        settings,
        timeDiff,
        bets,
        rain,
        addBet,
        userInfo,
        setSidebarMobile,
        clearRainActive,
        setUserInfoData,
        socketInit,
        socketBet,
        socketSettings,
        socketUser,
        socketRain,
        getBetsData,
        getUserInfo,
        sendVaultDeposit,
        sendVaultWithdraw,
        sendVaultLock,
        sendPromoClaim,
        sendRainCreate,
        sendRainTip,
        sendRainJoin
    };
}, {
    persist: true
});