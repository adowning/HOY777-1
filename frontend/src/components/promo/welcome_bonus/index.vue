<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="text-xs text-gray-400">
    {{ t("promo.text_33") }}
    <span class="text-xs font-bold text-yellow-400">R$1500</span>
  </div>
  <div class="text-xs text-gray-400 mt-4">
    {{ t("promo.text_16") }}
  </div>
  <div class="text-xs text-gray-400 mt-4">
    {{ t("promo.text_34") }}
  </div>
  <div class="text-xs text-gray-400">
    {{ t("promo.text_35") }}
    <span class="text-xs font-bold text-yellow-400">R$1000</span>
  </div>
  <div class="text-xs text-gray-400 mt-4">
    {{ t("promo.text_19") }}
  </div>
  <div class="text-xs text-gray-400">
    {{ t("promo.text_20") }}
  </div>
  <div class="text-xs text-gray-400">
    {{ t("promo.text_21") }}
  </div>
  <div class="text-xs text-gray-400">
    {{ t("promo.text_22") }}
  </div>
  <div class="text-xs text-gray-400">
    {{ t("promo.text_23") }}
    <span class="text-xs font-bold text-yellow-400">R$50</span>
  </div>
  <div class="text-xs text-gray-400 mt-4">
    {{ t("promo.text_24") }}
  </div>
  <div class="text-xs text-gray-400 mt-4">
    {{ t("promo.text_36") }}
    <span class="text-xs font-bold text-yellow-400">R$1500</span>
    {{ t("promo.text_26") }}
  </div>
  <div class="text-xs text-gray-400 mt-4">
    {{ t("promo.text_37") }}
  </div>
  <div class="text-xs text-gray-400 mt-4">
    {{ t("promo.text_28") }}
    <span class="text-xs font-bold text-yellow-400">R$1500.</span>
  </div>
  <div class="text-xs text-gray-400 mt-4">
    {{ t("promo.text_29") }}
    <span class="text-xs font-bold text-green-400"> {{ t("promo.text_30") }}</span>
    {{ t("promo.text_31") }}
  </div>
</template>
