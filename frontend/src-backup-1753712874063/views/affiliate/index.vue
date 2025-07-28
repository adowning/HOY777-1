<script lang="ts" setup>
import Invite from "@/components/affiliate/invite/index.vue";
import MInvite from "@/components/affiliate/invite/mobile/index.vue";
import { appBarStore } from "@/store/appBar";
import { refferalStore } from "@/store/refferal";
import { storeToRefs } from "pinia";
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
// import Statistics from "@/components/affiliate/statistics/index.vue";
// import MStatistics from "@/components/affiliate/statistics/mobile/index.vue";
// import Forms from "@/components/affiliate/forms/index.vue";
// import MForms from "@/components/affiliate/forms/mobile/index.vue";

// const Invite = defineAsyncComponent(
//   () => import("@/components/affiliate/invite/index.vue")
// );
// const MInvite = defineAsyncComponent(
//   () => import("@/components/affiliate/invite/mobile/index.vue")
// );
const Statistics = defineAsyncComponent(
  () => import("@/components/affiliate/statistics/index.vue")
);
const MStatistics = defineAsyncComponent(
  () => import("@/components/affiliate/statistics/mobile/index.vue")
);
const Forms = defineAsyncComponent(
  () => import("@/components/affiliate/forms/index.vue")
);
const MForms = defineAsyncComponent(
  () => import("@/components/affiliate/forms/mobile/index.vue")
);
const Achievement = defineAsyncComponent(
  () => import("@/components/affiliate/achievement/index.vue")
);
const MAchievement = defineAsyncComponent(
  () => import("@/components/affiliate/achievement/mobile/index.vue")
);

const { t } = useI18n();
const mobileWidth = ref<number>(window.innerWidth);

const affiliateWidth = ref<string>("lg:mx-10 lg:px-6 lg:rounded-lg bg-gray-800");
const selectedTabIndex = ref<number>(0);

const loading = ref<boolean>(true);

const rightBarToggle = computed(() => {
  const { getRightBarToggle } = storeToRefs(appBarStore());
  return getRightBarToggle.value;
});

const refferalAppBarShow = computed(() => {
  const { getRefferalAppBarShow } = storeToRefs(refferalStore());
  return getRefferalAppBarShow.value;
});

const updateMobileWidth = () => {
  mobileWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateMobileWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMobileWidth);
});

const tabSelect = (index: number) => {
  selectedTabIndex.value = index;
};

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<template>
  <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div class="flex space-x-2">
      <div class="w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce"></div>
      <div class="w-3.5 h-3.5 bg-green-400 rounded-full animate-bounce"></div>
      <div class="w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce"></div>
    </div>
  </div>
  <div :class="['py-5', mobileWidth > 600 ? 'mx-10 px-6' : 'mx-0', 'bg-gray-800', 'rounded-lg']" v-else>
    <div class="pt-8">
      <div v-if="mobileWidth > 600" class="flex items-center justify-between px-16 py-4 mx-4 mb-4 bg-gray-800 rounded-lg shadow-md">
        <button
          v-for="(tab, index) in [0, 3, 1, 2]"
          :key="index"
          @click="tabSelect(tab)"
          class="px-4 py-2 text-gray-400 transition-colors duration-200"
          :class="{'font-bold text-white': selectedTabIndex === tab}"
        >
          {{ t(`affiliate.tab.text_${tab + 1}`) }}
        </button>
      </div>
      <div v-else class="grid grid-cols-4 gap-1 px-2 py-3 mx-2 mb-2 text-xs text-center bg-gray-800 rounded-lg">
        <button
          v-for="(tab, index) in [0, 3, 1, 2]"
          :key="index"
          @click="tabSelect(tab)"
          class="px-1 py-2 text-gray-400"
          :class="{'font-bold text-white': selectedTabIndex === tab}"
        >
          {{ t(`affiliate.tab.text_${tab + 1}`) }}
        </button>
      </div>
    </div>
    <div class="affiliate-body">
      <div v-if="selectedTabIndex == 0">
        <Invite v-if="mobileWidth > 600" />
        <MInvite v-else />
      </div>
      <div v-if="selectedTabIndex == 1">
        <Statistics v-if="mobileWidth > 600" />
        <MStatistics v-else />
      </div>
      <div v-if="selectedTabIndex == 2">
        <Forms v-if="mobileWidth > 600" />
        <MForms v-else />
      </div>
      <div v-if="selectedTabIndex == 3">
        <Achievement v-if="mobileWidth > 600" />
        <MAchievement v-else />
      </div>
    </div>
  </div>
</template>
