<script lang="ts" setup>
import { ref } from "vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { appBarStore } from "@/store/appBar";
import { refferalStore } from "@/store/refferal";
import { storeToRefs } from "pinia";

const { t } = useI18n();
const { width } = useDisplay();
const { setRefferalAppBarShow } = refferalStore();
const { setRefferalDialogShow } = refferalStore();
const { setOverlayScrimShow } = appBarStore();

const invertedScroll = ref<boolean>(true);
const elevateOnScroll = ref<boolean>(true);

const mobileWidth = ref(window.innerWidth);
const width = computed(() => mobileWidth.value);

window.addEventListener('resize', () => {
  mobileWidth.value = window.innerWidth;
});

const headerBlurEffectShow = computed(() => {
  const { getHeaderBlurEffectShow } = storeToRefs(appBarStore());
  return getHeaderBlurEffectShow.value;
});

const openRefferalDialogShow = () => {
  setOverlayScrimShow(false);
  setRefferalDialogShow(true);
};
</script>

<template>
  <div
    class="refferal-app-bar-background justify-center"
    :class="headerBlurEffectShow ? 'header-bg-blur' : ''"
  >
    <div class="d-flex align-center justify-center">
      <p class="white" :class="mobileWidth < 600 ? 'text-500-10' : 'text-700-16'">
        {{ t("refferal.app_bar_title") }}
      </p>
      <img
        src="@/assets/public/image/img_public_09.png"
        class="ml-3"
        :width="mobileWidth > 600 ? 50 : 33"
      />
      <button
        :height="mobileWidth < 600 ? '24px' : '28px'"
        class="text-none ml-3 earn-btn-bg"
        @click="openRefferalDialogShow"
      >
        {{ t("refferal.earn_btn_text") }}
      </button>
    </div>
    <button
      icon
      :height="mobileWidth < 600 ? '20px' : '28px'"
      :width="mobileWidth < 600 ? '20px' : '28px'"
    >
      <img src="@/assets/public/svg/icon_public_close.svg" @click="setRefferalAppBarShow(false)" />
    </button>
  </div>
</template>

<style lang="scss">
.refferal-app-bar-background {
  background: linear-gradient(90deg, #3F86DA 0%, #33D785 47.8%, #FFEA2F 100%) !important;

  .toolbar__content {
    height: 48px;
  }

  @media (max-width: 600px) {
    .toolbar__content {
      height: 32px !important;
    }
  }

  .toolbar-title__placeholder {
    display: flex !important;
    align-items: center;
  }

  .earn-btn-bg {
    background: #1D2027 !important;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
  }
}

.header-bg-blur {
  filter: blur(3px);
  -webkit-filter: blur(3px);
  // filter: saturate(180%) blur(3px);
  // -webkit-filter: saturate(180%) blur(3px);
}
</style>
