import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type * as Currency from "@/interface/currency";
import { useApi } from '@/composables/useApi';

export const currencyStore = defineStore('currency', () => {
  const success = ref(false);
  const errMessage = ref('');
  const currencyList = ref<Array<Currency.GetCurrencyBalanceList>>([]);

  const { get, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getCurrencyList = computed(() => currencyList.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setCurrencyList = (list: Array<Currency.GetCurrencyBalanceList>) => {
    currencyList.value = list;
  };

  const dispatchCurrencyList = async () => {
    try {
      setSuccess(false);
      const response = await get<Currency.GetCurrencyBalanceListResponse>(apiRoutes.Currency.CURRENCY_LIST);
      setCurrencyList(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    currencyList,
    getSuccess,
    getErrMessage,
    getCurrencyList,
    setSuccess,
    setErrorMessage,
    setCurrencyList,
    dispatchCurrencyList,
  };
});
