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
  <div class="flex flex-wrap -mx-2 [mobileWidth < 600 ? 'mx-2 mt-8 text-800-16' : 'mx-4 mt-6 text-700-22']">
    {{ t("home.game_providers") }}
  </div>
  <div class="flex flex-wrap -mx-2 ml-4 mr-2 mt-2" v-if mobileWidth> 600">
    <div
      style="flex: 0 0 14.2857%; max-width: 14.2857%; padding-right: 8px"
      v-ripple.center
      v-for="(item, index) in gameProviders"
      :key="index"
    >
      <img :src="item.pictures" class="game-provider-img-width" />
    </div>
  </div>
  <div class="flex flex-wrap -mx-2 ma-2" v-else>
    <div class="flex items-center overflow-x-auto py-2 space-x-4">
      <div class="flex-shrink-0 cursor-pointer" v-for="(gameProviderItem, gameProviderIndex) in gameProviders" key="gameProviderIndex">
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

<style lang="scss">
.game-provider-img-width {
  max-width: 160px !important;
  width: 100%;
  cursor: pointer;
}
@media (max-width: 600px) {
  .v-slide-group__prev {
    display: none !important;
  }
  .v-slide-group__next {
    display: none !important;
  }
}
</style>
