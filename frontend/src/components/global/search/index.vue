<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { ref, computed, watch, onMounted, onUnmounted, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { Search } from "@/interface/game";
import { gameStore } from "@/store/game";
import { mailStore } from "@/store/mail";
import { ProgressiveImage } from "vue-progressive-image";
import img_public_42 from "@/assets/public/image/img_public_42.png";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import Swiper core and required modules
import { Pagination } from "swiper/modules";

const { t } = useI18n();
const { width } = useDisplay();
const router = useRouter();
const { dispatchGameSearch } = gameStore();
const { setGameSearchList } = gameStore();
const { removeAllSearchTextList } = gameStore();
const { removeSearchTextList } = gameStore();
const { setSearchTextList } = gameStore();
const { setMailMenuShow } = mailStore();
const searchText = ref<string>("");
const searchLoading = ref<boolean>(false);
const page_no = ref<number>(1);
const currentPage = ref<number>(1);
const moreCurrentPage = ref<number>(1);
const limit = ref<number>(4);
const moreLoading = ref<boolean>(false);
const swiper = ref<any>(null);

const modules = [Pagination];

const testGames = [
  new URL("@/assets/home/image/img_pg_01.png", import.meta.url).href,
  new URL("@/assets/home/image/img_pg_02.png", import.meta.url).href,
  new URL("@/assets/home/image/img_pg_03.png", import.meta.url).href,
  new URL("@/assets/home/image/img_pg_04.png", import.meta.url).href,
  new URL("@/assets/home/image/img_pg_05.png", import.meta.url).href,
  new URL("@/assets/home/image/img_pg_06.png", import.meta.url).href,
  new URL("@/assets/home/image/img_pg_07.png", import.meta.url).href,
  new URL("@/assets/home/image/img_og_01.png", import.meta.url).href,
  new URL("@/assets/home/image/img_og_02.png", import.meta.url).href,
  new URL("@/assets/home/image/img_og_03.png", import.meta.url).href,
  new URL("@/assets/home/image/img_og_04.png", import.meta.url).href,
  new URL("@/assets/home/image/img_og_05.png", import.meta.url).href,
  new URL("@/assets/home/image/img_og_06.png", import.meta.url).href,
  new URL("@/assets/home/image/img_og_07.png", import.meta.url).href,
  new URL("@/assets/home/image/img_slots_01.png", import.meta.url).href,
  new URL("@/assets/home/image/img_slots_02.png", import.meta.url).href,
  new URL("@/assets/home/image/img_slots_03.png", import.meta.url).href,
  new URL("@/assets/home/image/img_slots_04.png", import.meta.url).href,
  new URL("@/assets/home/image/img_slots_05.png", import.meta.url).href,
  new URL("@/assets/home/image/img_slots_06.png", import.meta.url).href,
  new URL("@/assets/home/image/img_slots_07.png", import.meta.url).href,
  new URL("@/assets/home/image/img_lc_01.png", import.meta.url).href,
  new URL("@/assets/home/image/img_lc_02.png", import.meta.url).href,
  new URL("@/assets/home/image/img_lc_03.png", import.meta.url).href,
  new URL("@/assets/home/image/img_lc_04.png", import.meta.url).href,
  new URL("@/assets/home/image/img_lc_05.png", import.meta.url).href,
  new URL("@/assets/home/image/img_lc_06.png", import.meta.url).href,
  new URL("@/assets/home/image/img_lc_07.png", import.meta.url).href,
];

const searchedGameList = ref<Array<Search>>([]);

const searchedGameCount = ref<number>(0);

const searchRef = ref<HTMLElement | undefined>(undefined);

const recommendedGameList = ref<Array<Search>>([]);

const emit = defineEmits<{ (e: "searchCancel"): void }>();

const props = defineProps<{ searchDialogShow: boolean }>();

const { searchDialogShow } = toRefs(props);

const searchContainerHeight = ref<number>(590);

const mobileWidth = computed(() => {
  return width.value;
});

const searchHistoryKeywords = computed(() => {
  const { getSearchTextList } = storeToRefs(gameStore());
  return getSearchTextList.value;
});

const gameSearchList = computed(() => {
  const { getGameSearchList } = storeToRefs(gameStore());
  return getGameSearchList.value;
});

const success = computed(() => {
  const { getSuccess } = storeToRefs(gameStore());
  return getSuccess.value;
});

const goToPrev = () => {
  swiper.value.slidePrev();
};

const goToNext = () => {
  swiper.value.slideNext();
};

const getSwiperRef = (swiperInstance: any) => {
  swiper.value = swiperInstance;
};

const handleEnterGame = async (id: number, name: string) => {
  setSearchTextList(searchText.value);
  searchText.value = "";
  page_no.value = 1;
  setGameSearchList({
    list: [],
    total: 0,
  });
  searchedGameList.value = [];
  let replaceName = name.replace(/ /g, "-");
  if (mobileWidth.value < 600) {
    setMailMenuShow(true);
  }
  router.push(`/game/${id}/${replaceName}`);
};

const handleSearchInput = async () => {
  if (searchText.value.length >= 3) {
    searchLoading.value = true;
    await dispatchGameSearch(
      `?search=${searchText.value}&page=${currentPage.value}&limit=${
        limit.value * page_no.value
      }`
    );
    searchLoading.value = false;
    // if (success.value) {
    searchedGameCount.value = gameSearchList.value.total;
    searchedGameList.value = gameSearchList.value.list;
    searchedGameList.value.map((item) => {
      item.image = testGames[Math.floor(Math.random() * 7)];
    });
    // }
  } else {
    page_no.value = 1;
    setGameSearchList({
      list: [],
      total: 0,
    });
    searchedGameList.value = [];
  }
};

const handleResize = () => {
  if (window.visualViewport?.height != undefined) {
    searchContainerHeight.value = window.visualViewport.height;
    console.log(searchContainerHeight);
  }
};

const handleMoreGame = async () => {
  moreLoading.value = true;
  page_no.value += 1;
  moreCurrentPage.value += 1;
  if (searchText.value.length >= 3) {
    searchLoading.value = true;
    await dispatchGameSearch(
      `?search=${searchText.value}&page=${moreCurrentPage.value}&limit=${limit.value}`
    );
    moreLoading.value = false;
    searchLoading.value = false;
    if (success.value) {
      searchedGameList.value = [...searchedGameList.value, ...gameSearchList.value.list];
      searchedGameList.value.map((item) => {
        item.image = testGames[Math.floor(Math.random() * 28)];
      });
    }
  }
};

const handleRemoveSearchKeyword = (index: number) => {
  // searchHistoryKeywords.value.splice(index, 1);
  removeSearchTextList(index);
};

const removeAllSearchKeyword = () => {
  removeAllSearchTextList();
};

const handleSearchGame = async (keyword: string) => {
  searchText.value = keyword;
  if (searchText.value.length >= 3) {
    searchLoading.value = true;
    await dispatchGameSearch(
      `?search=${searchText.value}&page=${currentPage.value}&limit=${
        limit.value * page_no.value
      }`
    );
    searchLoading.value = false;
    // if (success.value) {
    searchedGameCount.value = gameSearchList.value.total;
    searchedGameList.value = gameSearchList.value.list;
    searchedGameList.value.map((item) => {
      item.image = testGames[Math.floor(Math.random() * 7)];
    });
    // }
  } else {
    page_no.value = 1;
    setGameSearchList({
      list: [],
      total: 0,
    });
    searchedGameList.value = [];
  }
};

watch(
  searchText,
  (value) => {
    if (value == null) searchText.value = "";
    if (searchText.value == "") {
      page_no.value = 1;
      setGameSearchList({
        list: [],
        total: 0,
      });
      searchedGameList.value = [];
    }
  },
  { deep: true }
);

watch(searchDialogShow, (value) => {
  if (value) {
    if (searchRef.value != undefined) {
      searchRef.value.focus();
    }
  }
  if (!value && searchText.value != "") {
    setSearchTextList(searchText.value);
    searchText.value = "";
    page_no.value = 1;
    setGameSearchList({
      list: [],
      total: 0,
    });
    searchedGameList.value = [];
  }
});

onMounted(async () => {
  // if (searchRef.value != undefined) {
  //   searchRef.value.focus();
  // }
  window.addEventListener("resize", handleResize);
  await dispatchGameSearch(
    `?game_categories_slug=recommend&page=${currentPage.value}&limit=${
      limit.value * page_no.value
    }`
  );
  recommendedGameList.value = gameSearchList.value.list;
  if (recommendedGameList.value.length > 0) {
    recommendedGameList.value.map((item) => {
      item.image = testGames[Math.floor(Math.random() * 28)];
    });
  }
});
</script>

<template>
  <div
    class="w-full h-full rounded-b-lg overflow-y-auto"
    style="background-color: var(--text-box-1-211f31)"
  >
    <div
      class="relative h-12 leading-12 text-center text-white"
      style="background-color: var(--bg-5-1c1929)"
    >
      <span
        class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5"
        @click="emit('searchCancel')"
      >
        <span
          class="absolute w-2.5 h-2.5 border-b-2 border-l-2 border-white transform rotate-45"
        ></span>
      </span>
      <span>{{ t("home.search") }}</span>
    </div>
    <div class="pt-3">
      <div
        class="relative"
        :class="[
          mobileWidth < 600 ? 'h-10' : '',
          'rounded-lg bg-gray-800 shadow-inner',
        ]"
      >
        <input
          ref="searchRef"
          :placeholder="t('home.search')"
          class="w-full h-full bg-transparent text-white px-10 text-xs"
          @input="handleSearchInput"
          v-model="searchText"
        />
        <img
          src="@/assets/public/svg/icon_public_81.svg"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
        />
        <button
          v-if="searchText"
          @click="searchText = ''"
          class="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <img src="@/assets/public/svg/icon_public_52.svg" class="w-4 h-4" />
        </button>
      </div>
    </div>
    <div class="relative pt-8" v-if="searchLoading">
      <div class="flex items-center justify-center">
        <div
          class="w-2.5 h-2.5 bg-green-400 rounded-full mx-1 animate-expand"
        ></div>
        <div
          class="w-4 h-4 bg-green-400 rounded-full mx-1 animate-expand-reverse"
        ></div>
        <div
          class="w-2.5 h-2.5 bg-green-400 rounded-full mx-1 animate-expand"
        ></div>
      </div>
    </div>
    <div class="pt-8 text-center" v-else>
      <div v-if="searchedGameList.length == 0">
        <img
          src="@/assets/public/image/img_se_1.png"
          v-if="searchText.length >= 3 && searchText != ''"
        />
        <p
          class="text-xs text-gray-400"
          v-if="searchText.length >= 3 && searchText != ''"
        >
          {{ t("home.search_dialog.text_2") }}
        </p>
        <p class="text-xs text-gray-400" v-else>
          {{ t("home.search_dialog.text_3") }}
        </p>
        <div
          class="flex justify-between mx-3 mt-4"
          v-if="searchHistoryKeywords.length > 0"
        >
          <p class="text-sm font-bold text-white">
            {{ t("home.search_dialog.search_history") }}
          </p>
          <div
            class="w-7 h-7 rounded-sm shadow-md"
            style="background-color: var(--secondary-button-353652)"
            @click="removeAllSearchKeyword"
          >
            <img
              src="@/assets/public/svg/icon_public_82.svg"
              class="mt-1.5"
            />
          </div>
        </div>
        <div
          class="flex flex-wrap gap-1.5 mx-3 mt-4"
          v-if="searchHistoryKeywords.length > 0"
        >
          <div
            class="relative px-3 py-1.5 rounded-md shadow-md"
            style="background-color: var(--secondary-button-353652)"
            v-for="(keyword, index) in searchHistoryKeywords"
            :key="index"
          >
            <font
              class="text-xs text-center text-gray-400"
              @click="handleSearchGame(keyword)"
            >
              {{ keyword }}</font
            >
            <span
              class="absolute top-0 -right-2.5 w-4 h-7 rounded-r-md shadow-md"
              style="background-color: var(--text-dark-black-000000)"
              v-if="index + 1 == searchHistoryKeywords.length"
              @click="handleRemoveSearchKeyword(index)"
            >
              <img
                src="@/assets/public/svg/icon_public_52.svg"
                class="w-2.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </span>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex justify-between items-center mx-3">
          <p class="text-sm font-bold text-white">
            {{ t("home.search_dialog.text_4") }}
          </p>
          <p class="text-xs font-semibold text-gray-400">
            {{ t("home.search_dialog.text_5") }}
            <font class="text-cyan-400">{{ searchedGameCount }}</font>
            {{ t("home.search_dialog.text_6") }}
          </p>
        </div>
        <div class="flex flex-wrap mx-2 my-4">
          <template v-for="(item, index) in searchedGameList" :key="index">
            <div class="w-1/3 p-1" v-if="index < 3 * page_no">
              <ProgressiveImage
                :src="item.image"
                lazy-placeholder
                :placeholder-src="img_public_42"
                blur="30"
                @click="handleEnterGame(item.id, item.name)"
              />
            </div>
          </template>
        </div>
        <div
          class="flex justify-center"
          :class="mobileWidth < 600 ? 'mt-6 mx-3' : 'mt-8 ml-4'"
        >
          <button
            class="w-full h-10 text-white border border-gray-700 rounded-md"
            v-if="searchedGameCount > 3 && searchedGameCount > 3 * page_no"
            @click="handleMoreGame()"
          >
            <div v-if="!moreLoading">{{ t("home.more") }}</div>
            <div class="flex items-center justify-center" v-else>
              <div
                class="w-2.5 h-2.5 bg-green-400 rounded-full mx-1 animate-expand"
              ></div>
              <div
                class="w-4 h-4 bg-green-400 rounded-full mx-1 animate-expand-reverse"
              ></div>
              <div
                class="w-2.5 h-2.5 bg-green-400 rounded-full mx-1 animate-expand"
              ></div>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="relative h-6 mt-8">
      <p class="ml-3 text-sm font-bold text-white">
        {{ t("home.search_dialog.text_1") }}
      </p>
      <div
        class="absolute w-6 h-6 rounded-full right-3 top-0 shadow-md"
        style="background-color: #1d2027"
        @click="goToNext"
      >
        <img
          src="@/assets/public/svg/icon_public_50.svg"
          class="w-2.5 h-2.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div
        class="absolute w-6 h-6 rounded-full right-11 top-0 shadow-md"
        style="background-color: #1d2027"
        @click="goToPrev"
      >
        <img
          src="@/assets/public/svg/icon_public_51.svg"
          class="w-2.5 h-2.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
    <div class="relative pt-5 pb-4">
      <Swiper
        :modules="modules"
        :slidesPerView="3"
        :spaceBetween="8"
        class="mx-3 h-auto"
        @swiper="getSwiperRef"
      >
        <SwiperSlide
          v-for="(gameItem, index) in recommendedGameList"
          :key="index"
          :virtualIndex="index"
        >
          <img
            :src="gameItem.image"
            class="w-full"
            @click="handleEnterGame(gameItem.id, gameItem.name)"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
