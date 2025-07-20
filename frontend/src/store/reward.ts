import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type * as Reward from "@/interface/reward";
import { useApi } from '@/composables/useApi';

export const rewardStore = defineStore('reward', () => {
  const success = ref(false);
  const errMessage = ref('');
  const rewardList = ref<Reward.GetRewardCenterList>({} as Reward.GetRewardCenterList);

  const { get, post, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getRewardList = computed(() => rewardList.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setRewardList = (list: Reward.GetRewardCenterList) => {
    rewardList.value = list;
  };

  const dispatchRewardList = async () => {
    try {
      setSuccess(false);
      const response = await get<Reward.GetRewardCenterListResponse>(apiRoutes.Reward.REWARD_LIST);
      setRewardList(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchReceiveAchievementBonus = async () => {
    try {
      setSuccess(false);
      await post(apiRoutes.Reward.RECIEVE_ACHIV_BONUS, {});
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    rewardList,
    getSuccess,
    getErrMessage,
    getRewardList,
    setSuccess,
    setErrorMessage,
    setRewardList,
    dispatchRewardList,
    dispatchReceiveAchievementBonus,
  };
});
