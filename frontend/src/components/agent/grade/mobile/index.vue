<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import MReward from "./components/Reward.vue";
import { achievementStore } from "@/store/achievement";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import MAgentRealization from "./components/AgentRealization.vue";

const { t } = useI18n();
const { width } = useDisplay();
const { dispatchAchievementList } = achievementStore();
const { dispatchAchievementConfig } = achievementStore();

const commissionMenuShow = ref<boolean>(false);

window.addEventListener("scroll", function () {
  commissionMenuShow.value = false;
});

const mobileWidth = computed(() => {
  return width.value;
});

// get Token
const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

const achievementItem = computed(() => {
  const { getAchievementItem } = storeToRefs(achievementStore());
  if (getAchievementItem.value.award_explain.length > 0) {
    getAchievementItem.value.rate =
      (getAchievementItem.value.award_progress * 100) /
        Number(
          getAchievementItem.value.award_explain[
            getAchievementItem.value.award_explain.length - 1
          ].num
        ) >=
      99
        ? 99
        : Math.floor(
            (getAchievementItem.value.award_progress * 100) /
              Number(
                getAchievementItem.value.award_explain[
                  getAchievementItem.value.award_explain.length - 1
                ].num
              )
          );
  }
  if (getAchievementItem.value.achievement_explain.length > 0) {
    getAchievementItem.value.achievement_explain.map((item) => {
      item.rate =
        (getAchievementItem.value.achievement_progress * 100) / Number(item.num) >= 97.8
          ? 97.8
          : Math.floor(
              (getAchievementItem.value.achievement_progress * 100) / Number(item.num)
            );
    });
  }
  return getAchievementItem.value;
});

onMounted(async () => {
  if (token.value) {
    await dispatchAchievementList();
  } else {
    await dispatchAchievementConfig();
  }
});
</script>

<template>
  <div class="pb-4">
    <div class="mt-1 flex justify-center mx-16 mb-0">
      <div class="text-800-14 white text-center relative">
        {{ t("affiliate.invite.commission_title_text") }}
        <img
          src="@/assets/public/svg/icon_public_22.svg"
          @click="commissionMenuShow = !commissionMenuShow"
          style="cursor: pointer; position: absolute; top: 2px; right: -21px"
          width="16"
        />
        <div
          v-if="commissionMenuShow"
          class="px-2 absolute"
          :style="{
            backgroundColor: '#1D2027',
            width: mobileWidth > 600 ? '471px' : mobileWidth - 30 + 'px',
            margin: '0px 8px 0px 3px',
          }"
        >
          <div class="pt-4">
            <div class="text-center text-400-12 gray">
              {{ t("affiliate.invite.help_text_2") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-400-12 gray text-center mx-8 mt-4">
      {{ t("affiliate.invite.commission_content_text") }}
    </div>
    <MReward :achievementItem="achievementItem" />
    <MAgentRealization :achievementItem="achievementItem" />
  </div>
</template>

<style lang="scss"></style>
