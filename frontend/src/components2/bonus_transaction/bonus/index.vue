<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { userStore } from "@/store/user";
import { authStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { type GetBonusData } from "@/interface/bonus";
import { bonusStore } from "@/store/bonus";
import moment from "moment-timezone";

const { t } = useI18n()
const { width } = useDisplay();
const { dispatchUserBonus } = bonusStore();

const mobileWidth = computed(() => {
  return width.value
})

const userBalance = computed(() => {
  const { getUserBalance } = storeToRefs(userStore());
  return getUserBalance.value
})

const userInfo = computed(() => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value
})

const userBonusList = computed(() => {
  const { getBonusList } = storeToRefs(bonusStore());
  if (getBonusList.value.list != undefined) {
    getBonusList.value.list.map(item => {
      item.rate = Math.ceil(item.now / item.max);
    })
  }
  return getBonusList.value
})

const totalAmount = ref<string>("R$ 1500.56");
const withdrawAmount = ref<string>("R$ 855.79");

const bonusList = ref<Array<GetBonusData>>([
  {
    type: "Completion",
    rate: 100,
    currentCash: "R$ 90000.00",
    totalCash: "R$ 90000.00",
    restCash: "RRL 3000",
    bonusCash: "R$ 6000",
    expireDate: "2023/2/20"
  },
  {
    type: "Underway",
    rate: 50,
    currentCash: "R$ 90000.00",
    totalCash: "R$ 90000.00",
    restCash: "RRL 3000",
    bonusCash: "R$ 6000",
    expireDate: "2023/2/20"
  },
  {
    type: "Failure",
    rate: 0,
    currentCash: "R$ 0.00",
    totalCash: "R$ 67500.00",
    restCash: "RRL 3000",
    bonusCash: "R$ 0",
    expireDate: "2023/2/20"
  },
  {
    type: "Failure",
    rate: 50,
    currentCash: "R$ 36000.00",
    totalCash: "R$ 67500.00",
    restCash: "RRL 3000",
    bonusCash: "R$ 0",
    expireDate: "2023/2/20"
  },
]);

const formsList = ref<Array<any>>([
  {
    date: "2023/01/20",
    deposit: 3000,
    receive: 6000,
    wager: 90000
  },
])

