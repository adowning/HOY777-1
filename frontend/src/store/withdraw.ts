import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type * as Withdraw from "@/interface/withdraw";
import { useApi } from '@/composables/useApi';

export const withdrawStore = defineStore('withdraw', () => {
  const success = ref(false);
  const errMessage = ref('');
  const withdrawConfig = ref<any>({});
  const withdrawSubmit = ref<any>({});
  const withdrawHistoryItem = ref<Withdraw.WithdrawalHistoryResponse>({
    total_pages: 0,
    record: []
  });

  const { get, post, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getWithdrawCfg = computed(() => withdrawConfig.value);
  const getWithdrawSubmit = computed(() => withdrawSubmit.value);
  const getWithdrawHistoryItem = computed(() => withdrawHistoryItem.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setWithdrawCfg = (config: any) => {
    withdrawConfig.value = config;
  };
  const setWithdrawSubmit = (submit: any) => {
    withdrawSubmit.value = submit;
  };
  const setWithdrawHistoryItem = (item: Withdraw.WithdrawalHistoryResponse) => {
    withdrawHistoryItem.value.record = [...withdrawHistoryItem.value.record, ...item.record];
    withdrawHistoryItem.value.total_pages = item.total_pages;
  };

  const dispatchUserWithdrawCfg = async () => {
    try {
      setSuccess(false);
      const response = await get<Withdraw.GetWithdrawResponse>(apiRoutes.WITHDRAW_PAGE.WITHDRAWAL_CONFIG);
      setWithdrawCfg(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchUserWithdrawSubmit = async (data: Withdraw.WithdrawItem) => {
    try {
      setSuccess(false);
      const response = await post<Withdraw.SubmitWithdrawResponse>(apiRoutes.WITHDRAW_PAGE.WITHDRAWAL_SUBMIT, data);
      setWithdrawSubmit(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchWithdrawalHistory = async (data: any) => {
    try {
      setSuccess(false);
      const response = await get<Withdraw.GetWithdrawalHistoryResponse>(apiRoutes.WITHDRAW_PAGE.WITHDRAWAL_HISTORY, data);
      setWithdrawHistoryItem(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchWithdrawalRefund = async (data: any) => {
    try {
      setSuccess(false);
      await post(apiRoutes.WITHDRAW_PAGE.WITHDRAWAL_REFUND, data);
      withdrawHistoryItem.value.record.map((item: Withdraw.WithdrawalHistoryItem) => {
        if (item.id == data.id) {
          item.status = 3;
        }
      });
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    withdrawConfig,
    withdrawSubmit,
    withdrawHistoryItem,
    getSuccess,
    getErrMessage,
    getWithdrawCfg,
    getWithdrawSubmit,
    getWithdrawHistoryItem,
    setSuccess,
    setErrorMessage,
    setWithdrawCfg,
    setWithdrawSubmit,
    setWithdrawHistoryItem,
    dispatchUserWithdrawCfg,
    dispatchUserWithdrawSubmit,
    dispatchWithdrawalHistory,
    dispatchWithdrawalRefund,
  };
});
