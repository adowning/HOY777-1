<script lang="ts" setup>
import { ref, computed, h, shallowRef, watch } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import router from "@/router";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";

const { t } = useI18n();
const { width } = useDisplay();

const formsList = ref<Array<any>>([
  {
    game: "Crash",
    date: "2023/1/29 17:50:36",
    amount: "R$ 1500000.00",
    multilier: "2.00x",
    betId: "re54er35sgf",
    status: "win",
    profit: "R$ 300000000.00",
  },
  {
    game: "Crash",
    date: "2023/1/29 17:50:36",
    amount: "R$ 1500000.00",
    multilier: "2.00x",
    betId: "re54er35sgf",
    status: "win",
    profit: "R$ 3000000.00",
  },
  {
    game: "Crash",
    date: "2023/1/29 17:50:36",
    amount: "R$ 1500000.00",
    multilier: "2.00x",
    betId: "re54er35sgf",
    status: "loss",
    profit: "- R$ 300000000.00",
  },
  {},
  {},
  {},
  {},
]);

const gameList = ref<Array<string>>([
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
  "Crash",
]);

const selectedGame = ref<string>("Crash");

const gameMenuShow = ref<boolean>(false);

const handleDropdown = (item: string) => {
  selectedGame.value = item;
};

const tootipList = ref<Array<any>>([
  {
    id: "Qsd58844221122 ",
    cash: "BRL100",
  },
  {
    id: "qwe12309700974",
    cash: "BRL100",
  },
  {
    id: "qww54515555566",
    cash: "BRL150",
  },
]);

window.addEventListener("scroll", function () {
  gameMenuShow.value = false;
});

const mobileWidth = computed(() => {
  return width.value;
});

const handleGameLink = (game: any) => {
  console.log(game);
  // router.push({name: 'Dashboard'});
};

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});

const handlePrev = () => {};

const handleNext = () => {};
</script>
<template>
  <div class="flex flex-wrap -mx-2 mx-2 mt-1 m-forms-bonus-table1">
    <v-table
      class="m-forms-bonus-table-bg1"
      :class="fixPositionShow ? 'table-position-overflow' : ''"
      theme="dark"
      fixed-header
      style="padding: 16px 16px 16px 16px"
    >
      <thead class="forms-table-header1" style="border-radius: 0px !important">
        <tr>
          <th
            class="text-700-12 black text-center"
            style="border-radius: 8px 0px 0px 8px"
          >
            <div class="forms-table-border0">
              <div style="width: 40px; margin-left: 16px; margin-right: 20px">
                {{ t("transaction.game_history.game") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 50px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.game_history.date") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 130px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.game_history.amount") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 90px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.game_history.status") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 120px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.game_history.profit") }}
              </div>
            </div>
          </th>
          <th class="text-700-12 black text-center">
            <div class="forms-table-border1">
              <div style="width: 90px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.game_history.multilier") }}
              </div>
            </div>
          </th>
          <th
            class="text-700-12 black text-center"
            style="border-radius: 0px 8px 8px 0px"
          >
            <div class="forms-table-border2">
              <div style="width: 100px; margin-left: 20px; margin-right: 20px">
                {{ t("transaction.game_history.betId") }}
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="text-400-12 text-center">
        <tr v-for="(item, index) in formsList" :key="index">
          <td
            class="m-bonus-transaction-table-body-cells"
            style="padding-top: 21px !important; padding-bottom: 21px !important"
          >
            <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 m-bonus-transaction-table-btn" click="handleGameLink(item.game)">
              {{ item.game }}
            </button>
          </td>
          <td
            class="m-bonus-transaction-table-body-cells"
            style="padding-top: 21px !important; padding-bottom: 21px !important"
          >
            {{ item.date }}
          </td>
          <td
            style="
              padding-top: 21px !important;
              padding-bottom: 21px !important;
              min-width: 130px;
            "
          >
            <div class="d-flex align-center justify-center">
              <div
                style="
                  width: 16px;
                  height: 16px;
                  background: #23262F;
                  border-radius: 20px;
                "
                v-if="item.amount"
              >
                <el-tooltip
                  placement="top"
                  effect="customized"
                  style="margin: 10px !important"
                >
                  <template #content>
                    <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer m-bonus-transaction-tooltip-body gray" v-for="(item, index) in tootipList" key="index" style="min-height: 26px !important">
                      <v-list-item-title class="m-bonus-transaction-tooltip"
                        >ID: {{ item.id }}</v-list-item-title
                      >
                      <template v-slot:append>
                        <div
                          class="m-bonus-transaction-tooltip"
                          style="margin-left: 54px"
                        >
                          {{ item.cash }}
                        </div>
                      </template>
                    </li>
                  </template>
                  <!-- <img src="@/assets/public/svg/icon_public_50.svg" width="20" /> -->
                  <span class="inline-flex items-center justify-center" style="top: -2px; left: -1px">mdi-chevron-up</span>
                </el-tooltip>
              </div>
              <div class="ml-1">{{ item.amount }}</div>
            </div>
          </td>
          <td
            class="m-bonus-transaction-table-body-cells"
            style="padding-top: 21px !important; padding-bottom: 21px !important"
          >
            {{ item.status }}
          </td>
          <td
            class="m-bonus-transaction-table-body-cells"
            style="
              padding-top: 21px !important;
              padding-bottom: 21px !important;
              min-width: 130px;
            "
            :class="item.status == 'win' ? 'color-01983A' : 'color-D42763'"
          >
            {{ item.profit }}
          </td>
          <td
            class="m-bonus-transaction-table-body-cells"
            style="padding-top: 21px !important; padding-bottom: 21px !important"
          >
            {{ item.multilier }}
          </td>
          <td
            class="m-bonus-transaction-table-body-cells"
            style="padding-top: 21px !important; padding-bottom: 21px !important"
          >
            {{ item.betId }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div class="flex flex-wrap -mx-2 m-bonus-transaction-table">
    <div class="w-full px-2 d-flex w-6/12 md:w-4/12 md:ml-4/12 lg:w-4/12 lg:ml-4/12" style="margin-left: -12px; margin-top: 4px">
      <v-menu offset="12" class="m-game-menu" v-model:model-value="gameMenuShow">
        <template v-slot:activator="{ props }">
          <div class="bg-white shadow-lg rounded-lg overflow-hidden m-bonus-game-card" color="#15161C" theme="dark" style="height: 32px; width:125px">
            <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer" v-bind="props" append-icon="mdi-chevron-down" value="game" style="min-height: 32px">
              <v-list-item-title class="text-600-12">
                {{ selectedGame }}
              </v-list-item-title>
            </li>
          </div>
        </template>
        <ul class="bg-white rounded-md p-2 shadow" theme="dark" bg-color="#23262F" style="border-radius:8px">
          <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer { 'm-game-menu-item-border': selectedGame == item }" v-for="(item, i) in gameList" key="i" value="item" click="handleDropdown(item)">
            <v-list-item-title class="text-center text-600-12">
              {{ item }}
            </v-list-item-title>
          </li>
          <div class="m-bonus-game-card-list text-center">
            <span class="inline-flex items-center justify-center">mdi-chevron-down</span>
          </div>
        </ul>
      </v-menu>
    </div>
    <div class="w-full px-2 d-flex w-6/12 md:w-8/12 md:ml-8/12 lg:w-8/12 lg:ml-8/12" style="padding-right: 6px">
      <div style="width: 100%">
        <Pagination :length="10" @handlePrev="handlePrev" @handleNext="handleNext" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.m-forms-bonus-table-bg1 {
  background: #15161C !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  // border-radius: 8px !important;
  width: 100% !important;
}

.m-forms-bonus-table1 {
  border-radius: 8px !important;
  .v-table__wrapper {
    border-radius: 0px !important;
  }
  .v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
    background: #23262F;
    height: 46px !important;
  }
  .v-table > .v-table__wrapper > table > tbody > tr > td,
  .v-table > .v-table__wrapper > table > tbody > tr > th,
  .v-table > .v-table__wrapper > table > thead > tr > td,
  .v-table > .v-table__wrapper > table > thead > tr > th,
  .v-table > .v-table__wrapper > table > tfoot > tr > td,
  .v-table > .v-table__wrapper > table > tfoot > tr > th {
    padding: 0px !important;
  }
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
    border-bottom: 1px solid #23262F;
  }

  .forms-table-body {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    text-align: center;
  }

  .forms-table-border0 {
    border-right: 1px solid #7782AA !important;
  }

  .forms-table-border1 {
    border-left: 1px solid #7782AA !important;
    border-right: 1px solid #7782AA !important;
  }
  .forms-table-border2 {
    border-left: 1px solid #7782AA !important;
  }
}

