<script lang="ts" setup>
import { ref, computed, h, shallowRef, watch } from "vue";
import Pagination from "@/components/global/pagination/index.vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { appBarStore } from "@/store/appBar";
import { storeToRefs } from "pinia";
const { t } = useI18n();
const { width } = useDisplay();

const formsList = ref<Array<any>>([
  {
    game: "Crash",
    date: "2023/1/29 17:50:36",
    amount: "R$ 150000000.00",
    multilier: "2.00x",
    betId: "re54er35sgf",
    status: "win",
    profit: "R$ 300000000.00",
  },
  {
    game: "Crash",
    date: "2023/1/29 17:50:36",
    amount: "R$ 150000000.00",
    multilier: "2.00x",
    betId: "re54er35sgf",
    status: "win",
    profit: "R$ 300000000.00",
  },
  {
    game: "Crash",
    date: "2023/1/29 17:50:36",
    amount: "R$ 150000000.00",
    multilier: "2.00x",
    betId: "re54er35sgf",
    status: "loss",
    profit: "- R$ 300000000.00",
  },
  {},
  {},
  {},
  {},
  {},
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

const fixPositionShow = computed(() => {
  const { getFixPositionEnable } = storeToRefs(appBarStore());
  return getFixPositionEnable.value;
});

const handlePrev = () => {};

const handleNext = () => {};
</script>
<template>
  <div class="flex flex-wrap -mx-2 mx-2 mt-4">
    <v-table class="forms-bonus-table-bg" theme="dark" fixed-header height="700px">
      <thead class="forms-table-header">
        <tr>
          <th class="forms-table-header-text" style="border-radius: 8px 0px 0px 8px">
            {{ t("transaction.game_history.game") }}
          </th>
          <th class="forms-table-header-text">
            <div class="forms-table-border">{{ t("transaction.game_history.date") }}</div>
          </th>
          <th class="forms-table-header-text">
            <div>{{ t("transaction.game_history.amount") }}</div>
          </th>
          <th class="forms-table-header-text">
            <div class="forms-table-border">
              {{ t("transaction.game_history.multilier") }}
            </div>
          </th>
          <th class="forms-table-header-text">
            <div>{{ t("transaction.game_history.betId") }}</div>
          </th>
          <th class="forms-table-header-text">
            <div class="forms-table-border">
              {{ t("transaction.game_history.status") }}
            </div>
          </th>
          <th class="forms-table-header-text" style="border-radius: 0px 8px 8px 0px">
            {{ t("transaction.game_history.profit") }}
          </th>
        </tr>
      </thead>
      <tbody
        :class="mobileWidth < 600 ? 'text-400-12 text-center' : 'text-400-14 text-center'"
      >
        <tr v-for="(item, index) in formsList" :key="index">
          <td>{{ item.game }}</td>
          <td>{{ item.date }}</td>
          <td class="d-flex align-center justify-center">
            <div
              style="
                width: 20px;
                height: 20px;
                background: #23262f;
                border-radius: 20px;
                position: relative;
              "
              v-if="item.amount"
            >
              <el-tooltip placement="top" effect="customized">
                <template #content>
                  <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer text-400-16 gray" v-for="(item, index) in tootipList" key="index">
                    <v-list-item-title>ID: {{ item.id }}</v-list-item-title>
                    <template v-slot:append>
                      <div class="ml-10">{{ item.cash }}</div>
                    </template>
                  </li>
                </template>
                <!-- <img src="@/assets/public/svg/icon_public_50.svg" width="20" /> -->
                <span class="inline-flex items-center justify-center" style="
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                  ">
                  mdi-chevron-up
                </span>
              </el-tooltip>
            </div>
            <div class="ml-2">{{ item.amount }}</div>
          </td>
          <td>{{ item.multilier }}</td>
          <td>{{ item.betId }}</td>
          <td>{{ item.status }}</td>
          <td :class="item.status == 'win' ? 'color-01983A' : 'color-D42763'">
            {{ item.profit }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div class="flex flex-wrap -mx-2 ma-4 mx-2">
    <div class="w-full px-2 d-flex w-6/12 md:w-4/12 md:ml-4/12 lg:w-4/12 lg:ml-4/12" style="margin-left: -10px !important">
      <v-menu offset="12" class="game-menu" v-model="gameMenuShow">
        <template v-slot:activator="{ props }">
          <div class="bg-white shadow-lg rounded-lg overflow-hidden" color="#15161C" theme="dark">
            <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer mobileWidth < 600 ? 'text-600-12' : ''" v-bind="props" append-icon="mdi-chevron-down" value="game">
              <v-list-item-title :class="mobileWidth < 600 ? 'text-600-12' : ''">{{
                selectedGame
              }}</v-list-item-title>
            </li>
          </div>
        </template>
        <ul class="bg-white rounded-md p-2 shadow" theme="dark" bg-color="#1D2027">
          <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer game-item" v-for="(item, i) in gameList" key="i" value="item" click="handleDropdown(item)">
            <v-list-item-title
              class="text-center"
              :class="mobileWidth < 600 ? 'text-600-12' : ''"
              >{{ item }}</v-list-item-title
            >
          </li>
          <div class="bonus-game-card-list text-center">
            <span class="inline-flex items-center justify-center">mdi-chevron-down</span>
          </div>
        </ul>
      </v-menu>
    </div>
    <div class="w-full px-2 d-flex w-6/12 md:w-8/12 md:ml-8/12 lg:w-8/12 lg:ml-8/12" style="
        margin-left: 10px !important;
        padding-right: 0px !important;
        padding-left: 0px !important;
      ">
      <div style="float: right !important; width: 100%">
        <Pagination
          style="float: right"
          :length="10"
          @handlePrev="handlePrev"
          @handleNext="handleNext"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.forms-bonus-table-bg {
  height: 700px;
  background: #15161c !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
}

.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  border-bottom: 1px solid #23262f;
}

.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background: #23262f;
}

.forms-table-header {
  border-radius: 8px !important;
}

.forms-table-body {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  text-align: center;
}

.forms-table-header-text {
  font-weight: 700 !important;
  font-size: 16px !important;
  text-align: center !important;
  color: #000000 !important;
}

.forms-table-border {
  padding: 0px 20px;
  border-left: 1px solid #000000 !important;
  border-right: 1px solid #000000 !important;
}

.game-menu {
  .v-overlay__content::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: #1d2027 transparent transparent transparent;
  }
}

.bonus-game-card-list {
  margin: auto;
  width: 117px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 27px;
  background: var(--bg-51-c-1929, #15161c);
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}

.el-popper.is-customized {
  padding: 6px 12px;
  background: #1d2027;
  border-radius: 10px;
}

.el-popper.is-customized .el-popper__arrow::before {
  background: #1d2027;
  right: 0;
}
</style>
