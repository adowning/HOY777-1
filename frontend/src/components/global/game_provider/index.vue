<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { useRouter, useRoute } from "vue-router";
import { gameStore } from "@/store/game";
import { storeToRefs } from "pinia";
import img_gp_01 from "@/assets/home/image/img_gp_01.png";

const { t } = useI18n();
const { width } = useDisplay();
const router = useRouter();
const route = useRoute();
const { dispatchGameCategories } = gameStore();

// const gameProviders = ref<Array<string>>([
//   new URL("@/assets/home/image/img_gp_01.png", import.meta.url).href,
//   new URL("@/assets/home/image/img_gp_02.png", import.meta.url).href,
//   new URL("@/assets/home/image/img_gp_03.png", import.meta.url).href,
//   new URL("@/assets/home/image/img_gp_04.png", import.meta.url).href,
//   new URL("@/assets/home/image/img_gp_05.png", import.meta.url).href,
//   new URL("@/assets/home/image/img_gp_06.png", import.meta.url).href,
//   new URL("@/assets/home/image/img_gp_7.png", import.meta.url).href,
// ]);

const mobileWidth = computed(() => {
  return width.value;
});

const gameProviders = computed(() => {
  const { getGameProviders } = storeToRefs(gameStore());
  // getGameProviders.value.map((item) => {
  //   item.pictures = img_gp_01;
  // });
  return getGameProviders.value;
});

const handleGameProviderPage = (slug: string) => {
  router.push({ name: "Provider", query: { slug: slug } });
};

watch(route, async (to, from) => {
  await dispatchGameCategories("?type=providers");
});

onMounted(async () => {
  await dispatchGameCategories("?type=providers");
});
</script>

<template>
  <!-------------------- game providers -------------->
  <div
    class="mb-4 text-white"
    :class="[
      mobileWidth < 600
        ? 'mx-2 mt-8 text-base font-extrabold'
        : 'mx-4 mt-6 text-2xl font-bold',
    ]"
  >
    {{ t("home.game_providers") }}
  </div>
  <div class="ml-4 mr-2 mt-2 flex" v-if="mobileWidth > 600">
    <div
      class="flex-[0_0_14.2857%] max-w-[14.2857%] pr-2"
      v-for="(item, index) in gameProviders"
      :key="index"
    >
      <img
        :src="item.pictures"
        class="max-w-[160px] w-full cursor-pointer"
      />
    </div>
  </div>
  <div class="ma-2" v-else>
    <div class="overflow-x-auto whitespace-nowrap">
      <div
        v-for="(gameProviderItem, gameProviderIndex) in gameProviders"
        :key="gameProviderIndex"
        class="inline-block"
      >
        <img
          :src="gameProviderItem.pictures"
          width="126"
          height="49"
          class="mr-5"
          @click="handleGameProviderPage(gameProviderItem.slug)"
        />
      </div>
    </div>
  </div>
</template>
