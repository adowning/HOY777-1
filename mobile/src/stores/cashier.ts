
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

interface RobuxData {
    offers: any[] | null;
    count: number | null;
    loading: boolean;
    page: number;
}

interface LimitedData {
    deposit: any | null;
    withdraw: any[] | null;
    selected: any[];
    loading: boolean;
    loadedAt: Date | null;
    page: number;
}

interface CryptoData {
    prices: any | null;
    addresses: any | null;
    loading: boolean;
}

export const useCashierStore = defineStore('cashier', () => {
    const filterSearch = ref('');
    const filterAmountMin = ref('');
    const filterAmountMax = ref('');
    const filterSort = ref('Highest');
    const limitedSelected = ref<any[]>([]);

    const robuxData = reactive<RobuxData>({
        offers: null,
        count: null,
        loading: false,
        page: 1
    });

    const limitedData = reactive<LimitedData>({
        deposit: null,
        withdraw: null,
        selected: [],
        loading: false,
        loadedAt: null,
        page: 1
    });

    const cryptoData = reactive<CryptoData>({
        prices: null,
        addresses: null,
        loading: false
    });

    function setFilterSearch(value: string) {
        filterSearch.value = value;
    }

    function setFilterAmountMin(value: string) {
        filterAmountMin.value = value;
    }

    function setFilterAmountMax(value: string) {
        filterAmountMax.value = value;
    }

    function setFilterSort(value: string) {
        filterSort.value = value;
    }

    function setRobuxData(data: { offers: any[], count: number }) {
        robuxData.offers = data.offers;
        robuxData.count = data.count;
    }

    function addRobuxData(offer: any) {
        if (!robuxData.offers) robuxData.offers = [];
        robuxData.offers.unshift(offer);
    }

    function updateRobuxData(offer: any) {
        if (!robuxData.offers) return;
        const index = robuxData.offers.findIndex((element) => element._id === offer._id);
        if (index !== -1) {
            robuxData.offers.splice(index, 1, offer);
        }
    }

    function removeRobuxData(offer: any) {
        if (!robuxData.offers) return;
        const index = robuxData.offers.findIndex((element) => element._id === offer._id);
        if (index !== -1) {
            robuxData.offers.splice(index, 1);
        }
    }

    function setRobuxLoading(status: boolean) {
        robuxData.loading = status;
    }

    function setRobuxPage(page: number) {
        robuxData.page = page;
    }

    function setLimitedData(data: { deposit: any, withdraw: any[] }) {
        limitedData.deposit = data.deposit;
        limitedData.withdraw = data.withdraw;
        limitedData.loadedAt = new Date();
    }

    function addLimitedWithdraw(transaction: any) {
        if (!limitedData.withdraw) limitedData.withdraw = [];
        limitedData.withdraw.push(transaction);
    }

    function updateLimitedWithdraw(transaction: any) {
        if (!limitedData.withdraw) return;
        const index = limitedData.withdraw.findIndex((element) => element._id === transaction._id);
        if (index !== -1) {
            limitedData.withdraw.splice(index, 1, transaction);
        }
    }

    function removeLimitedWithdraw(transaction: any) {
        if (!limitedData.withdraw) return;
        const index = limitedData.withdraw.findIndex((element) => element._id === transaction._id);
        if (index !== -1) {
            limitedData.withdraw.splice(index, 1);
        }
    }

    function addLimitedSelected(item: any) {
        limitedData.selected.push(item);
    }

    function removeLimitedSelected(item: any) {
        const index = limitedData.selected.findIndex((element) => element._id === item._id);
        if (index !== -1) {
            limitedData.selected.splice(index, 1);
        }
    }

    function emptyLimitedSelected() {
        limitedData.selected = [];
    }

    function setLimitedLoading(status: boolean) {
        limitedData.loading = status;
    }

    function setLimitedPage(page: number) {
        limitedData.page = page;
    }

    function setCryptoData(data: { prices: any, addresses: any }) {
        cryptoData.prices = data.prices;
        cryptoData.addresses = data.addresses;
    }

    function setCryptoLoading(status: boolean) {
        cryptoData.loading = status;
    }

    return {
        filterSearch,
        filterAmountMin,
        filterAmountMax,
        filterSort,
        limitedSelected,
        robuxData,
        limitedData,
        cryptoData,
        setFilterSearch,
        setFilterAmountMin,
        setFilterAmountMax,
        setFilterSort,
        setRobuxData,
        addRobuxData,
        updateRobuxData,
        removeRobuxData,
        setRobuxLoading,
        setRobuxPage,
        setLimitedData,
        addLimitedWithdraw,
        updateLimitedWithdraw,
        removeLimitedWithdraw,
        addLimitedSelected,
        removeLimitedSelected,
        emptyLimitedSelected,
        setLimitedLoading,
        setLimitedPage,
        setCryptoData,
        setCryptoLoading
    };
}, {
    persist: true
});
