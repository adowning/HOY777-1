import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type * as Socket from "@/interface/socket";
import { useApi } from '@/composables/useApi';

export const socketStore = defineStore('socket', () => {
  const success = ref(false);
  const errMessage = ref('');
  const socketBalance = ref<Socket.GetUserBalance>({} as Socket.GetUserBalance);

  const { connectWs, disconnectWs } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getSocketBalance = computed(() => socketBalance.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setSocketBalance = (balance: Socket.GetUserBalance) => {
    socketBalance.value = balance;
  };

  const dispatchSocketConnect = () => {
    connectWs();
  };

  const dispatchSocketDisconnect = () => {
    disconnectWs();
  };

  return {
    success,
    errMessage,
    socketBalance,
    getSuccess,
    getErrMessage,
    getSocketBalance,
    setSuccess,
    setErrorMessage,
    setSocketBalance,
    dispatchSocketConnect,
    dispatchSocketDisconnect,
  };
});
