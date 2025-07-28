import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { i18n } from "@/locale/index";
import type * as Vip from "@/interface/vip";
import { useApi } from '@/composables/useApi';
import { useToast } from "vue-toastification";
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from "@/components/global/notification/WarningIcon.vue";

export const vipStore = defineStore('vip', () => {
  const success = ref(false);
  const errMessage = ref('');
  const levelUpDialogVisible = ref(false);
  const vipInfo = ref<Vip.VipInfo>({} as Vip.VipInfo);
  const vipLevels = ref<Array<Vip.VipLevel>>([]);
  const vipTasks = ref<Array<Vip.VipTaskItem>>([]);
  const vipRebateHistory = ref<Vip.VipRebateHistoryData>({ total: 0, list: [] });
  const vipLevelRewardHistory = ref<Vip.VipLevelRewardHistoryData>({ total: 0, list: [] });
  const vipTimesHistory = ref<Vip.VipTimesHistoryData>({ total: 0, list: [] });
  const vipSignIn = ref<Vip.VipSignInData>({
    award: [],
    signin_day: 0,
    is_signin: 0,
    limited_bet: 0,
    limited_deposit: 0,
    vip_level: 0,
  });
  const vipLevelUpList = ref<Vip.VipLevelUpListData>({} as Vip.VipLevelUpListData);
  const vipLevelUpReceive = ref<Vip.VipLevelUpReceiveData>({} as Vip.VipLevelUpReceiveData);
  const vipNavBarToggle = ref('');
  const vipCycleawardList = ref<Vip.VipCycleawardListData>({} as Vip.VipCycleawardListData);
  const vipLevelAward = ref<Vip.VipLevelAwardData>({} as Vip.VipLevelAwardData);
  const vipBetawardList = ref<Vip.vipBetawardListData>({} as Vip.vipBetawardListData);

  const { get, post, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getVipInfo = computed(() => vipInfo.value);
  const getVipLevels = computed(() => vipLevels.value);
  const getVipTasks = computed(() => vipTasks.value);
  const getVipRebateHistory = computed(() => vipRebateHistory.value);
  const getVipLevelRewardHistory = computed(() => vipLevelRewardHistory.value);
  const getVipTimesHistory = computed(() => vipTimesHistory.value);
  const getVipSignIn = computed(() => vipSignIn.value);
  const getLevelUpDialogVisible = computed(() => levelUpDialogVisible.value);
  const getVipLevelUpList = computed(() => vipLevelUpList.value);
  const getVipLevelUpReceive = computed(() => vipLevelUpReceive.value);
  const getVipNavBarToggle = computed(() => vipNavBarToggle.value);
  const getVipCycleawardList = computed(() => vipCycleawardList.value);
  const getVipLevelAward = computed(() => vipLevelAward.value);
  const getVipBetawardList = computed(() => vipBetawardList.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setVipInfo = (info: Vip.VipInfo) => {
    vipInfo.value = info;
  };
  const setVipLevels = (levels: Array<Vip.VipLevel>) => {
    vipLevels.value = levels;
  };
  const setVipTasks = (tasks: Array<Vip.VipTaskItem>) => {
    vipTasks.value = tasks;
  };
  const setVipRebateHistory = (history: Vip.VipRebateHistoryData) => {
    vipRebateHistory.value = history;
  };
  const setVipLevelRewardHistory = (history: Vip.VipLevelRewardHistoryData) => {
    vipLevelRewardHistory.value = history;
  };
  const setVipTimesHistory = (history: Vip.VipTimesHistoryData) => {
    vipTimesHistory.value = history;
  };
  const setVipSignIn = (signin: Vip.VipSignInData) => {
    vipSignIn.value = signin;
  };
  const setLevelUpDialogVisible = (visible: boolean) => {
    levelUpDialogVisible.value = visible;
  };
  const setVipLevelUpList = (list: Vip.VipLevelUpListData) => {
    vipLevelUpList.value = list;
  };
  const setVipLevelUpReceive = (receive: Vip.VipLevelUpReceiveData) => {
    vipLevelUpReceive.value = receive;
  };
  const setVipNavBarToggle = (toggle: string) => {
    vipNavBarToggle.value = toggle;
    localStorage.setItem('vipBar', toggle);
  };
  const setVipCycleawardList = (list: Vip.VipCycleawardListData) => {
    vipCycleawardList.value = list;
  };
  const setVipLevelAward = (award: Vip.VipLevelAwardData) => {
    vipLevelAward.value = award;
  };
  const setVipBetawardList = (list: Vip.vipBetawardListData) => {
    vipBetawardList.value = list;
  };

  const alertMessage = (successMessage: Vip.SuccessMessageParams) => {
    const toast = useToast();
    toast.success(successMessage.message, {
      timeout: 3000,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: successMessage.type == 1 ? SuccessIcon : WarningIcon,
      rtl: false,
    });
  };

  const dispatchVipSignIn = async () => {
    try {
      setSuccess(false);
      const response = await get<Vip.GetVipSignInResponse>(apiRoutes.VIP_INFO.VIP_SIGNIN);
      setVipSignIn(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipSigninawardReceive = async () => {
    try {
      setSuccess(false);
      await post(apiRoutes.VIP_INFO.VIP_SIGNINAWARD_RECEIVE, {});
      dispatchVipSignIn();
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipSignInReward = async () => {
    try {
      setSuccess(false);
      await post(apiRoutes.VIP_INFO.VIP_SIGNIN_REWARDS, {});
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipInfo = async () => {
    try {
      setSuccess(false);
      const response = await get<Vip.GetVipInfoResponse>(apiRoutes.VIP_INFO.USER_VIP_INFO);
      setVipInfo(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipLevels = async () => {
    try {
      setSuccess(false);
      const response = await get<Vip.GetVipLevelResponse>(apiRoutes.VIP_INFO.USER_VIP_LEVEL);
      setVipLevels(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipTasks = async () => {
    try {
      setSuccess(false);
      const response = await get<Vip.GetVipTaskResponse>(apiRoutes.VIP_INFO.VIP_TASKS);
      setVipTasks(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipRebateAward = async (data: any) => {
    try {
      setSuccess(false);
      await post(apiRoutes.VIP_INFO.VIP_REBATE_AWARD, data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipRebateHistory = async (data: Vip.VipRebateHistoryRequest) => {
    try {
      setSuccess(false);
      const response = await get<Vip.GetVipRebateHistoryResponse>(apiRoutes.VIP_INFO.VIP_REBATE_HISTORY, data);
      setVipRebateHistory(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipLevelRewardHistory = async (data: Vip.VipLevelRewardHistoryRequest) => {
    try {
      setSuccess(false);
      const response = await get<Vip.GetVipLevelRewardHistoryResponse>(apiRoutes.VIP_INFO.VIP_LEVEL_AWARD_HISTORY, data);
      setVipLevelRewardHistory(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipTimesHistory = async (data: Vip.VipTimesHistoryRequest) => {
    try {
      setSuccess(false);
      const response = await get<Vip.GetVipTimesHistoryResponse>(apiRoutes.VIP_INFO.VIP_TIMES_HISTORY, data);
      setVipTimesHistory(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipLevelUpList = async () => {
    try {
      setSuccess(false);
      const response = await get<Vip.GetVipLevelUpListResponse>(apiRoutes.VIP_INFO.VIP_LEVELUP_LIST);
      setVipLevelUpList(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipLevelUpReceive = async () => {
    try {
      setSuccess(false);
      const response = await post<Vip.GetVipLevelUpReceiveResponse>(apiRoutes.VIP_INFO.VIP_LEVELUP_RECEIVE, {});
      setVipLevelUpReceive(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipCycleawardList = async () => {
    try {
      setSuccess(false);
      const response = await get<Vip.GetVipLevelUpReceiveResponse>(apiRoutes.VIP_INFO.USER_VIP_CYCLEAWARD_LIST);
      setVipCycleawardList(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipCycleawardReceive = async (data: Vip.VipCycleawardReceiveRequest) => {
    try {
      setSuccess(false);
      await post(apiRoutes.VIP_INFO.USER_VIP_CYCLEAWARD_RECEIVE, data);
      alertMessage({ message: i18n.global.t('reward.success_text'), type: 1 });
      dispatchVipCycleawardList();
      setSuccess(true);
    } catch (error: any) {
      alertMessage({ message: error, type: 0 });
      setErrorMessage(error);
    }
  };

  const dispatchVipLevelAward = async () => {
    try {
      setSuccess(false);
      const response = await get<Vip.GetVipLevelAwardResponse>(apiRoutes.VIP_INFO.USER_VIP_LEVELAWARD_LIST);
      setVipLevelAward(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipLevelAwardReceive = async (data: Vip.VipLevelAwardReceiveRequest) => {
    try {
      setSuccess(false);
      await post(apiRoutes.VIP_INFO.USER_VIP_LEVELAWARD_RECEIVE, data);
      alertMessage({ message: i18n.global.t('reward.success_text'), type: 1 });
      dispatchVipLevelAward();
      setSuccess(true);
    } catch (error: any) {
      alertMessage({ message: error, type: 0 });
      setErrorMessage(error);
    }
  };

  const dispatchVipBetawardList = async () => {
    try {
      setSuccess(false);
      const response = await get<Vip.GetVipLevelAwardResponse>(apiRoutes.VIP_INFO.USER_VIP_BETAWARD_LIST);
      setVipBetawardList(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchVipBetawardReceive = async (data: Vip.VipBetawardReceiveRequest) => {
    try {
      setSuccess(false);
      await post(apiRoutes.VIP_INFO.USER_VIP_BETAWARD_RECEIVE, data);
      alertMessage({ message: i18n.global.t('reward.success_text'), type: 1 });
      dispatchVipBetawardList();
      setSuccess(true);
    } catch (error: any) {
      alertMessage({ message: error, type: 0 });
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    levelUpDialogVisible,
    vipInfo,
    vipLevels,
    vipTasks,
    vipRebateHistory,
    vipLevelRewardHistory,
    vipTimesHistory,
    vipSignIn,
    vipLevelUpList,
    vipLevelUpReceive,
    vipNavBarToggle,
    vipCycleawardList,
    vipLevelAward,
    vipBetawardList,
    getSuccess,
    getErrMessage,
    getVipInfo,
    getVipLevels,
    getVipTasks,
    getVipRebateHistory,
    getVipLevelRewardHistory,
    getVipTimesHistory,
    getVipSignIn,
    getLevelUpDialogVisible,
    getVipLevelUpList,
    getVipLevelUpReceive,
    getVipNavBarToggle,
    getVipCycleawardList,
    getVipLevelAward,
    getVipBetawardList,
    setSuccess,
    setErrorMessage,
    setVipInfo,
    setVipLevels,
    setVipTasks,
    setVipRebateHistory,
    setVipLevelRewardHistory,
    setVipTimesHistory,
    setVipSignIn,
    setLevelUpDialogVisible,
    setVipLevelUpList,
    setVipLevelUpReceive,
    setVipNavBarToggle,
    setVipCycleawardList,
    setVipLevelAward,
    setVipBetawardList,
    alertMessage,
    dispatchVipSignIn,
    dispatchVipSigninawardReceive,
    dispatchVipSignInReward,
    dispatchVipInfo,
    dispatchVipLevels,
    dispatchVipTasks,
    dispatchVipRebateAward,
    dispatchVipRebateHistory,
    dispatchVipLevelRewardHistory,
    dispatchVipTimesHistory,
    dispatchVipLevelUpList,
    dispatchVipLevelUpReceive,
    dispatchVipCycleawardList,
    dispatchVipCycleawardReceive,
    dispatchVipLevelAward,
    dispatchVipLevelAwardReceive,
    dispatchVipBetawardList,
    dispatchVipBetawardReceive,
  };
});