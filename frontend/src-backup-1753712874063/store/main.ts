import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useErrorHandler } from '@/composables/useErrorHandler';

export const mainStore = defineStore('main', () => {
  const success = ref(false);
  const errMessage = ref('');
  const searchDialogShow = ref(false);

  const { handleException } = useErrorHandler();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getSearchDialogShow = computed(() => searchDialogShow.value);

  const setSearchDialogShow = (show: boolean) => {
    searchDialogShow.value = show;
  };

  return {
    success,
    errMessage,
    searchDialogShow,
    getSuccess,
    getErrMessage,
    getSearchDialogShow,
    setSearchDialogShow,
  };
});
