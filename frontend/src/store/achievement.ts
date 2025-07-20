import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import * as Achievement from "@/interface/achievement";
import { useApi } from '@/composables/useApi';

export const achievementStore = defineStore('achievement', () => {
  const success = ref(false);
  const errMessage = ref('');
  const achievementItem = ref<Achievement.GetAchievementItem>({
    achievement_progress: 0,
    achievement_explain: [],
    award_progress: 0,
    award_explain: [],
    rate: 0,
  });

  const { get, post, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getAchievementItem = computed(() => achievementItem.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setAchievementItem = (item: Achievement.GetAchievementItem) => {
    achievementItem.value = item;
  };

  const dispatchAchievementList = async () => {
    try {
      setSuccess(false);
      const response = await get<Achievement.GetAchievementResponse>(apiRoutes.ACHIEVEMENT_PAGE.ACHIEVEMENT_LIST);
      setAchievementItem(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchAchievementConfig = async () => {
    try {
      setSuccess(false);
      const response = await get<Achievement.GetAchievementResponse>(apiRoutes.ACHIEVEMENT_PAGE.ACHIEVEMENT_CONFIG);
      setAchievementItem(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchStageAward = async (data: any) => {
    try {
      setSuccess(false);
      await post(apiRoutes.ACHIEVEMENT_PAGE.STAGE_AWARD, data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchAchievementAward = async (data: any) => {
    try {
      setSuccess(false);
      await post(apiRoutes.ACHIEVEMENT_PAGE.ACHIEVEMENT_AWARD, data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    achievementItem,
    getSuccess,
    getErrMessage,
    getAchievementItem,
    setSuccess,
    setErrorMessage,
    setAchievementItem,
    dispatchAchievementList,
    dispatchAchievementConfig,
    dispatchStageAward,
    dispatchAchievementAward,
  };
});
