<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { menuStore } from "@/store/menu";
import { mailStore } from "@/store/mail";
import { appBarStore } from "@/store/appBar";
import icon_public_34 from "@/assets/public/svg/icon_public_34.svg";
import icon_public_40 from "@/assets/public/svg/icon_public_40.svg";
import icon_public_100 from "@/assets/public/svg/icon_public_100.svg";
import icon_public_97 from "@/assets/public/svg/icon_public_97.svg";
import icon_public_94 from "@/assets/public/svg/icon_public_94.svg";
import icon_public_55 from "@/assets/public/svg/icon_public_55.svg";
import { mainStore } from "@/store/main";

const casinoIconColor = ref<string>("#7782AA");
const rewardIconColor = ref<string>("#7782AA");
const sportIconColor = ref<string>("#7782AA");
const promoIconColor = ref<string>("#ffffff");
const searchIconColor = ref<string>("#7782AA");
const mailIconColor = ref<string>("#7782AA");
const scale = ref<number>(1);
const bottom = ref<number>(-48);

// mail count
const mailCount = ref<number>(10);

const { t } = useI18n();
const { name, width } = useDisplay();
const router = useRouter();
const route = useRoute();

const { setSelectedItem } = menuStore();
const { setSemiCircleShow } = menuStore();
const { setRewardNavShow } = menuStore();
const { setMailMenuShow } = mailStore();
const { setMobileMenuMailToggle } = mailStore();
const { setOverlayScrimShow } = appBarStore();
const { setMainBlurEffectShow } = appBarStore();
const { setSearchDialogShow } = mainStore();

const selectedItem = computed(() => {
  const { getSelectedItem } = storeToRefs(menuStore());
  return getSelectedItem.value;
});

const semiCircleShow = computed(() => {
  const { getSemiCircleShow } = storeToRefs(menuStore());
  return getSemiCircleShow.value;
});

watch(selectedItem, (newValue) => {
  switch (newValue) {
    case t("mobile_menu.promo"):
      promoIconColor.value = "#ffffff";
      searchIconColor.value = "#7782AA";
      mailIconColor.value = "#7782AA";
      break;
    case t("mobile_menu.search"):
      promoIconColor.value = "#7782AA";
      searchIconColor.value = "#ffffff";
      mailIconColor.value = "#7782AA";
      break;
    case t("mobile_menu.mail"):
      promoIconColor.value = "#7782AA";
      searchIconColor.value = "#7782AA";
      mailIconColor.value = "#ffffff";
      break;
  }
});

watch(semiCircleShow, (value) => {
  if (value) {
    bottom.value = 48;
  } else {
    bottom.value = -48;
  }
});

const casinoSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", casinoIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", casinoIconColor.value);
    }
  }
  return el;
};

const searchSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", searchIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", searchIconColor.value);
    }
  }
  return el;
};

const promoSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", promoIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", promoIconColor.value);
      for (let moreSubNode of subNode.children) {
        moreSubNode.setAttribute("fill", promoIconColor.value);
      }
    }
  }
  return el;
};

const rewardSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", rewardIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", rewardIconColor.value);
    }
  }
  return el;
};

const sportSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", sportIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", sportIconColor.value);
    }
  }
  return el;
};

const mailSvgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", mailIconColor.value);
    for (let subNode of node.children) {
      subNode.setAttribute("fill", mailIconColor.value);
    }
  }
  return el;
};

const handleSelectItem = (item: string) => {
  setSelectedItem(item);
  setSemiCircleShow(false);
  bottom.value = -48;
  if (item == t("mobile_menu.promo")) {
    router.push({ name: "Promo" });
    setRewardNavShow(false);
    setOverlayScrimShow(false);
    setMainBlurEffectShow(false);
    setMailMenuShow(false);
  } else if (item == t("mobile_menu.search")) {
    setSearchDialogShow(true);
  } else if (item == t("mobile_menu.mail")) {
    setMobileMenuMailToggle(true);
  }
};

const handleWindowScroll = () => {
  setSemiCircleShow(false);
  bottom.value = -48;
};

watch(route, (to, from) => {
  setSemiCircleShow(false);
  bottom.value = -48;
});

onMounted(() => {
  window.addEventListener("scroll", handleWindowScroll);
});
</script>

<template>
  <div
    class="w-44 h-22 fixed left-1/2 z-14 rounded-t-full transition-all duration-100"
    style="background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px)"
    :style="{ transform: `translateX(-50%)`, bottom: `${bottom}px` }"
    v-if="route.name !== 'Sports'"
  >
    <div
      class="absolute flex flex-col items-center top-8 left-4"
      @click="handleSelectItem(t('mobile_menu.promo'))"
    >
      <div class="relative h-5">
        <inline-svg
          :src="icon_public_97"
          width="22"
          height="22"
          :transform-source="promoSvgTransform"
        ></inline-svg>
        <p
          class="absolute -top-px -right-1 text-xs font-extrabold text-black bg-green-400 rounded-full px-1"
        >
          {{ mailCount }}
        </p>
      </div>
      <div
        class="text-xs font-semibold"
        :class="selectedItem == t('mobile_menu.promo') ? 'text-white' : 'text-gray-400'"
      >
        {{ t("mobile_menu.promo") }}
      </div>
    </div>
    <div
      class="absolute flex flex-col items-center top-8 right-6"
      @click="handleSelectItem(t('mobile_menu.mail'))"
    >
      <div class="relative h-5">
        <inline-svg
          :src="icon_public_55"
          width="22"
          height="22"
          :transform-source="mailSvgTransform"
        ></inline-svg>
        <p
          class="absolute -top-px -right-1 text-xs font-extrabold text-black bg-green-400 rounded-full px-1"
        >
          {{ mailCount }}
        </p>
      </div>
      <div
        class="text-xs font-semibold"
        :class="selectedItem == t('mobile_menu.mail') ? 'text-white' : 'text-gray-400'"
      >
        {{ t("mobile_menu.mail") }}
      </div>
    </div>
    <div
      class="absolute flex flex-col items-center top-2 left-1/2 -translate-x-1/2"
      @click="handleSelectItem(t('mobile_menu.search'))"
    >
      <inline-svg
        :src="icon_public_94"
        width="22"
        height="22"
        :transform-source="searchSvgTransform"
      ></inline-svg>
      <div
        class="text-xs font-semibold"
        :class="selectedItem == t('mobile_menu.search') ? 'text-white' : 'text-gray-400'"
      >
        {{ t("mobile_menu.search") }}
      </div>
    </div>
  </div>
</template>
