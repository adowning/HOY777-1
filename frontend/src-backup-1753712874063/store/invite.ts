import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type * as Invite from "@/interface/invite";
import { useApi } from '@/composables/useApi';

export const inviteStore = defineStore('invite', () => {
  const success = ref(false);
  const errMessage = ref('');
  const inviteItem = ref<Invite.InviteData>({
    bonus_month: 0,
    bonus_today: 0,
    bonus_total: 0,
    bonus_yesterdays: 0,
    deposit_users: 0,
    deposit_users_month: 0,
    deposit_users_today: 0,
    deposit_users_yesterdays: 0,
    invite_code: "",
    invited_users: 0,
    web_invite_url: import.meta.env.VITE_BASE_URL,
    available_bonus: 0,
  });
  const personalInvitationInfo = ref<Invite.PersonalInvitationInformation>({
    total_profit: "19,34",
    invitation_bonus: 25.916,
    bettion_commission: "40.533,73",
    achievement_bonus: 3.225,
    deposited_users: 3972,
    profit_today: {
      profit: "19,34",
      bettion_commission: "19,34",
      invite_bonus: 0
    },
    profit_week: {
      profit: "19,34",
      bettion_commission: "19,34",
      invite_bonus: 0
    },
    profit_month: {
      profit: "19,34",
      bettion_commission: "19,34",
      invite_bonus: 0
    }
  });
  const inviteHistoryConfig = ref<Invite.InviteHistoryConfig>({} as Invite.InviteHistoryConfig);
  const statisticsItem = ref<Invite.StatisticsData>({
    today_profit: {
      register_user: [],
      deposit_user: [],
      deposit_bonus: 0,
      deposit_amount: [],
      bet_amount: [],
      bet_bonus: [],
      achievement_award: 0,
    },
    week_profit: {
      register_user: [],
      deposit_user: [],
      deposit_bonus: 0,
      deposit_amount: [],
      bet_amount: [],
      bet_bonus: [],
      achievement_award: 0,
    },
    month_profit: {
      register_user: [],
      deposit_user: [],
      deposit_bonus: 0,
      deposit_amount: [],
      bet_amount: [],
      bet_bonus: [],
      achievement_award: 0,
    },
    receive_profit: 0,
  });
  const inviteHistoryItem = ref<Invite.InviteHistoryData>({
    total_pages: 0,
    list: []
  });

  const { get, post, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getInviteItem = computed(() => inviteItem.value);
  const getPersonalInvitationInfo = computed(() => personalInvitationInfo.value);
  const getInviteHistoryConfig = computed(() => inviteHistoryConfig.value);
  const getStatisticsItem = computed(() => statisticsItem.value);
  const getInviteHistoryItem = computed(() => inviteHistoryItem.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setInviteItem = (item: Invite.InviteData) => {
    inviteItem.value = item;
  };
  const setPersonalInvitationInfo = (info: Invite.PersonalInvitationInformation) => {
    personalInvitationInfo.value = info;
  };
  const setInviteHistoryConfig = (config: Invite.InviteHistoryConfig) => {
    inviteHistoryConfig.value = config;
  };
  const setStatisticsItem = (item: Invite.StatisticsData) => {
    statisticsItem.value = item;
  };
  const setInviteHistoryItem = (item: Invite.InviteHistoryData) => {
    inviteHistoryItem.value = item;
  };

  const dispatchUserInvite = async () => {
    try {
      setSuccess(false);
      const response = await get<Invite.GetInviteResponse>(apiRoutes.INVITE_PAGE.INVITE_INFO);
      setInviteItem(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchUserInviteHistory = async (formData: Invite.InviteHistoryFormData) => {
    try {
      setSuccess(false);
      const response = await get<Invite.InviteHistoryResponse>(apiRoutes.INVITE_PAGE.INVITE_HISTORY, formData);
      setInviteHistoryItem(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchStatisticsList = async () => {
    try {
      setSuccess(false);
      const response = await get<Invite.GetStatisticsResponse>(apiRoutes.INVITE_PAGE.STATISTICS_LIST);
      setStatisticsItem(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchInviteAward = async (data: any) => {
    try {
      setSuccess(false);
      await post(apiRoutes.INVITE_PAGE.INVITER_AWARD, data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchInviteSelf = async () => {
    try {
      setSuccess(false);
      const response = await get<Invite.GetInviteSelfResponse>(apiRoutes.INVITE_PAGE.INVITE_SELF);
      setPersonalInvitationInfo(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchInviteHistoryCfg = async () => {
    try {
      setSuccess(false);
      const response = await get<Invite.GetInviteHistoryResponse>(apiRoutes.INVITE_PAGE.INVITE_HISTORY_CONFIG);
      setInviteHistoryConfig(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    inviteItem,
    personalInvitationInfo,
    inviteHistoryConfig,
    statisticsItem,
    inviteHistoryItem,
    getSuccess,
    getErrMessage,
    getInviteItem,
    getPersonalInvitationInfo,
    getInviteHistoryConfig,
    getStatisticsItem,
    getInviteHistoryItem,
    setSuccess,
    setErrorMessage,
    setInviteItem,
    setPersonalInvitationInfo,
    setInviteHistoryConfig,
    setStatisticsItem,
    setInviteHistoryItem,
    dispatchUserInvite,
    dispatchUserInviteHistory,
    dispatchStatisticsList,
    dispatchInviteAward,
    dispatchInviteSelf,
    dispatchInviteHistoryCfg,
  };
});
