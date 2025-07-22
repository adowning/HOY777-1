import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useSocketStore } from './socket';
import { useAuthStore } from './auth.store';
import { useNotificationStore } from './notifications';

interface AffiliatesData {
    data: any | null;
    referred: any | null;
    loading: boolean;
}

export const useAffiliatesStore = defineStore('affiliates', () => {
    const affiliatesData = reactive<AffiliatesData>({
        data: null,
        referred: null,
        loading: false
    });

    const socketStore = useSocketStore();
    const authStore = useAuthStore();
    const notificationsStore = useNotificationStore();

    function setData(data: any) {
        affiliatesData.data = data;
    }

    function setReferred(referred: any) {
        affiliatesData.referred = referred;
    }

    function setLoading(status: boolean) {
        affiliatesData.loading = status;
    }

    function getData(data: any) {
        if (!socketStore.general || affiliatesData.loading) return;
        setLoading(true);
        socketStore.general.emit('getAffiliateData', data, (res: any) => {
            if (res.success) {
                setData(res.data);
                setReferred(res.referred);
            } else {
                notificationsStore.show(res.error);
            }
            setLoading(false);
        });
    }

    function sendCode(data: any) {
        if (!socketStore.general || socketStore.sendLoading) return;
        socketStore.setSendLoading('AffiliatesCode');
        socketStore.general.emit('sendAffiliateCode', data, (res: any) => {
            if (res.success) {
                setData(res.data);
                notificationsStore.show({ type: 'success', message: 'You have successfully updated your affiliate code.' });
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendClaimCode(data: any) {
        if (!socketStore.general || socketStore.sendLoading) return;
        socketStore.setSendLoading('AffiliatesClaimCode');
        socketStore.general.emit('sendAffiliateClaimCode', data, (res: any) => {
            if (res.success) {
                authStore.setUser(res.user);
                notificationsStore.show({ type: 'success', message: 'You have successfully claimed a affiliate code.' });
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendClaimEarnings(data: any) {
        if (!socketStore.general || socketStore.sendLoading) return;
        socketStore.setSendLoading('AffiliatesClaimEarnings');
        socketStore.general.emit('sendAffiliateClaimEarnings', data, (res: any) => {
            if (res.success) {
                authStore.setUser(res.user);
                setData(res.user.affiliates);
                notificationsStore.show({ type: 'success', message: 'You have successfully claimed your affiliate earnings.' });
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    return {
        affiliatesData,
        setData,
        setReferred,
        setLoading,
        getData,
        sendCode,
        sendClaimCode,
        sendClaimEarnings
    };
}, {
    persist: true
});