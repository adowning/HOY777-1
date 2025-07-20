import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import * as Bonus from "@/interface/bonus";
import { useApi } from '@/composables/useApi';

export const bonusStore = defineStore('bonus', () => {
  const success = ref(false);
  const errMessage = ref('');
  const bonusList = ref<Bonus.GetBonusList>({ list: [] });

  const { get, post, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getBonusList = computed(() => bonusList.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setBonusList = (list: Bonus.GetBonusList) => {
    bonusList.value = list;
  };

  const dispatchUserBonus = async () => {
    try {
      setSuccess(false);
      const response = await post<Bonus.GetUserBonusResponse>(apiRoutes.BONUS_PAGE.USER_BONUS);
      setBonusList(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchBonusCancel = async (data: any) => {
    try {
      setSuccess(false);
      await post(apiRoutes.BONUS_PAGE.BONUS_CANCEL, data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    bonusList,
    getSuccess,
    getErrMessage,
    getBonusList,
    setSuccess,
    setErrorMessage,
    setBonusList,
    dispatchUserBonus,
    dispatchBonusCancel,
  };
});
