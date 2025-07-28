import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useErrorHandler } from '@/composables/useErrorHandler';

export const menuStore = defineStore('mobile_menu', () => {
  const success = ref(false);
  const errMessage = ref('');
  const selectedItem = ref('Promo');
  const semiCircleShow = ref(false);
  const rewardNavShow = ref(false);

  const { handleException } = useErrorHandler();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getSelectedItem = computed(() => selectedItem.value);
  const getSemiCircleShow = computed(() => semiCircleShow.value);
  const getRewardNavShow = computed(() => rewardNavShow.value);

  const setSelectedItem = (item: string) => {
    selectedItem.value = item;
  };
  const setSemiCircleShow = (show: boolean) => {
    semiCircleShow.value = show;
  };
  const setRewardNavShow = (show: boolean) => {
    rewardNavShow.value = show;
  };

  return {
    success,
    errMessage,
    selectedItem,
    semiCircleShow,
    rewardNavShow,
    getSuccess,
    getErrMessage,
    getSelectedItem,
    getSemiCircleShow,
    getRewardNavShow,
    setSelectedItem,
    setSemiCircleShow,
    setRewardNavShow,
  };
});
