<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { inviteStore } from "@/store/invite";
import { storeToRefs } from "pinia";
import { type StatisticsItem } from "@/interface/invite";

const { t } = useI18n();
const { width } = useDisplay();

const { dispatchStatisticsList } = inviteStore();
const { dispatchInviteAward } = inviteStore();

const summaryTabText = ref<string>("today");

const selectedItem = ref<StatisticsItem>({
  register_user: [],
  deposit_user: [],
  deposit_bonus: 0,
  deposit_amount: [],
  bet_amount: [],
  bet_bonus: [],
  achievement_award: 0,
});

const mobileWidth = computed(() => {
  return width.value;
});

const handleSummaryTab = (tabText: string) => {
  summaryTabText.value = tabText;
  switch (tabText) {
    case "today":
      selectedItem.value = statisticsItem.value.today_profit;
      break;
    case "week":
      selectedItem.value = statisticsItem.value.week_profit;
      break;
    case "month":
      selectedItem.value = statisticsItem.value.month_profit;
      break;
  }
};

const statisticsItem = computed(() => {
  const { getStatisticsItem } = storeToRefs(inviteStore());
  return getStatisticsItem.value;
});

onMounted(async () => {
  await dispatchStatisticsList();
  selectedItem.value = statisticsItem.value.today_profit;
  console.log(selectedItem.value);
});
</script>
<template>
  <div
    class="mx-2 rounded-lg shadow-md overflow-x-auto"
    style="background: var(--agent-card-notmet-bg)"
  >
    <div class="m-4 text-sm font-extrabold text-white">
      {{ t("affiliate.statistics.summary_text") }}
    </div>
    <div
      class="flex items-center w-[600px] h-8 mx-1 my-0 px-6 rounded-lg"
      style="background: var(--agent-card-bg)"
    >
      <div class="w-1/4 p-0 text-xs text-gray-400">
        {{ t("affiliate.statistics.level_text") }}
      </div>
      <div class="w-1/4 p-0 text-xs text-gray-400">
        {{ t("affiliate.statistics.grade_text_1") }}
      </div>
      <div class="w-1/4 p-0 text-xs text-gray-400">
        {{ t("affiliate.statistics.grade_text_2") }}
      </div>
      <div class="w-1/4 p-0 text-xs text-gray-400">
        {{ t("affiliate.statistics.grade_text_3") }}
      </div>
    </div>
    <div
      class="flex items-center w-[600px] h-12 mx-1 my-1 px-6 rounded-lg"
      style="background: var(--agent-card-bg)"
    >
      <div class="w-1/4 p-0 text-xs text-gray-400">
        {{ t("affiliate.statistics.text_4") }}
        <br />
        {{ t("affiliate.statistics.text_5") }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        {{ selectedItem.register_user[0] }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        {{ selectedItem.register_user[1] }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        {{ selectedItem.register_user[2] }}
      </div>
    </div>
    <div
      class="flex items-center w-[600px] h-12 mx-1 my-1 px-6 rounded-lg"
      style="background: var(--agent-card-bg)"
    >
      <div class="w-1/4 p-0 text-xs text-gray-400">
        {{ t("affiliate.statistics.text_6") }}
        <br />
        {{ t("affiliate.statistics.text_5") }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        {{ selectedItem.deposit_user[0] }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        {{ selectedItem.deposit_user[1] }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        {{ selectedItem.deposit_user[2] }}
      </div>
    </div>
    <div
      class="flex items-center w-[600px] h-12 mx-1 my-1 px-6 rounded-lg"
      style="background: var(--agent-color-3)"
    >
      <div class="w-1/4 p-0 text-xs text-gray-400">
        {{ t("affiliate.statistics.text_8") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-yellow-400">
        R$ {{ Number(selectedItem.deposit_bonus).toFixed(2) }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">--</div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">--</div>
    </div>
    <div
      class="flex items-center w-[600px] h-12 mx-1 my-1 px-6 rounded-lg"
      style="background: var(--agent-card-bg)"
    >
      <div class="w-1/4 p-0 text-xs text-gray-400">
        {{ t("affiliate.statistics.text_6") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        R$ {{ selectedItem.deposit_amount[0] }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        R$ {{ selectedItem.deposit_amount[1] }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        R$ {{ selectedItem.deposit_amount[2] }}
      </div>
    </div>
    <div
      class="flex items-center w-[600px] h-12 mx-1 my-1 px-6 rounded-lg"
      style="background: var(--agent-card-bg)"
    >
      <div class="w-1/4 p-0 text-xs text-gray-400">
        {{ t("affiliate.statistics.text_9") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        R$ {{ selectedItem.bet_amount[0] }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        R$ {{ selectedItem.bet_amount[1] }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        R$ {{ selectedItem.bet_amount[2] }}
      </div>
    </div>
    <div
      class="flex items-center w-[600px] h-12 mx-1 my-1 px-6 rounded-lg"
      style="background: var(--agent-color-3)"
    >
      <div class="w-1/4 p-0 text-xs text-gray-400">
        {{ t("affiliate.statistics.text_8") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-yellow-400">
        R$ {{ selectedItem.bet_bonus[0] }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-yellow-400">
        R$ {{ selectedItem.bet_bonus[1] }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-yellow-400">
        R$ {{ selectedItem.bet_bonus[2] }}
      </div>
    </div>
    <div
      class="flex items-center w-[600px] h-12 mx-1 my-1 px-6 rounded-lg"
      style="background: var(--agent-card-bg)"
    >
      <div class="w-1/4 p-0 text-xs text-gray-400">
        {{ t("affiliate.statistics.text_10") }}
        <br />
        {{ t("affiliate.statistics.text_11") }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">
        R$ {{ selectedItem.achievement_award }}
      </div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">--</div>
      <div class="w-1/4 p-0 text-xs font-bold text-gray-400">--</div>
    </div>
  </div>
  <div
    class="flex items-center justify-center h-16 mx-6 my-0 rounded-b-lg"
    style="background: var(--agent-card-notmet-bg)"
  >
    <div
      class="w-1/3 text-center text-sm font-medium h-full"
      :class="
        summaryTabText == 'today'
          ? 'rounded-b-lg text-white shadow-md'
          : 'text-gray-400'
      "
      @click="handleSummaryTab('today')"
      :style="
        summaryTabText == 'today'
          ? 'background: var(--agent-card-bar-bg)'
          : ''
      "
    >
      {{ t("affiliate.statistics.tab.text_1") }}
    </div>
    <div
      class="w-1/3 text-center text-sm font-medium h-full"
      :class="
        summaryTabText == 'week'
          ? 'rounded-b-lg text-white shadow-md'
          : 'text-gray-400'
      "
      @click="handleSummaryTab('week')"
      :style="
        summaryTabText == 'week'
          ? 'background: var(--agent-card-bar-bg)'
          : ''
      "
    >
      {{ t("affiliate.statistics.tab.text_2") }}
    </div>
    <div
      class="w-1/3 text-center text-sm font-medium h-full"
      :class="
        summaryTabText == 'month'
          ? 'rounded-b-lg text-white shadow-md'
          : 'text-gray-400'
      "
      @click="handleSummaryTab('month')"
      :style="
        summaryTabText == 'month'
          ? 'background: var(--agent-card-bar-bg)'
          : ''
      "
    >
      {{ t("affiliate.statistics.tab.text_3") }}
    </div>
  </div>
</template>
<style lang="scss">
.m-agent-profit-summary-card::-webkit-scrollbar-thumb {
  background: var(--agent-card-bg);
  border-radius: 20px;
}

.m-agent-profit-summary-card::-webkit-scrollbar {
  width: 3px;
  height: 6px;
  scroll-padding: 20px;
}
</style>
