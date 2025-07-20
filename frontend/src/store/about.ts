import { useErrorHandler } from '@/composables/useErrorHandler';

export const aboutStore = defineStore('about_us', () => {
  const success = ref(false);
  const errMessage = ref('');
  const activeAboutIndex = ref(0);

  const { handleException } = useErrorHandler();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getActiveAboutIndex = computed(() => activeAboutIndex.value);

  const setActiveAboutIndex = (index: number) => {
    activeAboutIndex.value = index;
  };

  return {
    success,
    errMessage,
    activeAboutIndex,
    getSuccess,
    getErrMessage,
    getActiveAboutIndex,
    setActiveAboutIndex,
  };
});
