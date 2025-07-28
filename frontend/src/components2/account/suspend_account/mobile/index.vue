<script lang="ts" setup>
import MSuspendDialog from "@/components/account/suspend_account/dialog/mobile/index.vue";
import { appBarStore } from "@/store/appBar";
import { ref } from "vue";
import { useI_18n } from "vue-i18n";

const { t } = useI_18n();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();

const dialogVisible = ref<boolean>(false);
const suspendDate = ref<number>(1);

const suspendDialogHide = () => {
  dialogVisible.value = false;
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setMainBlurEffectShow(false);
  setOverlayScrimShow(false);
};

const confirmDailogShow = () => {
  dialogVisible.value = true;
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
  setOverlayScrimShow(true);
};
</script>

<template>
  <div class="relative bg-gray-800 rounded-b-xl h-[400px] px-4">
    <div class="pt-4 font-bold text-sm text-white">
      {{ t("account.menu.suspend_account_text") }}
    </div>
    <div class="mt-6 font-normal text-xs text-gray-400">
      {{ t("account.suspend_account.help_text") }}
    </div>

    <div class="mt-10">
      <label class="block text-xs font-normal text-gray-400 mb-1">
        {{ t('account.suspend_account.duration_text') }}
      </label>
      <input
        type="number"
        v-model="suspendDate"
        class="w-full px-4 py-3 bg-gray-900 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
        min="1"
      />
    </div>

    <div class="mx-2 mt-2 text-center font-normal text-xs text-gray-400">
      {{ t("account.suspend_account.minimum_duration_text") }}
    </div>

    <div class="mt-10">
      <button
        @click="confirmDailogShow"
        class="w-full h-[46px] bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-200 text-sm"
      >
        {{ t("account.suspend_account.confirm_text") }}
      </button>
    </div>

    <button class="absolute right-4 bottom-4 p-2">
      <img
        src="@/assets/public/svg/icon_public_75.svg"
        class="w-6 h-6"
      />
    </button>

    <div v-if="dialogVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" @click.self="suspendDialogHide">
      <div class="bg-gray-900 rounded-xl w-full max-w-[326px]">
        <MSuspendDialog :suspendDate="suspendDate" @suspendDialogHide="suspendDialogHide" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* All styles handled by Tailwind classes */
</style>
