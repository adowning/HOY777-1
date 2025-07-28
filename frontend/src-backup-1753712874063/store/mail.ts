import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { type GetMailData } from '@/interface/mail';
import { useErrorHandler } from '@/composables/useErrorHandler';

export const mailStore = defineStore('mail', () => {
  const success = ref(false);
  const errMessage = ref('');
  const mailList = ref<GetMailData[]>([
    {
      id: 1,
      icon: new URL("@/assets/public/svg/icon_public_14.svg", import.meta.url).href,
      offset: 0,
      mail_content_1: {
        color: "text-color-white text-500-12",
        content: "Subscribe to notifications"
      },
      mail_content_2: {
        color: "text-color-gray text-500-10",
        content: "Enable push notifications to receive exclusive bonuses!"
      },
      mail_rail_1: {
        color: "",
        content: ""
      },
      mail_rail_2: {
        color: "",
        content: ""
      }
    },
    {
      id: 2,
      icon: new URL("@/assets/public/svg/icon_public_15.svg", import.meta.url).href,
      offset: 0,
      mail_content_1: {
        color: "text-color-white text-500-12",
        content: "Refer a friend"
      },
      mail_content_2: {
        color: "text-color-gray text-500-10",
        content: "lnvite Friends, Earn $10 Per lnvite"
      },
      mail_rail_1: {
        color: "",
        content: ""
      },
      mail_rail_2: {
        color: "",
        content: ""
      }
    },
  ]);
  const mailMenuShow = ref(false);
  const mobileMenuMailToggle = ref(false);

  const { handleException } = useErrorHandler();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getMailList = computed(() => mailList.value);
  const getMailMenuShow = computed(() => mailMenuShow.value);
  const getMobileMenuMailToggle = computed(() => mobileMenuMailToggle.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setMailList = (mailItem: GetMailData) => {
    mailList.value.unshift(mailItem);
  };
  const setMailMenuShow = (show: boolean) => {
    mailMenuShow.value = show;
  };
  const setMobileMenuMailToggle = (toggle: boolean) => {
    mobileMenuMailToggle.value = toggle;
  };

  return {
    success,
    errMessage,
    mailList,
    mailMenuShow,
    mobileMenuMailToggle,
    getSuccess,
    getErrMessage,
    getMailList,
    getMailMenuShow,
    getMobileMenuMailToggle,
    setSuccess,
    setErrorMessage,
    setMailList,
    setMailMenuShow,
    setMobileMenuMailToggle,
  };
});
