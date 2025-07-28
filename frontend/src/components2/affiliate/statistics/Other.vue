<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { width } = useDisplay();

const profitTab = ref("today");

const mobileWidth = computed(() => {
  return width.value;
});
</script>
<template>
  <div class="flex flex-wrap -mx-2 mt-6 statistics-profit-text">
    {{ t("affiliate.statistics.total_profit_text") }}
  </div>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden statistics-profit-card-body">
    <div class="flex flex-wrap -mx-2 justify-center">
      <div class="w-full px-2 text-center md:w-4/12 md:ml-4/12 lg:w-4/12 lg:ml-4/12">
        <div v-if="mobileWidth > 960">
          <img
            src="@/assets/public/image/img_public_15.png"
            :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
          />
          <p class="statistics-profit-cash-text">R$ 19,34</p>
          <p
            class="statistics-profit-text pa-0"
            :class="[mobileWidth < 960 ? 'my-2' : 'my-4']"
          >
            {{ t("affiliate.statistics.total_profit_text") }}
          </p>
        </div>
        <div v-else>
          <div class="flex flex-wrap -mx-2 justify-center align-center">
            <div class="w-full px-2 w-6/12">
              <p class="statistics-profit-cash-text">R$ 19,34</p>
              <p
                class="statistics-profit-text pa-0"
                :class="[mobileWidth < 960 ? 'my-2' : 'my-8']"
              >
                {{ t("affiliate.statistics.total_profit_text") }}
              </p>
            </div>
            <div class="w-full px-2 w-6/12">
              <img
                src="@/assets/public/image/img_public_15.png"
                :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-2 text-center md:w-8/12 md:ml-8/12 lg:w-8/12 lg:ml-8/12">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden ma-4" theme="dark" color="#15161C">
          <div class="flex flex-wrap -mx-2 [mobileWidth < 1280 ? 'py-4' : 'py-8']">
            <div class="w-full px-2 w-6/12 lg:w-3/12 lg:ml-3/12">
              <p class="statistics-profit-cash-text-1">R$ 25.916</p>
              <p class="statistics-text-700 mt-4">
                {{ t("affiliate.invite.invitation_bonus") }}
              </p>
            </div>
            <div class="w-full px-2 w-6/12 lg:w-3/12 lg:ml-3/12">
              <p class="statistics-profit-cash-text-1">R$ 40.533,73</p>
              <p class="statistics-text-700 mt-4">
                {{ t("affiliate.invite.betting_commision") }}
              </p>
            </div>
            <div class="w-full px-2 w-6/12 lg:w-3/12 lg:ml-3/12">
              <p class="statistics-profit-cash-text-1">R$ 3.225</p>
              <p class="statistics-text-700 mt-4">
                {{ t("affiliate.invite.achivement_bonus") }}
              </p>
            </div>
            <div class="w-full px-2 w-6/12 lg:w-3/12 lg:ml-3/12">
              <p class="statistics-profit-cash-text-1">3972</p>
              <p class="statistics-text-700 mt-4">
                {{ t("affiliate.invite.deposit_user") }}
              </p>
            </div>
          </div>
        </div>
        <div class="px-10 mb-4">
          <p class="statistics-text_1 mt-6">{{ t("affiliate.statistics.text_1") }}</p>
          <p class="statistics-text_1 mt-6">{{ t("affiliate.statistics.text_2") }}</p>
          <p class="statistics-text_1 mt-6">{{ t("affiliate.statistics.text_3") }}</p>
        </div>
      </div>
    </div>
  </div>
  <v-tabs v-model="profitTab" bg-color="#1D2027" class="mt-12 mx-12">
    <v-tab
      value="today"
      :class="[profitTab == 'today' ? 'statistics-tab-active' : 'statistics-tab']"
      >{{ t("affiliate.statistics.tab.text_1") }}</v-tab
    >
    <v-tab
      value="week"
      :class="[profitTab == 'week' ? 'statistics-tab-active' : 'statistics-tab']"
      >{{ t("affiliate.statistics.tab.text_2") }}</v-tab
    >
    <v-tab
      value="month"
      :class="[profitTab == 'month' ? 'statistics-tab-active' : 'statistics-tab']"
      >{{ t("affiliate.statistics.tab.text_3") }}</v-tab
    >
  </v-tabs>
  <v-window v-model="profitTab">
    <v-window-item value="today">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden statistics-profit-card-today">
        <div class="flex flex-wrap -mx-2 justify-center">
          <div class="w-full px-2 text-center md:w-4/12 md:ml-4/12 lg:w-4/12 lg:ml-4/12">
            <div v-if="mobileWidth > 960">
              <img
                src="@/assets/public/image/img_public_16.png"
                :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
              />
              <p class="statistics-profit-cash-text">R$ 19,34</p>
              <p
                class="statistics-profit-text pa-0"
                :class="[mobileWidth < 960 ? 'my-2' : 'my-4']"
              >
                {{ t("affiliate.statistics.tab.today.profit_today_text") }}
              </p>
            </div>
            <div v-else>
              <div class="flex flex-wrap -mx-2 justify-center align-center">
                <div class="w-full px-2 w-6/12">
                  <p class="statistics-profit-cash-text">R$ 19,34</p>
                  <p
                    class="statistics-profit-text pa-0"
                    :class="[mobileWidth < 960 ? 'my-2' : 'my-8']"
                  >
                    {{ t("affiliate.statistics.tab.today.profit_today_text") }}
                  </p>
                </div>
                <div class="w-full px-2 w-6/12">
                  <img
                    src="@/assets/public/image/img_public_16.png"
                    :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-2 text-center md:w-8/12 md:ml-8/12 lg:w-8/12 lg:ml-8/12">
            <div class="bg-white shadow-lg rounded-lg overflow-hidden ma-4" theme="dark" color="#15161C">
              <div class="flex flex-wrap -mx-2 [mobileWidth < 1280 ? 'py-4' : 'py-8']">
                <div class="w-full px-2 w-6/12">
                  <p class="statistics-profit-cash-text-1">R$ 19,34</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.betting_commision") }}
                  </p>
                </div>
                <div class="w-full px-2 w-6/12">
                  <p class="statistics-profit-cash-text-1">R$ 0</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.invitation_bonus") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="px-10 mb-4">
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_1") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_2") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_3") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_4") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_5")
                }}<Font color="#F9BC01">$12</Font>
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-window-item>
    <v-window-item value="week">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden statistics-profit-card-week">
        <div class="flex flex-wrap -mx-2 justify-center">
          <div class="w-full px-2 text-center md:w-4/12 md:ml-4/12 lg:w-4/12 lg:ml-4/12">
            <div v-if="mobileWidth > 960">
              <img
                src="@/assets/public/image/img_public_16.png"
                :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
              />
              <p class="statistics-profit-cash-text">R$ 19,34</p>
              <p
                class="statistics-profit-text pa-0"
                :class="[mobileWidth < 960 ? 'my-2' : 'my-4']"
              >
                {{ t("affiliate.statistics.tab.week.profit_this_week_text") }}
              </p>
            </div>
            <div v-else>
              <div class="flex flex-wrap -mx-2 justify-center align-center">
                <div class="w-full px-2 w-6/12">
                  <p class="statistics-profit-cash-text">R$ 19,34</p>
                  <p
                    class="statistics-profit-text pa-0"
                    :class="[mobileWidth < 960 ? 'my-2' : 'my-8']"
                  >
                    {{ t("affiliate.statistics.tab.week.profit_this_week_text") }}
                  </p>
                </div>
                <div class="w-full px-2 w-6/12">
                  <img
                    src="@/assets/public/image/img_public_16.png"
                    :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-2 text-center md:w-8/12 md:ml-8/12 lg:w-8/12 lg:ml-8/12">
            <div class="bg-white shadow-lg rounded-lg overflow-hidden ma-4" theme="dark" color="#15161C">
              <div class="flex flex-wrap -mx-2 [mobileWidth < 1280 ? 'py-4' : 'py-8']">
                <div class="w-full px-2 w-6/12">
                  <p class="statistics-profit-cash-text-1">R$ 19,34</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.betting_commision") }}
                  </p>
                </div>
                <div class="w-full px-2 w-6/12">
                  <p class="statistics-profit-cash-text-1">R$ 0</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.invitation_bonus") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="px-10 mb-4">
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_1") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_2") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_3") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_4") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_5") }}
                <Font color="#F9BC01">$12</Font>
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-window-item>
    <v-window-item value="month">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden statistics-profit-card-month">
        <div class="flex flex-wrap -mx-2 justify-center">
          <div class="w-full px-2 text-center md:w-4/12 md:ml-4/12 lg:w-4/12 lg:ml-4/12">
            <div v-if="mobileWidth > 960">
              <img
                src="@/assets/public/image/img_public_16.png"
                :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
              />
              <p class="statistics-profit-cash-text">R$ 19,34</p>
              <p
                class="statistics-profit-text pa-0"
                :class="[mobileWidth < 960 ? 'my-2' : 'my-4']"
              >
                {{ t("affiliate.statistics.tab.month.profit_this_month_text") }}
              </p>
            </div>
            <div v-else>
              <div class="flex flex-wrap -mx-2 justify-center align-center">
                <div class="w-full px-2 w-6/12">
                  <p class="statistics-profit-cash-text">R$ 19,34</p>
                  <p
                    class="statistics-profit-text pa-0"
                    :class="[mobileWidth < 960 ? 'my-2' : 'my-8']"
                  >
                    {{ t("affiliate.statistics.tab.month.profit_this_month_text") }}
                  </p>
                </div>
                <div class="w-full px-2 w-6/12">
                  <img
                    src="@/assets/public/image/img_public_16.png"
                    :class="[mobileWidth < 960 ? 'pa-4' : 'pa-10']"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-2 text-center md:w-8/12 md:ml-8/12 lg:w-8/12 lg:ml-8/12">
            <div class="bg-white shadow-lg rounded-lg overflow-hidden ma-4" theme="dark" color="#15161C">
              <div class="flex flex-wrap -mx-2 [mobileWidth < 1280 ? 'py-4' : 'py-8']">
                <div class="w-full px-2 w-6/12">
                  <p class="statistics-profit-cash-text-1">R$ 19,34</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.betting_commision") }}
                  </p>
                </div>
                <div class="w-full px-2 w-6/12">
                  <p class="statistics-profit-cash-text-1">R$ 0</p>
                  <p class="statistics-text-700 mt-4">
                    {{ t("affiliate.invite.invitation_bonus") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="px-10 mb-4">
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_1") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_2") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_3") }}
              </p>
              <p class="statistics-text_1 mt-6">
                {{ t("affiliate.statistics.tab.profit_tab_text_4") }}
              </p>
              <p class="statistics-text_1">
                {{ t("affiliate.statistics.tab.profit_tab_text_5")
                }}<Font color="#F9BC01">$12</Font>
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-window-item>
  </v-window>
</template>
<style lang="scss">
.statistics-text_1 {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  text-align: justify;
}

.statistics-profit-text {
  padding: 0px 86px;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
}

.statistics-profit-card-body {
  margin: 24px 16px 0px 16px;
  background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%) !important;
  border-radius: 8px !important;
}

.statistics-profit-cash-text {
  font-weight: 800;
  font-size: 36px;
  color: #f9bc01;
}

.statistics-profit-cash-text-1 {
  font-weight: 800;
  font-size: 26px;
  color: #f9bc01;
}

.statistics-text-700 {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
}

.statistics-tab-active {
  background: #009B3A !important;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
  border-radius: 8px 8px 0px 0px !important;
  font-weight: 700;
  font-size: 18px;
}

.statistics-tab {
  background: #1D2027 !important;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
  border-radius: 8px 8px 0px 0px !important;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
}

.statistics-profit-card-today {
  margin: 0px 16px;
  background: linear-gradient(90deg, #2e68af 0%, #21a68b 100%);
  border-radius: 8px;
}

.statistics-profit-card-week {
  margin: 0px 16px;
  background: linear-gradient(90deg, #3b26a6 0%, #6c2fe6 100%);
  border-radius: 8px;
}

.statistics-profit-card-month {
  margin: 0px 16px;
  background: linear-gradient(90deg, #de8245 0%, #d84594 100%);
  border-radius: 8px;
}
</style>
