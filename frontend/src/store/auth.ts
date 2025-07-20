import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type * as SignIn from "@/interface/signin";
import type * as SignUp from "@/interface/signup";
import type * as User from "@/interface/user";
import { useApi } from '@/composables/useApi';
import { useApiConfig } from '@/composables/useApiConfig';

export const authStore = defineStore('auth', () => {
  const success = ref(false);
  const errMessage = ref('');
  const authModalType = ref('');
  const dialogCheckbox = ref(false);
  const authDialogVisible = ref(false);
  const signUpForm = ref(false);
  const nickNameDialogVisible = ref(false);
  const { token, setToken, clearToken } = useApiConfig();
  const userInfo = ref<User.GetUserInfo | null>(null);
  const userAmount = ref<User.GetUserAmount | null>(null);
  const isLoading = ref(false);

  const { get, post, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getAuthModalType = computed(() => authModalType.value);
  const getToken = computed(() => token.value);
  const getUserInfo = computed(() => userInfo.value);
  const getUserAmount = computed(() => userAmount.value);
  const getDialogCheckbox = computed(() => dialogCheckbox.value);
  const getAuthDialogVisible = computed(() => authDialogVisible.value);
  const getSignUpForm = computed(() => signUpForm.value);
  const getNickNameDialogVisible = computed(() => nickNameDialogVisible.value);
  const getIsLoading = computed(() => isLoading.value);

  const setAuthModalType = (type: string) => {
    authModalType.value = type;
  };
  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const removeToken = () => {
    clearToken();
    userInfo.value = null;
    userAmount.value = null;
  };
  const setUserInfo = (info: User.GetUserInfo) => {
    userInfo.value = info;
  };
  const setUserAmount = (amount: User.GetUserAmount) => {
    userAmount.value = amount;
  };
  const setDialogCheckbox = (value: boolean) => {
    dialogCheckbox.value = value;
  };
  const setAuthDialogVisible = (value: boolean) => {
    authDialogVisible.value = value;
  };
  const setSignUpForm = (value: boolean) => {
    signUpForm.value = value;
  };
  const setNickNameDialogVisible = (value: boolean) => {
    nickNameDialogVisible.value = value;
  };

  const dispatchSignIn = async (msg: SignIn.SigninRequestData) => {
    try {
      isLoading.value = true;
      setSuccess(false);
      const response = await post<SignIn.GetSigninResponseData>(apiRoutes.LOGIN.LOGIN, msg);
      setToken(response.token);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      isLoading.value = false;
    }
  };

  const dispatchSignUp = async (msg: SignUp.SignupRequestData) => {
    try {
      isLoading.value = true;
      setSuccess(false);
      const response = await post<SignUp.GetSignupResponseData>(apiRoutes.LOGIN.REGISTER, msg);
      setToken(response.token);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      isLoading.value = false;
    }
  };

  const dispatchUserProfile = async () => {
    try {
      isLoading.value = true;
      setSuccess(false);
      const response = await get<User.GetUserInfoResponseData>(apiRoutes.PERSONAL_INFO_PAGE.USER_INFO);
      if (response.data.avatar == "") {
        response.data.avatar = new URL("@/assets/public/image/ua_public_10.png", import.meta.url).href;
      }
      setErrorMessage("");
      setUserInfo(response.data);
      setSuccess(true);
    } catch (error: any) {
      if (error.code == 101004) {
        dispatchSignout();
      }
      setErrorMessage(error);
    } finally {
      isLoading.value = false;
    }
  };

  const dispatchUserAmount = async () => {
    try {
      isLoading.value = true;
      setSuccess(false);
      const response = await get<User.GetUserAmountResponseData>(apiRoutes.PERSONAL_INFO_PAGE.USER_AMOUNT);
      setUserAmount(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      isLoading.value = false;
    }
  };

  const dispatchUpdateUserInfo = async (data: any) => {
    try {
      isLoading.value = true;
      setSuccess(false);
      await post(apiRoutes.PERSONAL_INFO_PAGE.USER_CHANGE, data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      isLoading.value = false;
    }
  };

  const dispatchUpdateEmail = async (data: User.UpdateEmail) => {
    try {
      isLoading.value = true;
      setSuccess(false);
      await post(apiRoutes.PERSONAL_INFO_PAGE.USER_EMAIL, data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      isLoading.value = false;
    }
  };

  const dispatchUpdatePassword = async (data: User.UpdatePassword) => {
    try {
      isLoading.value = true;
      setSuccess(false);
      await post(apiRoutes.PERSONAL_INFO_PAGE.USER_PASSWORD, data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      isLoading.value = false;
    }
  };

  const dispatchSuspendUser = async (data: User.UpdateSuspendUser) => {
    try {
      isLoading.value = true;
      setSuccess(false);
      await post(apiRoutes.PERSONAL_INFO_PAGE.USER_SUSPEND, data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      isLoading.value = false;
    }
  };

  const dispatchSignout = () => {
    removeToken();
  };

  return {
    success,
    errMessage,
    authModalType,
    dialogCheckbox,
    authDialogVisible,
    signUpForm,
    nickNameDialogVisible,
    token,
    userInfo,
    userAmount,
    isLoading,
    getSuccess,
    getErrMessage,
    getAuthModalType,
    getToken,
    getUserInfo,
    getUserAmount,
    getDialogCheckbox,
    getAuthDialogVisible,
    getSignUpForm,
    getNickNameDialogVisible,
    getIsLoading,
    setAuthModalType,
    setSuccess,
    setErrorMessage,
    setToken,
    removeToken,
    setUserInfo,
    setUserAmount,
    setDialogCheckbox,
    setAuthDialogVisible,
    setSignUpForm,
    setNickNameDialogVisible,
    dispatchSignIn,
    dispatchSignUp,
    dispatchUserProfile,
    dispatchUserAmount,
    dispatchUpdateUserInfo,
    dispatchUpdateEmail,
    dispatchUpdatePassword,
    dispatchSuspendUser,
    dispatchSignout,
  };
});
