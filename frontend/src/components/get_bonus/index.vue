<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { vipStore } from "@/store/vip";
import { storeToRefs } from "pinia";

const { t } = useI18n();
</script>

<template>
  <div
    class="relative w-70 h-45 rounded-2xl"
    style="background-color: #29263c"
  >
    <img
      src="@/assets/public/image/img_ep_3.png"
      class="w-34 absolute -top-14 left-1/2 -translate-x-1/2 z-[-1]"
    />
    <div
      class="flex items-center justify-center w-full h-10 rounded-lg"
      style="background: linear-gradient(0deg, #4522c1 0%, #6c43f7 100%)"
    >
      <p
        class="text-base font-extrabold"
        style="
          background: linear-gradient(
            90deg,
            #ffc000 0%,
            rgba(249, 130, 1, 0.72) 51.04%,
            #ffc000 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        "
      >
        {{ t("confirm.text_1") }}
      </p>
    </div>
    <p class="text-2xl font-black text-white text-center mt-5">R$ 2</p>
    <div class="mt-5 mx-4">
      <button
        class="w-full h-12 text-sm font-bold text-black text-center rounded-lg"
        style="
          background: var(--button-bright-bg);
        "
      >
        confirm
      </button>
    </div>
  </div>
</template>
