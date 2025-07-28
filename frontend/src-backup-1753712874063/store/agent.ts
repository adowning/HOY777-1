import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useErrorHandler } from '@/composables/useErrorHandler';

export const agentStore = defineStore('agent', () => {
  const success = ref(false);
  const errMessage = ref('');
  const agentNavBarToggle = ref(false);

  const { handleException } = useErrorHandler();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getAgentNavBarToggle = computed(() => agentNavBarToggle.value);

  const setAgentNavBarToggle = (toggle: boolean) => {
    agentNavBarToggle.value = toggle;
  };

  return {
    success,
    errMessage,
    agentNavBarToggle,
    getSuccess,
    getErrMessage,
    getAgentNavBarToggle,
    setAgentNavBarToggle,
  };
});
