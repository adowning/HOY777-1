
import { ref, computed } from "vue";
import { defineStore } from 'pinia';

export const appBarStore = defineStore('appBar', () => {
  const success = ref(false);
  const errMessage = ref('');
  const rightBarToggle = ref(false);
  const navBarToggle = ref(true);
  const cashDialogToggle = ref(false);
  const depositDialogToggle = ref(false);
  const withdrawDialogToggle = ref(false);
  const userNavBarToggle = ref(false);
  const mainBlurEffectShow = ref(false);
  const overlayScrimShow = ref(false);
  const accountDialogShow = ref(false);
  const depositBlurEffectShow = ref(false);
  const fixPositionEnable = ref(false);
  const headerBlurEffectShow = ref(false);
  const menuBlurEffectShow = ref(false);
  const depositHeaderBlurEffectShow = ref(false);
  const depositWithdrawToggle = ref(false);
  const bonusDashboardDialogVisible = ref(false);
  const activeAccountIndex = ref(0);

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getRightBarToggle = computed(() => rightBarToggle.value);
  const getNavBarToggle = computed(() => navBarToggle.value);
  const getDepositDialogToggle = computed(() => depositDialogToggle.value);
  const getWithdrawDialogToggle = computed(() => withdrawDialogToggle.value);
  const getCashDialogToggle = computed(() => cashDialogToggle.value);
  const getUserNavBarToggle = computed(() => userNavBarToggle.value);
  const getMainBlurEffectShow = computed(() => mainBlurEffectShow.value);
  const getOverlayScrimShow = computed(() => overlayScrimShow.value);
  const getAccountDialogShow = computed(() => accountDialogShow.value);
  const getDepositBlurEffectShow = computed(() => depositBlurEffectShow.value);
  const getFixPositionEnable = computed(() => fixPositionEnable.value);
  const getHeaderBlurEffectShow = computed(() => headerBlurEffectShow.value);
  const getMenuBlurEffectShow = computed(() => menuBlurEffectShow.value);
  const getDepositHeaderBlurEffectShow = computed(() => depositHeaderBlurEffectShow.value);
  const getDepositWithdrawToggle = computed(() => depositWithdrawToggle.value);
  const getBonusDashboardDialogVisible = computed(() => bonusDashboardDialogVisible.value);
  const getActiveAccountIndex = computed(() => activeAccountIndex.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setRightBarToggle = (value: boolean) => {
    rightBarToggle.value = value;
  };
  const setNavBarToggle = (value: boolean) => {
    navBarToggle.value = value;
  };
  const setDepositDialogToggle = (value: boolean) => {
    console.log("rrrrrrrrrrrrrrrrrrrrrrrr", value);
    depositDialogToggle.value = value;
  };
  const setWithdrawDialogToggle = (value: boolean) => {
    withdrawDialogToggle.value = value;
  };
  const setCashDialogToggle = (value: boolean) => {
    cashDialogToggle.value = value;
  };
  const setUserNavBarToggle = (value: boolean) => {
    userNavBarToggle.value = value;
  };
  const setMainBlurEffectShow = (value: boolean) => {
    mainBlurEffectShow.value = value;
  };
  const setOverlayScrimShow = (value: boolean) => {
    overlayScrimShow.value = value;
  };
  const setAccountDialogShow = (value: boolean) => {
    accountDialogShow.value = value;
  };
  const setDepositBlurEffectShow = (value: boolean) => {
    depositBlurEffectShow.value = value;
  };
  const setFixPositionEnable = (value: boolean) => {
    fixPositionEnable.value = value;
  };
  const setHeaderBlurEffectShow = (value: boolean) => {
    headerBlurEffectShow.value = value;
  };
  const setMenuBlurEffectShow = (value: boolean) => {
    menuBlurEffectShow.value = value;
  };
  const setDepositHeaderBlurEffectShow = (value: boolean) => {
    depositHeaderBlurEffectShow.value = value;
  };
  const setDepositWithdrawToggle = (value: boolean) => {
    depositWithdrawToggle.value = value;
  };
  const setBonusDashboardDialogVisible = (value: boolean) => {
    bonusDashboardDialogVisible.value = value;
  };
  const setActiveAccountIndex = (value: number) => {
    activeAccountIndex.value = value;
  };

  return {
    success,
    errMessage,
    rightBarToggle,
    navBarToggle,
    cashDialogToggle,
    depositDialogToggle,
    withdrawDialogToggle,
    userNavBarToggle,
    mainBlurEffectShow,
    overlayScrimShow,
    accountDialogShow,
    depositBlurEffectShow,
    fixPositionEnable,
    headerBlurEffectShow,
    menuBlurEffectShow,
    depositHeaderBlurEffectShow,
    depositWithdrawToggle,
    bonusDashboardDialogVisible,
    activeAccountIndex,
    getSuccess,
    getErrMessage,
    getRightBarToggle,
    getNavBarToggle,
    getDepositDialogToggle,
    getWithdrawDialogToggle,
    getCashDialogToggle,
    getUserNavBarToggle,
    getMainBlurEffectShow,
    getOverlayScrimShow,
    getAccountDialogShow,
    getDepositBlurEffectShow,
    getFixPositionEnable,
    getHeaderBlurEffectShow,
    getMenuBlurEffectShow,
    getDepositHeaderBlurEffectShow,
    getDepositWithdrawToggle,
    getBonusDashboardDialogVisible,
    getActiveAccountIndex,
    setSuccess,
    setErrorMessage,
    setRightBarToggle,
    setNavBarToggle,
    setDepositDialogToggle,
    setWithdrawDialogToggle,
    setCashDialogToggle,
    setUserNavBarToggle,
    setMainBlurEffectShow,
    setOverlayScrimShow,
    setAccountDialogShow,
    setDepositBlurEffectShow,
    setFixPositionEnable,
    setHeaderBlurEffectShow,
    setMenuBlurEffectShow,
    setDepositHeaderBlurEffectShow,
    setDepositWithdrawToggle,
    setBonusDashboardDialogVisible,
    setActiveAccountIndex,
  };
});

