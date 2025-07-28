<script lang="ts" setup>
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
import router from "@/router";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { computed, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";

const { t } = useI18n();
const emit = defineEmits<{ (): void }>();
const props = defineProps<{ suspendDate: number }>();
const { suspendDate } = toRefs(props);
const { dispatchSuspendUser } = authStore();
const { dispatchSignout } = authStore();

const loading = ref<boolean>(false);
const notificationShow = ref<boolean>(false);
const checkIcon = ref<string>(
  new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
);
const notificationText = ref<string>("");

const success = computed(() => {
  const { getSuccess } = storeToRefs(authStore());
  return getSuccess.value;
});

const errMessage = computed((): string => {
  const { getErrMessage } = storeToRefs(authStore());
  return getErrMessage.value;
});

const submitSuspend = async () => {
  loading.value = true;
  await dispatchSuspendUser({
    time: suspendDate.value,
  });
  if (success.value) {
    emit("suspendDialogHide");
    dispatchSignout();
    router.push({ name: "Dashboard" });
  } else {
    notificationShow.value = !notificationShow.value;

    checkIcon.value = new URL(
      "@/assets/public/svg/icon_public_17.svg",
      import.meta.url
    ).href;
    notificationText.value = errMessage.value;
    if (notificationShow.value) {
      const toast = useToast();
      toast.success(notificationText.value, {
        timeout: 3000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: WarningIcon,
        rtl: false,
      });
    }
    loading.value = false;
  }
};
</script>

<template>
  <div class="bg-gray-900 rounded-xl p-6 w-full max-w-md">
    <div class="text-gray-400 font-semibold text-base mb-6">
      {{ t("account.suspend_account.dialog.title_text") }}
    </div>
    <div class="text-gray-400 font-semibold text-base mb-6">
      <p>
        {{ t("account.suspend_account.dialog.content_text_1") }}
        <span class="text-white">
          {{ suspendDate }}
          {{ t("account.suspend_account.dialog.content_text_2") }}
        </span>
      </p>
    </div>
    <div class="flex justify-end space-x-2 mt-6">
      <button
        @click="submitSuspend"
        :disabled="loading"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full text-sm transition-colors duration-200 w-full max-w-[120px] h-10 flex items-center justify-center"
      >
        <span v-if="!loading">
          {{ t("account.suspend_account.dialog.determine_btn_text") }}
        </span>
        <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
      <button
        @click="emit('suspendDialogHide')"
        class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full text-sm shadow-sm transition-colors duration-200 w-full max-w-[120px] h-10"
      >
        {{ t("account.suspend_account.dialog.cancel_btn_text") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* All styles handled by Tailwind classes */
</style>
