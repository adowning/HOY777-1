import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useErrorHandler } from '@/composables/useErrorHandler';

export const loginBonusStore = defineStore('loginBonus', () => {
  const success = ref(false);
  const errMessage = ref('');
  const loginBonusDialogVisible = ref(false);
  const rouletteBonusDialogVisible = ref(false);
  const getBonusDialogVisible = ref(false);

  const { handleException } = useErrorHandler();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getLoginBonusDialogVisible = computed(() => loginBonusDialogVisible.value);
  const getRouletteBonusDialogVisible = computed(() => rouletteBonusDialogVisible.value);
  const getDepositAndBonusDialogVisible = computed(() => getBonusDialogVisible.value);

  const setLoginBonusDialogVisible = (visible: boolean) => {
    console.log(visible);
    loginBonusDialogVisible.value = visible;
  };
  const setRouletteBonusDialogVisible = (visible: boolean) => {
    rouletteBonusDialogVisible.value = visible;
  };
  const setGetBonusDialogVisible = (visible: boolean) => {
    getBonusDialogVisible.value = visible;
  };

  return {
    success,
    errMessage,
    loginBonusDialogVisible,
    rouletteBonusDialogVisible,
    getBonusDialogVisible,
    getSuccess,
    getErrMessage,
    getLoginBonusDialogVisible,
    getRouletteBonusDialogVisible,
    getDepositAndBonusDialogVisible,
    setLoginBonusDialogVisible,
    setRouletteBonusDialogVisible,
    setGetBonusDialogVisible,
  };
});
