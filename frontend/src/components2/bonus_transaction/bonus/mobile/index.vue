<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { userStore } from "@/store/user";
import { authStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { type GetBonusData } from "@/interface/bonus";
import { bonusStore } from "@/store/bonus";
import { appBarStore } from "@/store/appBar";
import moment from "moment-timezone";
import MBonusDialog from "@/components/bonus_transaction/bonus/dialog/mobile/index.vue";
import { group } from 'node:console';
import { bannerStore } from '@/store/banner';
import { currencyStore } from '@/store/currency';

const { t } = useI18n()
const { width } = useDisplay();
const { dispatchUserBonus } = bonusStore();
const { setMainBlurEffectShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { dispatchUserBalance } = userStore();
const { dispatchCurrencyList} = currencyStore();

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
      item.rate = Math.ceil(parseInt(item.now) / parseInt(item.max) * 100);
    })
    const resultTree = groupObjects(getBonusList.value.list);
    getBonusList.value.list = resultTree;
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

const dialogVisible = ref<boolean>(false);
const selectedId = ref<number>(0);

const groupObjects = (array:Array<any>) => {
  let grouped:Array<any> = [];
  let new_item:any = -1;
  let is_new:boolean = true;
  array.forEach(obj => {
      if(obj.type == 0) {
        if(!is_new){
          grouped.push(new_item);
        }
        new_item = obj;
        is_new = false;
      }
      else {
        if(is_new){
          grouped.push(obj);
        }
        else{
          if(new_item.children == undefined)
            new_item.children = [];
          new_item.children.push(obj);
        }
      }
  });
  if(new_item != -1)
    grouped.push(new_item);
  /*const buildTree = parentId => {
    if (!grouped[parentId]) {
      return [];
    }

    return grouped[parentId].map(obj => {
      const children = buildTree(obj.id);
      if (children.length > 0) {
        obj.children = children;
      }
      return obj;
    });
  };*/
  return grouped;
};

const bonusDialogHide = () => {
  dialogVisible.value = false;
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setMainBlurEffectShow(false);
  setOverlayScrimShow(false);
};

const confirmDailogShow = (id: number) => {
  selectedId.value = id;
  dialogVisible.value = true;
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
  setOverlayScrimShow(true);
};

const formatCurrency = (currency: number, currencyUnit: string) => {
  let locale = 'pt-BR';
  switch (currencyUnit) {
    case "BRL":
      locale = 'pt-BR';
      break;
    case "PHP":
      locale = 'en-PH';
      break;
    case "PEN":
      locale = 'en-PE';
      break;
    case "MXN":
      locale = 'es-MX';
      break;
    case "CLP":
      locale = 'es-CL';
      break;
    case "USD":
      locale = 'en-US';
    case "COP":
      locale = 'es-CO';
      break;
  }
  const fomarttedAmount = currency.toLocaleString(locale, {
    style: "currency",
    currency: currencyUnit,
  })
  return fomarttedAmount
}
onMounted(async () => {
  await dispatchUserBonus();
  await dispatchUserBalance();
  await dispatchCurrencyList();
})
</script>

