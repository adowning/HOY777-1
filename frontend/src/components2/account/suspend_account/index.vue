<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import SuspendDialog from "./dialog/index.vue";

const { t } = useI18n();

const dialogVisible = ref<boolean>(false);
const suspendDate = ref<number>(1);

const suspendDialogHide = () => {
    dialogVisible.value = false;
}

const confirmDailogShow = () => {
    dialogVisible.value = true;
}
</script>

<template>
    <div class="py-10 relative bg-gray-800 rounded-b-xl h-[600px]">
        <!-- Arrow indicator -->
        <div class="absolute left-[-10px] top-[262px] w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-gray-800"></div>

        <div class="mx-6 mt-5 font-bold text-xl text-white">
            {{ t('account.menu.suspend_account_text') }}
        </div>
        <div class="mx-6 mt-5 font-normal text-sm text-gray-400">
            {{ t('account.suspend_account.help_text') }}
        </div>

        <div class="mx-6 mt-10 grid grid-cols-12">
            <div class="col-span-2"></div>
            <div class="col-span-8">
                <label class="block text-sm font-medium text-gray-400 mb-1">
                    {{ t('account.suspend_account.duration_text') }}
                </label>
                <input 
                    type="number" 
                    v-model="suspendDate"
                    class="w-full px-4 py-3 bg-gray-900 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                />
            </div>
            <div class="col-span-2"></div>
        </div>

        <div class="mx-6 mt-2 text-center font-normal text-sm text-gray-400">
            {{ t('account.suspend_account.minimum_duration_text') }}
        </div>

        <div class="mx-6 mt-10 grid grid-cols-12">
            <div class="col-span-2"></div>
            <div class="col-span-8">
                <button 
                    @click="confirmDailogShow"
                    class="w-full h-[60px] mx-10 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                    {{ t('account.suspend_account.confirm_text') }}
                </button>
            </div>
            <div class="col-span-2"></div>
        </div>

        <SuspendDialog 
            v-if="dialogVisible"
            :suspendDate="suspendDate" 
            @suspendDialogHide="suspendDialogHide"
            class="top-5"
        />
    </div>
</template>

<style scoped>
/* No additional styles needed - all handled by Tailwind classes */
</style>
