<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="m-about-main-body mx-3 px-6 py-5">
    <div class="text-700-14 white">
      {{ t("about.payment_methods.text_1") }}
    </div>
    <div class="text-400-10 gray mt-2">
      {{ t("about.payment_methods.text_2") }}
    </div>
    <div class="text-500-10 white mt-4">
      {{ t("about.payment_methods.text_3") }}
    </div>
    <div class="text-500-10 white">
      {{ t("about.payment_methods.text_4") }}
    </div>
    <div class="text-700-12 white mt-4">
      {{ t("about.payment_methods.text_5") }}
    </div>
    <div class="mx-0 mt-3 justify-center items-center" style="background: #1D2027">
      <div class="text-400-8 gray text-center py-1">
        {{ t("about.payment_methods.text_6") }}
      </div>
      <div class="text-400-8 gray text-center py-1">
        {{ t("about.payment_methods.text_7") }}
      </div>
      <div class="text-400-8 gray text-center py-1">
        {{ t("about.payment_methods.text_8") }}
      </div>
      <div class="text-400-8 gray text-center py-1">
        <div>{{ t("about.payment_methods.text_9") }}</div>
        <div>{{ t("about.payment_methods.text_10") }}</div>
      </div>
    </div>
    <div
      class="mx-0 mb-0 justify-center items-center"
      style="background: #1D2027; border-top: 2px solid #15161C"
    >
      <div class="text-400-8 gray text-center py-2">
        <img src="@/assets/about_us/images/image_1759.png" width="78" />
      </div>
      <div
        class="text-400-8 gray py-2 flex items-center justify-center"
        style="
          height: 160.38px;
          border-right: 2px solid #15161C;
          border-left: 2px solid #15161C;
        "
      >
        {{ t("about.payment_methods.text_11") }}
      </div>
      <div
        class="text-400-8 gray py-2 flex items-center justify-center"
        style="height: 160.38px; border-right: 2px solid #15161C"
      >
        {{ t("about.payment_methods.text_12") }}
      </div>
      <div class="text-400-8 gray text-center py-2">
        <div>
          {{ t("about.payment_methods.text_13") }} R$20 /
          {{ t("about.payment_methods.text_14") }} R$49999
        </div>
      </div>
    </div>
    <div class="text-700-12 white mt-4">
      {{ t("about.payment_methods.text_15") }}
    </div>
    <div class="mx-0 mt-3 justify-center items-center" style="background: #1D2027">
      <div class="text-400-8 gray text-center py-1">
        {{ t("about.payment_methods.text_6") }}
      </div>
      <div class="text-400-8 gray text-center py-1">
        {{ t("about.payment_methods.text_7") }}
      </div>
      <div class="text-400-8 gray text-center py-1">
        {{ t("about.payment_methods.text_8") }}
      </div>
      <div class="text-400-8 gray text-center py-1">
        <div>{{ t("about.payment_methods.text_9") }}</div>
        <div>{{ t("about.payment_methods.text_10") }}</div>
      </div>
    </div>
    <div
      class="mx-0 mb-0 justify-center items-center"
      style="background: #1D2027; border-top: 2px solid #15161C"
    >
      <div class="text-400-8 gray text-center py-2">
        <img src="@/assets/about_us/images/image_1760.png" width="78" />
      </div>
      <div
        class="text-400-8 gray py-2 flex items-center justify-center"
        style="
          height: 160.38px;
          border-right: 2px solid #15161C;
          border-left: 2px solid #15161C;
        "
      >
        {{ t("about.payment_methods.text_11") }}
      </div>
      <div
        class="text-400-8 gray py-2 flex items-center justify-center"
        style="height: 160.38px; border-right: 2px solid #15161C"
      >
        {{ t("about.payment_methods.text_12") }}
      </div>
      <div class="text-400-8 gray text-center py-2">
        <div>
          {{ t("about.payment_methods.text_13") }} R$20 /
          {{ t("about.payment_methods.text_14") }} R$49999
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