<template>
  <div class="flex flex-wrap -mx-2 mt-4 mx-2 text-400-12 text-gray text-center">
    <div class="w-full px-2 pa-0">
      {{ t("bonus.title_text") }}
    </div>
  </div>
  <div class="flex flex-wrap -mx-2 mx-1 mt-4">
    <div class="w-full px-2 pa-1">
      <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer m-bg-color-1 mx-6">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_98.svg" width="30" />
        </template>
        <v-list-item-title class="ml-4" style="line-height: 17px">
          <div class="text-400-10 text-gray">{{ t("bonus.account_balance") }}</div>
          <div class="text-600-12 white">
            {{ formatCurrency(Number(userBalance.real), userBalance.currency) }}
          </div>
        </v-list-item-title>
        <!-- <template v-slot:append>
          <div v-ripple.center style="width: 24px; height: 24px">
            <img src="@/assets/public/svg/btn_public_02.svg" width="24" />
          </div>
        </template> -->
      </li>
      <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer m-bg-color-1 mt-4 mx-6">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_27.svg" width="30" />
        </template>
        <v-list-item-title class="ml-4" style="line-height: 17px">
          <div class="text-400-10 text-gray">{{ t("bonus.bonus_money") }}</div>
          <div class="text-600-12 white">
            {{ formatCurrency(Number(userBalance.bonus), userBalance.currency) }}
          </div>
        </v-list-item-title>
      </li>
      <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer m-bg-color-1 mt-4 mx-6">
        <template v-slot:prepend>
          <img src="@/assets/public/svg/icon_public_26.svg" width="30" />
        </template>
        <v-list-item-title class="ml-4" style="line-height: 17px">
          <div class="text-400-10 text-gray">{{ t("bonus.total_text") }}</div>
          <div class="text-600-12 white">
            {{ formatCurrency(Number(userBalance.amount), userBalance.currency) }}
          </div>
        </v-list-item-title>
      </li>
    </div>
    <div class="w-full px-2 pa-1">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden m-bonus-card-body pa-2" theme="dark" color="#15161C">
        <div
          v-if="userBonusList.list == null || userBonusList.list.length == 0"
          class="ma-4"
        >
          <p class="text-700-12 gray">{{ t("bonus.text_1") }}</p>
          <p class="text-400-12 gray">{{ t("bonus.text_2") }}</p>
        </div>
        <template v-else v-for="(item, index) in userBonusList.list" :key="index">
          <div class="m-bonus-deposit-group mb-1">
            <v-expansion-panels>
              <v-expansion-panel class="bg-color-211F31 m-collapse-body" :ripple="false">
                <v-expansion-panel-title
                  :class="[
                    item.status == 3 ? 'failure-title-bg' : '',
                    item.type == 0 && item.status != 3 ? 'real-title-bg' : '',
                    item.type == 1 && item.status != 3 ? 'bonus-title-bg' : '',
                  ]"
                  :ripple="false"
                >
                  <template v-slot:default="{ expanded }">
                    <div class="flex flex-wrap -mx-2 align-center mx-0">
                      <div class="w-full px-2 [item.status == 3 ? 'black' : ''] w-3/12">
                        <div
                          class="text-400-10"
                          :class="item.type == 0 ? 'color-6AA82D' : 'yellow'"
                        >
                          {{ item.type == 0 ? t("bonus.text_3") : t("bonus.text_4") }}
                        </div>
                        <div class="mt-2">
                          {{ item.currency?.toLocaleUpperCase() }}
                          {{ item.receive }}
                        </div>
                      </div>
                      <div class="w-full px-2 [item.status == 3 ? 'color-FF6200' : ''] w-3/12">
                        <template v-if="item.status == 0">Not opened</template>
                        <template v-else-if="item.status == 1">Underway</template>
                        <template v-if="item.status == 2">Completion</template>
                        <template v-if="item.status == 3">Suspend</template>
                      </div>
                      <div class="w-full px-2 text-center bonus-cash-border w-4/12" v-if="item.status != 1">
                        <div
                          class="text-400-10"
                          :class="[item.status == 3 ? 'black' : '']"
                        >
                          Expire on
                        </div>
                        <div
                          class="text-600-10 mt-2"
                          :class="[item.status == 3 ? 'black' : '']"
                        >
                          {{ moment(item.ended_at * 1000).format("YYYY-MM-DD") }}
                        </div>
                      </div>
                      <div class="w-full px-2 text-center bonus-cash-border d-flex align-center justify-center w-4/12" v-else>
                        <div class="text-400-10">No time limit</div>
                      </div>
                      <div class="w-full px-2 text-right w-2/12" v-if="item.type == 1">
                        <div class="relative" style="margin-left: auto; width: 25px">
                          <img
                            src="@/assets/bonus/img/img_so_01.png"
                            v-if="
                              (Number(item.gain_amount) * 100) / Number(item.deposit) > 50
                            "
                            width="24"
                          />
                          <img src="@/assets/bonus/img/img_so_06.png" v-else width="24" />
                          <p class="m-bonus-rate">
                            {{
                              Number(item.deposit) == 0
                                ? 0
                                : Number(
                                    (Number(item.gain_amount) * 100) /
                                      Number(item.deposit)
                                  )
                            }}%
                          </p>
                        </div>
                      </div>
                      <div class="w-full px-2 text-center mt-1">
                        <div
                          class="text-400-10 mt-2"
                          v-if="(item.status = 1)"
                          :class="[item.status == 3 ? 'black' : '']"
                        >
                          {{ t("bonus.cashable_progress") }}
                        </div>
                        <div :class="[item.status == 1 ? 'mt-4' : 'mt-2']">
                          <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden [
 item.status == 3
 ? 'failure-progress'
 : 'real-completion-progress',
 ]" v-model="item.rate" height="16">
                            <div
                              class="text-400-10"
                              :class="[item.status == 3 ? 'gray' : '']"
                            >
                              {{
                                formatCurrency(Number(item.now), userBalance.currency)
                              }}
                              /
                              {{ formatCurrency(Number(item.max), userBalance.currency) }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="mt-3">
                  <v-table class="m-forms-bonus-table-bg text-400-10 white">
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
                      <tr>
                        <td>{{ moment(item.created_at * 1000).format("YYYY/MM/DD") }}</td>
                        <td>{{ item.gain_amount }}</td>
                        <td>{{ item.receive }}</td>
                        <td>{{ item.wager }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                  <div class="flex flex-wrap -mx-2 ma-0">
                    <div class="w-full px-2 text-left text-500-10">
                      ID: {{ item.id }}
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel
                class="bg-color-211F31 m-collapse-body mt-1"
                :ripple="false"
                v-if="item.children != undefined"
              >
                <v-expansion-panel-title
                  :class="[
                    item.children[0].status == 3 ? 'failure-title-bg' : '',
                    item.children[0].type == 0 && item.children[0].status != 3
                      ? 'real-title-bg'
                      : '',
                    item.children[0].type == 1 && item.children[0].status != 3
                      ? 'bonus-title-bg'
                      : '',
                  ]"
                  :ripple="false"
                >
                  <template v-slot:default="{ expanded }">
                    <div class="flex flex-wrap -mx-2 align-center mx-0">
                      <div class="w-full px-2 [item.children[0].status == 3 ? 'black' : ''] w-3/12">
                        <div
                          class="text-400-10"
                          :class="item.children[0].type == 0 ? 'color-6AA82D' : 'yellow'"
                        >
                          {{
                            item.children[0].type == 0
                              ? t("bonus.text_3")
                              : t("bonus.text_4")
                          }}
                        </div>
                        <div class="mt-2">
                          {{ item.currency?.toLocaleUpperCase() }}
                          {{ item.children[0].receive }}
                        </div>
                      </div>
                      <div class="w-full px-2 [item.children[0].status == 3 ? 'color-FF6200' : ''] w-3/12">
                        <template v-if="item.children[0].status == 0"
                          >Not opened</template
                        >
                        <template v-else-if="item.children[0].status == 1"
                          >Underway</template
                        >
                        <template v-if="item.children[0].status == 2"
                          >Completion</template
                        >
                        <template v-if="item.children[0].status == 3">Suspend</template>
                      </div>
                      <div class="w-full px-2 text-center bonus-cash-border w-4/12" v-if="item.children[0].status != 1">
                        <div
                          class="text-400-10"
                          :class="[item.children[0].status == 3 ? 'black' : '']"
                        >
                          Expire on
                        </div>
                        <div
                          class="text-600-10 mt-2"
                          :class="[item.children[0].status == 3 ? 'black' : '']"
                        >
                          {{
                            moment(item.children[0].ended_at * 1000).format("YYYY-MM-DD")
                          }}
                        </div>
                      </div>
                      <div class="w-full px-2 text-center bonus-cash-border d-flex align-center justify-center w-4/12" v-else>
                        <div class="text-400-10">No time limit</div>
                      </div>
                      <div class="w-full px-2 text-right w-2/12">
                        <div class="relative" style="margin-left: auto; width: 25px">
                          <img
                            src="@/assets/bonus/img/img_so_01.png"
                            v-if="
                              (Number(item.children[0].gain_amount) * 100) /
                                item.children[0].deposit >
                              50
                            "
                            width="24"
                          />
                          <img src="@/assets/bonus/img/img_so_06.png" v-else width="24" />
                          <p class="m-bonus-rate">
                            {{
                              Number(item.children[0].deposit) == 0
                                ? 0
                                : Number(
                                    (item.children[0].gain_amount * 100) /
                                      Number(item.children[0].deposit)
                                  )
                            }}%
                          </p>
                        </div>
                      </div>
                      <div class="w-full px-2 text-center mt-1">
                        <div
                          class="text-400-10 mt-2"
                          v-if="(item.children[0].status = 1)"
                          :class="[item.children[0].status == 3 ? 'black' : '']"
                        >
                          {{ t("bonus.cashable_progress") }}
                        </div>
                        <div :class="[item.children[0].status == 1 ? 'mt-4' : 'mt-2']">
                          <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden [
 item.children[0].status == 3
 ? 'failure-progress'
 : 'bonus-completion-progress',
 ]" v-model="item.children[0].rate" height="16">
                            <div
                              class="text-400-10"
                              :class="[item.children[0].status == 3 ? 'gray' : '']"
                            >
                              {{
                                formatCurrency(
                                  Number(item.children[0].now),
                                  userBalance.currency
                                )
                              }}/
                              {{
                                formatCurrency(
                                  Number(item.children[0].max),
                                  userBalance.currency
                                )
                              }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </v-expansion-panel-title>

                <v-expansion-panel-text class="mt-3">
                  <v-table class="m-forms-bonus-table-bg text-400-10 white">
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
                      <tr>
                        <td>
                          {{
                            moment(item.children[0].created_at * 1000).format(
                              "YYYY/MM/DD"
                            )
                          }}
                        </td>
                        <td>{{ item.children[0].gain_amount }}</td>
                        <td>{{ item.children[0].receive }}</td>
                        <td>{{ item.children[0].wager }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                  <div class="flex flex-wrap -mx-2 ma-0 align-center">
                    <div class="w-full px-2 text-left text-500-10 w-6/12">
                      ID: {{ item.children[0].id }}
                    </div>
                    <div class="w-full px-2 text-right w-6/12">
                      <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 m-bonus-forfeit-btn text-none" click="confirmDailogShow(item.children[0].id)">
                        {{ t("bonus.text_5") }}
                      </button>
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </template>
      </div>
    </div>
  </div>
  <v-dialog
    v-model="dialogVisible"
    width="326"
    content-class="m-suspend-dialog-position"
    @click:outside="bonusDialogHide"
  >
    <MBonusDialog :id="selectedId" @bonusDialogHide="bonusDialogHide" />
  </v-dialog>
</template>

<style lang="scss">
.m-bonus-forfeit-btn {
  width: 64px;
  height: 24px !important;
  border-radius: 4px;
  background: var(--Secondary-Button-353652, #1d2027);
  .v-btn__content {
    color: var(--White-BG, #fff);
    text-align: center;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.v-expansion-panel-title__overlay {
  opacity: 0 !important;
}

.m-bonus-expansion-help-img:active {
  scale: 0.95;
  filter: brightness(80%);
  transition: scale 0.2s;
}

.m-bonus-card-body {
  min-height: 233px;
  overflow-y: auto;
  margin-bottom: 6px;

  .v-expansion-panel-title__icon {
    display: inline-flex;
    margin-bottom: -4px;
    margin-top: -4px;
    user-select: none;
    margin-inline-start: auto;
    position: absolute;
    top: 40px;
    right: 10px;
  }
}

.m-bonus-rate {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.9);
  font-family: Haettenschweiler;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  // line-height: normal;
  // letter-spacing: 0.16px;
}

.m-forms-bonus-table-bg {
  background: #15161c !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
}

.v-expansion-panel-title:active:enabled {
  transform: none !important;
  filter: none !important;
}

.bonus-cash-border {
  height: 30px;
  border-right: 1px solid #1d2027;
}

.m-collapse-body .v-expansion-panel-title {
  border-radius: 8px !important;
  padding: 14px 8px !important;
  height: 100px !important;
}

.real-title-bg {
  border-radius: 8px;
  background: linear-gradient(90deg, #1d2027 0%, #009b3a 100%) !important;
}

.bonus-title-bg {
  border-radius: 8px;
  background: linear-gradient(90deg, #23262f 0%, #1f4ea8 100%) !important;
}

.failure-title-bg {
  background: linear-gradient(90deg, #221f32 0%, #424567 100%) !important;
}

.v-expansion-panel:not(:first-child)::after {
  content: none !important;
}

.v-progress-linear {
  background: #1d2027 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
}

.v-progress-linear__background {
  background: transparent !important;
}

.real-completion-progress {
  .v-progress-linear__determinate {
    background: #009b3a !important;
    border-radius: 8px !important;
    border: 2px solid #15161c;
  }
}
.bonus-completion-progress {
  .v-progress-linear__determinate {
    background: #235ac5 !important;
    border-radius: 8px !important;
    border: 2px solid #15161c;
  }
}

.failure-progress {
  .v-progress-linear__determinate {
    background: linear-gradient(0deg, #15161c 0%, #393a71 100%);
    border-radius: 8px;
  }
}

.v-expansion-panel {
  border-radius: 8px !important;
}

.bonus-cash {
  color: #f9bc01;
  font-weight: 700;
}

.m-bonus-cash-failure {
  color: #000000;
  font-weight: 700;
}

.v-expansion-panel-text__wrapper {
  padding: 8px 8px 16px !important;
}
.m-bonus-deposit-group {
  border-radius: 8px;
  background: #1d2027;
  padding: 4px;
  .v-expansion-panel {
    background-color: #23262f !important;
  }
}
</style>
