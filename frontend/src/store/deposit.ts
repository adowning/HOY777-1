import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type * as Deposit from "@/interface/deposit";
import { useApi } from '@/composables/useApi';

export const depositStore = defineStore('deposit', () => {
  const success = ref(false);
  const errMessage = ref('');
  const depositConfig = ref<any>({ bonus: [{ type: 0 }] });
  const depositSubmit = ref<any>({});
  const pixInfo = ref<Deposit.GetPixInfo>({} as Deposit.GetPixInfo);
  const pixInfoToggle = ref(false);
  const depositHistoryItem = ref<Deposit.DepositHistoryResponse>({} as Deposit.DepositHistoryResponse);

  const { get, post, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getDepositCfg = computed(() => depositConfig.value);
  const getDepositSubmit = computed(() => depositSubmit.value);
  const getPixInfo = computed(() => pixInfo.value);
  const getPixInfoToggle = computed(() => pixInfoToggle.value);
  const getDepositHistoryItem = computed(() => depositHistoryItem.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setDepositCfg = (config: any) => {
    depositConfig.value = config;
  };
  const setDepositSubmit = (submit: any) => {
    depositSubmit.value = submit;
  };
  const setPixInfo = (info: Deposit.GetPixInfo) => {
    pixInfo.value = info;
  };
  const setPixInfoToggle = (toggle: boolean) => {
    pixInfoToggle.value = toggle;
  };
  const setDepositHistoryItem = (item: Deposit.DepositHistoryResponse) => {
    depositHistoryItem.value = item;
  };

  const dispatchUserDepositCfg = async () => {
    try {
      setSuccess(false);
      const response = await get<Deposit.GetDepositResponse>(apiRoutes.DEPOSIT_PAGE.DEPOSIT_CONFIG);
      setDepositCfg(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchUserDepositSubmit = async (data: Deposit.DepositItem) => {
    try {
      setSuccess(false);
      const response = await post<Deposit.SubmitDepositResponse>(apiRoutes.DEPOSIT_PAGE.DEPOSIT_SUBMIT, data);
      setDepositSubmit(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchUserDepositHistory = async (data: any) => {
    try {
      setSuccess(false);
      const response = await get<Deposit.GetDepositHistoryResponse>(apiRoutes.DEPOSIT_PAGE.DEPOSIT_HISTORY, data);
      setDepositHistoryItem(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    depositConfig,
    depositSubmit,
    pixInfo,
    pixInfoToggle,
    depositHistoryItem,
    getSuccess,
    getErrMessage,
    getDepositCfg,
    getDepositSubmit,
    getPixInfo,
    getPixInfoToggle,
    getDepositHistoryItem,
    setSuccess,
    setErrorMessage,
    setDepositCfg,
    setDepositSubmit,
    setPixInfo,
    setPixInfoToggle,
    setDepositHistoryItem,
    dispatchUserDepositCfg,
    dispatchUserDepositSubmit,
    dispatchUserDepositHistory,
  };
});
