import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type * as Banner from "@/interface/banner";
import { useApi } from '@/composables/useApi';

export const bannerStore = defineStore('banner', () => {
  const success = ref(false);
  const errMessage = ref('');
  const bannerList = ref<Array<Banner.GetBannerList>>([]);

  const { get, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getBannerList = computed(() => bannerList.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setBannerList = (list: Array<Banner.GetBannerList>) => {
    bannerList.value = list;
  };

  const dispatchBannerList = async () => {
    try {
      setSuccess(false);
      const response = await get<Banner.GetBannerListResponse>(apiRoutes.Banner.BANNER_LIST);
      setBannerList(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    bannerList,
    getSuccess,
    getErrMessage,
    getBannerList,
    setSuccess,
    setErrorMessage,
    setBannerList,
    dispatchBannerList,
  };
});
