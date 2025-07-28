<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { appBarStore } from "@/store/appBar";

const { setMainBlurEffectShow } = appBarStore();
const { t } = useI18n();
const emit = defineEmits<{ (e: 'close'): void }>()

const handleClose = () => {
    emit('close');
}
</script>
<template>
    <div class="m-bonus-dialog-container">
        <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 close-button" icon="true" click="handleClose" width="30" height="30">
            <img src="@/assets/public/svg/icon_public_10.svg"/>
            <!-- <span class="inline-flex items-center justify-center">
                mdi-close
            </span> -->
        </button>
        <div class="flex flex-wrap -mx-2 justify-center mt-5 m-bonus-dialog-header-title">
            {{ t('affiliate.invite.achivement_bonus') }}
        </div>
        <div class="mt-4">
            <img src="@/assets/public/image/bg_public_02_01.png" style="width: 100%;" />
        </div>
        <div class="mt-2 text-center mx-4 m-bonus-dialog-text-1">
            {{ t('affiliate.invite.bonus_dialog.text_1') }}
        </div>
        <div class="flex flex-wrap -mx-2 mt-1">
            <div class="w-full px-2 d-flex justify-center w-6/12">
                <div class="m-bonus-dialog-text-2 text-center">{{ t('affiliate.invite.bonus_dialog.text_2') }}</div>
            </div>
            <div class="w-full px-2 d-flex justify-center w-6/12">
                <div class="m-bonus-dialog-text-2 pt-4 text-center">{{ t('affiliate.invite.bonus_dialog.text_3') }}</div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-1">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #E3E0D9;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">3</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">10</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-4">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #E1DDD5;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">10</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">30</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-4">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #E4DFD2;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">25</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">60</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-4">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #E4DFD2;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">50</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">120</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-4">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #E6E0CF;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">100</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">250</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-4">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #EBE5D2;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">250</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">600</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-4">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #EDE5CD;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">500</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">1200</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-4">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #EFE4C4;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">1000</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">3000</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-4">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #F3E4B7;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">2000</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">6000</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-4">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #F5E2A8;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">5000</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">20000</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-4">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #F4D36D;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">10000</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">40000</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mx-2 justify-center mt-4">
            <div class="m-bonus-dialog-card relative d-flex align-center" style="background: #F9BC01;">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">20000</p>
                    </div>
                    <div class="w-full px-2 text-center w-6/12">
                        <p class="m-bonus-dialog-text-3">80000</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.m-bonus-dialog-container {
    height: 570px;
    background: linear-gradient(360deg, #29263F 0%, #4A32AA 100%) !important;
    border-radius: 16px !important;
    overflow-y: auto;
    overflow-x: hidden;
}

.m-bonus-dialog-container::-webkit-scrollbar {
    width: 0px;
}

// close modal button
.close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 5px;
    right: 5px;
}

.m-bonus-dialog-header-title {
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    color: #F9BC01;
}

.m-bonus-dialog-text-1 {
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    text-align: justify;
    color: #7782AA;
}

.m-bonus-dialog-text-2 {
    width: 115px;
    height: 40px;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    color: #FFFFFF;
}

.m-bonus-dialog-card {
    width: 280px;
    height: 24px;
    background: #E3E0D9;
    border-radius: 16px;
}

.m-bonus-dialog-text-3 {
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: #1D2027;
}
</style>