.m-bonus-transaction-table-body-cells {
  padding-top: 21px !important;
  padding-bottom: 21px !important;
}
.m-game-menu {
  .v-overlay__content::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -11px;
    border-width: 7px;
    border-style: solid;
    border-color: #1D2027 transparent transparent transparent;
  }

  .v-overlay__content {
    max-height: 418px !important;
  }
}

.m-bonus-game-card {
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--bg-51-c-1929, #15161C);
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;

  .v-list-item__append > .v-icon {
    margin-inline-start: 10px;
    font-size: 20px;
  }
}

.el-popper.is-customized {
  padding: 15px 20px;
  background: #1D2027;
  border-radius: 8px;
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.21);
}

.el-popper.is-customized .el-popper__arrow::before {
  background: #1D2027;
  right: 0;
}

.m-bonus-game-card-list {
  margin-left: 3px;
  width: 125px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--bg-51-c-1929, #15161C);
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}
.v-pagination__list {
  justify-content: right !important;
}
.m-bonus-transaction-table {
  margin-left: 12px;
  margin-top: 16px !important;
  margin-bottom: 8px;
}

.m-bonus-transaction-tooltip-body {
  padding: 0px !important;
  margin-top: 5px;
  margin-bottom: 5px;
  .m-bonus-transaction-tooltip {
    font-size: 12px;
    font-weight: 400;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  }
}
.m-bonus-transaction-table-btn {
  background-color: transparent;
  box-shadow: none;
  .v-btn__content {
    text-transform: none;
    font-size: 12px;
    font-weight: 400;
  }
}
.m-bonus-transaction-table-body-cells {
  .v-btn--elevated:hover,
  .v-btn--elevated:focus {
    box-shadow: none;
  }
}

.table-position-overflow {
  .v-table__wrapper {
    overflow: hidden !important;
  }
}

.m-game-menu-item-border{
  margin: 8px;
  border-radius: 8px !important;
  //border: 1px solid #00b25c !important;
  height: 36px !important;
}
</style>
