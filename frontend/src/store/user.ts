import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type * as User from "@/interface/user";
import { useApi } from '@/composables/useApi';

export const userStore = defineStore('user', () => {
  const success = ref(false);
  const errMessage = ref('');
  const userCheck = ref(false);
  const verifyTime = ref(0);
  const userBalance = ref<User.GetUserBalance>({} as User.GetUserBalance);

  const { get, post, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getUserCheck = computed(() => userCheck.value);
  const getVerifyTime = computed(() => verifyTime.value);
  const getUserBalance = computed(() => userBalance.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setUserCheck = (value: boolean) => {
    userCheck.value = value;
  };
  const setVerifyTime = (value: number) => {
    verifyTime.value = value;
  };
  const setUserBalance = (balance: User.GetUserBalance) => {
    console.log('金额', balance);
    userBalance.value = balance;
  };

  const dispatchUserCheck = async () => {
    try {
      setSuccess(false);
      await get(apiRoutes.PERSONAL_INFO_PAGE.USER_CHECK);
      setUserCheck(true);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchUserBalance = async () => {
    try {
      setSuccess(false);
      const response = await get<User.GetUserBalanceResponseData>(apiRoutes.PERSONAL_INFO_PAGE.USER_BALANCE);
      setUserBalance(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchSetUserCurrency = async (currency: string) => {
    try {
      setSuccess(false);
      await post(apiRoutes.PERSONAL_INFO_PAGE.SET_USER_CURRENCY, { currency_type: currency });
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchUserEmailVerify = async () => {
    try {
      setSuccess(false);
      const response = await get<User.GetUserEmailVerifyResponseData>(apiRoutes.PERSONAL_INFO_PAGE.USER_EMAIL_VERIFY);
      setVerifyTime(response.time);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    userCheck,
    verifyTime,
    userBalance,
    getSuccess,
    getErrMessage,
    getUserCheck,
    getVerifyTime,
    getUserBalance,
    setSuccess,
    setErrorMessage,
    setUserCheck,
    setVerifyTime,
    setUserBalance,
    dispatchUserCheck,
    dispatchUserBalance,
    dispatchSetUserCurrency,
    dispatchUserEmailVerify,
  };
});
