<script setup lang="ts">
import img_vip_1 from "@/assets/vip/image/img_vip_1.png";
import { appBarStore } from "@/store/appBar";
import { vipStore } from "@/store/vip";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setLevelUpDialogVisible } = vipStore();

const chestList = ref<Array<any>>([img_vip_1, img_vip_1, img_vip_1]);

const closeLevelUpDialog = () => {
  setLevelUpDialogVisible(false);
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setOverlayScrimShow(false);
};

onMounted(() => {});
</script>

<template>
  <div
    class="relative h-[619px] rounded-3xl"
    style="background: linear-gradient(0deg, #2c2744 0%, #693ff6 100%)"
  >
    <button
      class="absolute top-4 right-4"
      @click="closeLevelUpDialog"
    >
      <img
        src="@/assets/public/svg/icon_public_10.svg"
        class="w-6"
      />
    </button>
    <div class="mt-6 text-center text-lg font-extrabold text-white">
      {{ t("level_up.text_1") }}
    </div>
    <div class="mt-3 text-2xl font-extrabold text-yellow-400 text-center">
      {{ t("level_up.text_2") }} 3
    </div>
    <div class="mt-3 text-base text-white text-center">{{ t("level_up.text_3") }}</div>
    <div class="text-sm text-white text-center">{{ t("level_up.text_4") }}</div>
    <div
      class="mt-4 mx-6 h-65 rounded-lg shadow-inner"
      style="background-color: #1d2027"
    >
      <div class="pt-6 text-lg font-extrabold text-white text-center">
        {{ t("level_up.text_5") }}
      </div>
      <div class="flex ma-0 pa-0 mt-15">
        <template v-for="(item, index) in chestList" :key="index">
          <div class="flex-auto text-center">
            <img :src="item" class="w-23" />
          </div>
        </template>
      </div>
    </div>
    <button
      class="mt-10 mx-6 w-full h-15 text-lg font-bold text-black text-center rounded-lg"
      style="background: var(--button-bright-bg)"
    >
      {{ t("level_up.text_6") }}
    </button>
    <div class="flex mt-3 items-center justify-center h-10">
      <div>
        <input
          type="checkbox"
          class="w-4 h-4 rounded-sm"
          style="background-color: #15161c; box-shadow: inset 1px 0px 2px 1px rgba(0, 0, 0, 0.11);"
        />
      </div>
      <div class="text-xs font-semibold text-white mt-1">
        {{ t("level_up.text_7") }}
      </div>
    </div>
  </div>
</template>
