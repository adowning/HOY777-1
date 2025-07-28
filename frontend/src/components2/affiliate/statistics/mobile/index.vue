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
})

const mobileWidth = computed(() => {
  return width.value;
});

const handleSummaryTab = (tabText: string) => {
  summaryTabText.value = tabText;
  switch (tabText) {
    case "today":
      selectedItem.value = statisticsItem.value.today_profit
      break;
    case "week":
      selectedItem.value = statisticsItem.value.week_profit
      break;
    case "month":
      selectedItem.value = statisticsItem.value.month_profit
      break;
  }
};

const statisticsItem = computed(() => {
  const { getStatisticsItem } = storeToRefs(inviteStore());
  selectedItem.value = getStatisticsItem.value.today_profit
  return getStatisticsItem.value;
});

const inviteAward = async () => {
  await dispatchInviteAward({});
}

onMounted(async () => {
  await dispatchStatisticsList();
});
</script>
<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden m-statistics-summary-card">
    <div class="ma-4 text-800-14 white">{{ t("affiliate.statistics.summary_text") }}</div>
    <div class="flex flex-wrap -mx-2 mx-1 my-0 px-6 m-statistics-summary-level">
      <div class="w-full px-2 pa-0 text-400-12 gray w-3/12">
        {{ t("affiliate.statistics.level_text") }}
      </div>
      <div class="w-full px-2 pa-0 text-400-12 gray w-3/12">
        {{ t("affiliate.statistics.grade_text_1") }}
      </div>
      <div class="w-full px-2 pa-0 text-400-12 gray w-3/12">
        {{ t("affiliate.statistics.grade_text_2") }}
      </div>
      <div class="w-full px-2 pa-0 text-400-12 gray w-3/12">
        {{ t("affiliate.statistics.grade_text_3") }}
      </div>
    </div>
    <div class="flex flex-wrap -mx-2 mx-1 my-1 px-6 m-statistics-user-card">
      <div class="w-full px-2 pa-0 text-400-12 gray w-3/12">
        {{ t("affiliate.statistics.text_4") }}
        <br />
        {{ t("affiliate.statistics.text_5") }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        {{ selectedItem.register_user[0] }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        {{ selectedItem.register_user[1] }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        {{ selectedItem.register_user[2] }}
      </div>
    </div>
    <div class="flex flex-wrap -mx-2 mx-1 my-1 px-6 m-statistics-user-card">
      <div class="w-full px-2 pa-0 text-400-12 gray w-3/12">
        {{ t("affiliate.statistics.text_6") }}
        <br />
        {{ t("affiliate.statistics.text_5") }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        {{ selectedItem.deposit_user[0] }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        {{ selectedItem.deposit_user[1] }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        {{ selectedItem.deposit_user[2] }}
      </div>
    </div>
    <div class="flex flex-wrap -mx-2 mx-1 my-1 px-6 m-statistics-commission-card">
      <div class="w-full px-2 pa-0 text-400-12 gray w-3/12">
        {{ t("affiliate.statistics.text_8") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 yellow w-3/12">
        R$ {{ Number(selectedItem.deposit_bonus).toFixed(2) }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12"> -- </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12"> -- </div>
    </div>
    <div class="flex flex-wrap -mx-2 mx-1 my-1 px-6 m-statistics-user-card">
      <div class="w-full px-2 pa-0 text-400-12 gray w-3/12">
        {{ t("affiliate.statistics.text_6") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        R$ {{ Number(selectedItem.deposit_amount[0]).toFixed(2) }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        R$ {{ Number(selectedItem.deposit_amount[1]).toFixed(2) }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        R$ {{ Number(selectedItem.deposit_amount[2]).toFixed(2) }}
      </div>
    </div>
    <div class="flex flex-wrap -mx-2 mx-1 my-1 px-6 m-statistics-user-card">
      <div class="w-full px-2 pa-0 text-400-12 gray w-3/12">
        {{ t("affiliate.statistics.text_9") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        R$ {{ Number(selectedItem.bet_amount[0]).toFixed(2) }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        R$ {{ Number(selectedItem.bet_amount[1]).toFixed(2) }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        R$ {{ Number(selectedItem.bet_amount[2]).toFixed(2) }}
      </div>
    </div>
    <div class="flex flex-wrap -mx-2 mx-1 my-1 px-6 m-statistics-commission-card">
      <div class="w-full px-2 pa-0 text-400-12 gray w-3/12">
        {{ t("affiliate.statistics.text_8") }}
        <br />
        {{ t("affiliate.statistics.text_7") }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 yellow w-3/12">
        R$ {{ Number(selectedItem.bet_bonus[0]).toFixed(2) }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 yellow w-3/12">
        R$ {{ Number(selectedItem.bet_bonus[1]).toFixed(2) }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 yellow w-3/12">
        R$ {{ Number(selectedItem.bet_bonus[2]).toFixed(2) }}
      </div>
    </div>
    <div class="flex flex-wrap -mx-2 mx-1 my-1 px-6 m-statistics-commission-card">
      <div class="w-full px-2 pa-0 text-400-12 gray w-3/12">
        {{ t("affiliate.statistics.text_10") }}
        <br />
        {{ t("affiliate.statistics.text_11") }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12">
        R$ {{ Number(selectedItem.achievement_award).toFixed(2) }}
      </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12"> -- </div>
      <div class="w-full px-2 pa-0 text-700-12 gray w-3/12"> -- </div>
    </div>
  </div>
  <div class="flex flex-wrap -mx-2 mx-6 m-statistics-summary-tab my-0">
    <div class="w-full px-2 
 summaryTabText == 'today'
 ? 'm-statistics-summary-tab-active black'
 : 'white text-500-13'
 w-4/12" style="height: 100%" click="handleSummaryTab('today')">
      {{ t("affiliate.statistics.tab.text_1") }}
    </div>
    <div class="w-full px-2 
 summaryTabText == 'week' ? 'm-statistics-summary-tab-active black' : 'white'
 w-4/12" style="height: 100%" click="handleSummaryTab('week')">
      {{ t("affiliate.statistics.tab.text_2") }}
    </div>
    <div class="w-full px-2 
 summaryTabText == 'month' ? 'm-statistics-summary-tab-active black' : 'white'
 w-4/12" style="height: 100%" click="handleSummaryTab('month')">
      {{ t("affiliate.statistics.tab.text_3") }}
    </div>
  </div>
  <div class="flex flex-wrap -mx-2 mx-4 my-7 pa-0 m-statistics-receive-card">
    <div class="w-full px-2 pa-0 text-center w-5/12">
      <img src="@/assets/affiliate/statistics/img_agent_8.png" width="82" />
      <p class="text-800-12 white">{{ t("affiliate.statistics.tab.text_1") }}</p>
    </div>
    <div class="w-full px-2 pa-0 text-center w-7/12">
      <p class="text-800-24 yellow">
        R$ {{ Number(statisticsItem.receive_profit).toFixed(2) }}
      </p>
      <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 text-none mt-1 m-statistics-receive-btn" width="114" height="32" disabled="Number(statisticsItem.receive_profit) == 0" click="inviteAward">
        {{ t("affiliate.achievement.text_3") }}
      </button>
    </div>
  </div>
</template>
<style lang="scss">
.m-statistics-summary-card {
  margin: 16px 16px 0px 16px;
  border-radius: 8px;
  background: #1D2027;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  overflow-x: auto;
}
.m-statistics-summary-level {
  align-items: center;
  width: 600px;
  height: 32px;
  border-radius: 8px;
  background: #1D2027;
}
.m-statistics-user-card {
  align-items: center;
  width: 600px;
  height: 48px;
  border-radius: 8px;
  background: #1D2027;
}
.m-statistics-commission-card {
  align-items: center;
  width: 600px;
  height: 48px;
  border-radius: 8px;
  background: #191725;
}
.m-statistics-summary-tab {
  height: 64px;
  border-radius: 0px 0px 8px 8px;
  background: #1D2027;
  align-items: center;
  justify-content: center;
}
.m-statistics-summary-tab-active {
  border-radius: 0px 0px 8px 8px;
  background: var(--Primary-Button-32CFEC, #009B3A);
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
}
.m-statistics-receive-card {
  height: 101px;
  border-radius: 8px;
  background: linear-gradient(180deg, #2e68af 0%, #21a68b 100%);
  align-items: center;
  justify-content: center;
}
.m-statistics-receive-btn {
  border-radius: 9px;
  background: var(--Secondary-Button-353652, #23262F);
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
  .v-btn__content {
    color: #fff;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
</style>
