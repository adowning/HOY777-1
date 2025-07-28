import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useErrorHandler } from '@/composables/useErrorHandler';

export const refferalStore = defineStore('refferal', () => {
  const success = ref(false);
  const errMessage = ref('');
  const refferalAppBarShow = ref(true);
  const refferalDialogVisible = ref(false);

  const { handleException } = useErrorHandler();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getRefferalAppBarShow = computed(() => refferalAppBarShow.value);
  const getRefferalDialogVisible = computed(() => refferalDialogVisible.value);

  const setRefferalAppBarShow = (show: boolean) => {
    refferalAppBarShow.value = show;
  };
  const setRefferalDialogShow = (visible: boolean) => {
    refferalDialogVisible.value = visible;
  };

  return {
    success,
    errMessage,
    refferalAppBarShow,
    refferalDialogVisible,
    getSuccess,
    getErrMessage,
    getRefferalAppBarShow,
    getRefferalDialogVisible,
    setRefferalAppBarShow,
    setRefferalDialogShow,
  };
});
