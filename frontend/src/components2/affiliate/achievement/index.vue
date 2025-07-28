<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import Reward from "./components/Reward.vue";
import AgentRealization from "./components/AgentRealization.vue";

const { t } = useI18n();
const { width } = useDisplay();

const commissionMenuShow = ref<boolean>(false);

window.addEventListener("scroll", function () {
  commissionMenuShow.value = false;
});

const mobileWidth = computed(() => {
  return width.value;
});
</script>

<template>
  <div class="pb-4">
    <div class="mt-6 justify-start mx-12">
      <div class="text-700-16 white text-center relative">
        {{ t("affiliate.achievement.text_4") }}
        <div>
          <img
            src="@/assets/public/svg/icon_public_22.svg"
            @click="commissionMenuShow = !commissionMenuShow"
            style="cursor: pointer; position: absolute; top: 2px; right: -21px"
            width="16"
          />
          <ul
            v-if="commissionMenuShow"
            theme="dark"
            bg-color="#1D2027"
            class="px-2"
            :width="mobileWidth > 600 ? 471 : mobileWidth - 30"
            style="margin: 0px 8px 0px 3px"
          >
            <li class="pt-4">
              <div class="text-center text-400-12 gray">
                {{ t("affiliate.invite.help_text_2") }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt-4 justify-start mb-0 mx-12">
      <div class="text-400-16 gray text-left" style="width: 511px">
        {{ t("affiliate.achievement.text_5") }}
      </div>
    </div>
    <Reward />
    <AgentRealization />
  </div>
</template>

<style lang="scss"></style>