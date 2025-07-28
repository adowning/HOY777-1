<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Footer from "./components/mobile/Footer.vue";
import Center from "./components/mobile/Center.vue";

const { t } = useI18n();
</script>

<template>
  <div
    class="mx-2 p-4 rounded-lg"
    style="background: var(--agent-card-notmet-bg)"
  >
    <div class="mt-4 text-center text-sm font-bold text-gray-400">
      {{ t("agent.text_20") }}
    </div>
    <div
      class="rounded-lg mt-4 mx-2"
      style="background: var(--agent-card-bg)"
    >
      <div class="mx-2">
        <img
          src="@/assets/agent/image/img_agent_13.png"
          class="w-full"
        />
      </div>
      <div class="mx-4 mb-2">
        <div class="text-xs text-gray-400">{{ t("agent.text_21") }}</div>
        <div class="text-xs text-gray-400">{{ t("agent.text_22") }}</div>
      </div>
    </div>
    <div
      class="rounded-lg mx-2 mt-2 h-44"
      style="background: var(--agent-card-bg)"
    >
      <div class="flex items-center">
        <div class="w-1/3 text-center">
          <div class="relative">
            <img
              src="@/assets/public/image/ua_public_06.png"
              class="w-15"
            />
            <div
              class="absolute w-4 h-4 rounded-lg bottom-4 right-6"
              style="background: var(--agent-card-price-color)"
            >
              <div
                class="m-1 w-3.5 h-3.5 rounded-lg bg-white"
              >
                <div
                  class="text-xs font-black"
                  style="color: var(--agent-card-bonuses-time-color)"
                >
                  A
                </div>
              </div>
            </div>
          </div>
          <div class="text-xs text-gray-400">{{ t("agent.text_17") }}</div>
          <div class="text-base font-bold text-white">2555</div>
        </div>
        <div class="w-2/3 my-4">
          <div class="text-xs text-gray-400">
            {{ t("agent.text_18") }}B1{{ t("agent.text_19") }}
            <span class="text-xs font-bold text-white">360</span>
          </div>
          <div class="text-xs text-gray-400">
            {{ t("agent.text_18") }}B2{{ t("agent.text_19") }}
            <span class="text-xs font-bold text-white">120</span>
          </div>
          <div class="text-xs text-gray-400">
            {{ t("agent.text_18") }}B3{{ t("agent.text_19") }}
            <span class="text-xs font-bold text-white">60</span>
          </div>
          <div class="text-xs text-gray-400">
            {{ t("agent.text_18") }}C1{{ t("agent.text_19") }}
            <span class="text-xs font-bold text-white">150</span>
          </div>
          <div class="text-xs text-gray-400">
            {{ t("agent.text_18") }}C3{{ t("agent.text_19") }}
            <span class="text-xs font-bold text-white">300</span>
          </div>
          <div class="text-xs text-gray-400">
            {{ t("agent.text_18") }}D1{{ t("agent.text_19") }}
            <span class="text-xs font-bold text-white">50</span>
          </div>
          <div class="text-xs text-gray-400">
            {{ t("agent.text_18") }}D3{{ t("agent.text_19") }}
            <span class="text-xs font-bold text-white">15</span>
          </div>
          <div class="text-xs text-gray-400">
            {{ t("agent.text_18") }}D4{{ t("agent.text_19") }}
            <span class="text-xs font-bold text-white">1500</span>
          </div>
        </div>
      </div>
    </div>
    <Center />
  </div>
  <Footer />
</template>