onMounted(async () => {
  await dispatchUserBonus();
})
</script>
<template>
  <div class="flex flex-wrap -mx-2 mt-6 mx-2 text-600-16 text-gray text-center">
    <div class="w-full px-2">
      {{ t("bonus.title_text") }}
    </div>
  </div>
  <div class="flex flex-wrap -mx-2 mx-4">
    <div class="w-full px-2 md:w-4/12 md:ml-4/12 lg:w-4/12 lg:ml-4/12">
      <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer bg-color-1">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_26.svg" width="32" />
        </template>
        <v-list-item-title class="ml-4">
          <div class="text-400-12 text-gray">{{ t("bonus.total_text") }}</div>
          <div class="text-600-14 white">R$ {{ userBalance.amount }}</div>
        </v-list-item-title>
        <!-- <template v-slot:append>
          <img src="@/assets/public/svg/btn_public_02.svg" />
        </template> -->
      </li>
      <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer bg-color-1 mt-4">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_27.svg" width="32" />
        </template>
        <v-list-item-title class="ml-4">
          <div class="text-400-12 text-gray">{{ t("bonus.bonus_money_text") }}</div>
          <div class="text-600-14 white">R$ {{ userBalance.availabe_balance }}</div>
        </v-list-item-title>
      </li>
      <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer bg-color-1 mt-4">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_100.svg" width="32" />
        </template>
        <v-list-item-title class="ml-4">
          <div class="text-400-12 text-gray">{{ t("bonus.withdraw_text") }}</div>
          <div class="text-600-14 white">R$ {{ userBalance.availabe_balance }}</div>
        </v-list-item-title>
      </li>
    </div>
    <div class="w-full px-2 md:w-8/12 md:ml-8/12 lg:w-8/12 lg:ml-8/12">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden bonus-card-body pa-4" theme="dark" color="#15161C">
        <v-expansion-panels>
          <v-expansion-panel
            class="bg-color-211F31 mt-2"
            v-for="(item, index) in bonusList"
            :key="index"
          >
            <v-expansion-panel-title
              :class="[item.type == 'Failure' ? 'failure-title' : 'completion-title']"
            >
              <template v-slot:default="{ expanded }">
                <div class="flex flex-wrap -mx-2 align-center mx-0">
                  <div class="w-full px-2 [item.type == 'Failure' ? 'black' : ''] w-2/12">{{ item.restCash }}</v-col
                  >
                  <div class="w-full px-2 [item.type == 'Failure' ? 'color-FF6200' : ''] w-2/12">{{ item.type }}</v-col
                  >
                  <div class="w-full px-2 text-center w-5/12">
                    <div
                      class="text-400-14"
                      v-if="item.type != 'Underway'"
                      :class="[item.type == 'Failure' ? 'black' : '']"
                    >
                      Complete the task and get
                      <Font
                        :class="[
                          item.type == 'Failure' ? 'bonus-cash-failure' : 'bonus-cash',
                        ]"
                        >{{ item.bonusCash }}</Font
                      >
                      bonus
                    </div>
                    <div :class="[item.type != 'Underway' ? 'mt-2' : '']">
                      <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden [
 item.type == 'Failure'
 ? 'failure-progress'
 : 'completion-progress',
 ]" v-model="item.rate" height="21">
                        <div
                          class="text-500-12"
                          :class="[item.type == 'Failure' ? 'gray' : '']"
                        >
                          {{ item.currentCash }} / {{ item.totalCash }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="w-full px-2 text-center w-2/12" v-if="item.type != 'Underway'">
                    <div
                      class="text-400-12"
                      :class="[item.type == 'Failure' ? 'black' : '']"
                    >
                      Expire on
                    </div>
                    <div
                      class="text-600-14 mt-2"
                      :class="[item.type == 'Failure' ? 'black' : '']"
                    >
                      {{ item.expireDate }}
                    </div>
                  </div>
                  <div class="w-full px-2 text-center w-2/12" v-else>
                    <div class="text-400-12">No time limit</div>
                  </div>
                  <div class="w-full px-2 w-1/12">
                    <!-- <img src="@/assets/bonus/img/img_so_03.png" v-if="item.type == 'Completion'" />
                                        <img src="@/assets/bonus/img/img_so_07.png" v-else-if="item.type == 'Failure'" /> -->
                  </div>
                </div>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="flex flex-wrap -mx-2 ma-1">
                <div class="w-full px-2 text-right w-6/12">
                  {{ t("bonus.super_bonus_text") }}
                </div>
                <div class="w-full px-2 text-right w-6/12">
                  <img src="@/assets/public/svg/icon_public_22.svg" />
                </div>
              </div>
              <v-table class="forms-bonus-table-bg text-500-14">
                <thead>
                  <tr>
                    <th>
                      {{ t("bonus.table.date") }}
                    </th>
                    <th>
                      {{ t("bonus.table.deposit") }}
                    </th>
                    <th>
                      {{ t("bonus.table.receive") }}
                    </th>
                    <th>
                      {{ t("bonus.table.wager") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in formsList" :key="index">
                    <td>{{ item.date }}</td>
                    <td>{{ item.deposit }}</td>
                    <td>{{ item.receive }}</td>
                    <td>{{ item.wager }}</td>
                  </tr>
                </tbody>
              </v-table>
              <div class="flex flex-wrap -mx-2 ma-1">
                <div class="w-full px-2 text-left text-500-14 w-6/12"> ID: Qsd58844221122 </div>
                <div class="w-full px-2 justify-end d-flex text-500-14 w-6/12">
                  {{ t("bonus.table.deposit") }} $3000,
                  {{ t("bonus.table.receive") }} $6000
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.bonus-card-body {
  height: 700px;
  overflow-y: auto;
}

.forms-bonus-table-bg {
  background: #15161C !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
}

.v-expansion-panel-title:active:enabled {
  transform: none !important;
  filter: none !important;
}

.v-expansion-panel-title {
  border-radius: 8px !important;
  padding: 14px 8px !important;
  height: 72px !important;
}

.completion-title {
  background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%) !important;
}

.failure-title {
  background: linear-gradient(90deg, #221f32 0%, #424567 100%) !important;
}

.v-expansion-panel:not(:first-child)::after {
  content: none !important;
}

.v-progress-linear {
  background: #1D2027 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 20px !important;
}

.v-progress-linear__background {
  background: transparent !important;
}

.completion-progress {
  .v-progress-linear__determinate {
    background: linear-gradient(180deg, #6d44f8 0%, #5726fc 100%) !important;
    border-radius: 20px !important;
  }
}

.failure-progress {
  .v-progress-linear__determinate {
    background: linear-gradient(0deg, #15161C 0%, #393a71 100%);
    border-radius: 20px;
  }
}

.v-expansion-panel {
  border-radius: 8px !important;
}

.bonus-cash {
  color: #f9bc01;
  font-weight: 700;
}

.bonus-cash-failure {
  color: #000000;
  font-weight: 700;
}

.v-expansion-panel-text__wrapper {
  padding: 8px 8px 16px !important;
}
</style>
