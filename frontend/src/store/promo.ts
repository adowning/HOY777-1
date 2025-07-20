import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type * as Promo from "@/interface/promo";
import { useApi } from '@/composables/useApi';

export const promoStore = defineStore('promo', () => {
  const success = ref(false);
  const errMessage = ref('');
  const userActivityList = ref<Promo.PromoGroupData>({
    group_data: [
      {
        group_id: 0,
        group_name: "",
        list_data: []
      }
    ]
  });

  const { get, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getUserActivityList = computed(() => userActivityList.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setUserActivityList = (list: any) => {
    userActivityList.value = list;
  };

  const dispatchUserActivityList = async () => {
    try {
      setSuccess(false);
      const response = await get<any>(apiRoutes.ACTIVITY.USER_ACTIVITY_LIST);
      setUserActivityList(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    userActivityList,
    getSuccess,
    getErrMessage,
    getUserActivityList,
    setSuccess,
    setErrorMessage,
    setUserActivityList,
    dispatchUserActivityList,
  };
});
