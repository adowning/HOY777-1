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

        {{ t("affiliate.statistics.text_6") }}
        <br />
        {{ t("affiliate.statistics.text_5") }}
      </div>

        {{ t("affiliate.statistics.text_8") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>

        {{ t("affiliate.statistics.text_6") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>

        {{ t("affiliate.statistics.text_9") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>

        {{ t("affiliate.statistics.text_8") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>

        {{ t("affiliate.statistics.text_10") }}
        <br />
        {{ t("affiliate.statistics.text_11") }}
      </div>

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
<

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
