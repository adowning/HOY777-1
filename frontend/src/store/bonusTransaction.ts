import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { type TransactionHistoryResponse } from '@/interface/transaction';
import type * as Transaction from "@/interface/transaction";
import { useApi } from '@/composables/useApi';

export const bonusTransactionStore = defineStore('bonusTransaction', () => {
  const success = ref(false);
  const errMessage = ref('');
  const bonusTabIndex = ref(0);
  const transactionTab = ref('');
  const transactionHistoryItem = ref<TransactionHistoryResponse>({
    total_pages: 0,
    record: []
  });
  const moreTransactionHistoryFlag = ref(true);

  const { get, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getBonusTabIndex = computed(() => bonusTabIndex.value);
  const getTransactionTab = computed(() => transactionTab.value);
  const getTransactionHistoryItem = computed(() => transactionHistoryItem.value);
  const getMoreTransactionHistoryFlag = computed(() => moreTransactionHistoryFlag.value);

  const setBonusTabIndex = (index: number) => {
    bonusTabIndex.value = index;
  };
  const setTransactionTab = (tab: string) => {
    console.log(tab);
    transactionTab.value = tab;
  };
  const setTransactionHistoryItem = (item: TransactionHistoryResponse) => {
    if (item.record.length == 0) {
      moreTransactionHistoryFlag.value = false;
    } else {
      transactionHistoryItem.value.record = [...transactionHistoryItem.value.record, ...item.record];
      transactionHistoryItem.value.total_pages = item.total_pages;
      moreTransactionHistoryFlag.value = true;
    }
  };
  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };

  const dispatchTransactionHistory = async (data: any) => {
    try {
      setSuccess(false);
      const response = await get<Transaction.GetTransactionHistoryResponse>(apiRoutes.TRANSACTION_PAGE.TRANSACTION_HISTORY, data);
      setTransactionHistoryItem(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    bonusTabIndex,
    transactionTab,
    transactionHistoryItem,
    moreTransactionHistoryFlag,
    getSuccess,
    getErrMessage,
    getBonusTabIndex,
    getTransactionTab,
    getTransactionHistoryItem,
    getMoreTransactionHistoryFlag,
    setBonusTabIndex,
    setTransactionTab,
    setTransactionHistoryItem,
    setSuccess,
    setErrorMessage,
    dispatchTransactionHistory,
  };
});
