<script lang="ts" setup>
import { onMounted, toRefs } from "vue";
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps<{ length: number }>();

const emit = defineEmits<{
  (e: "handlePrev", pageNo: number): void;
  (e: "handleNext", pageNo: number): void;
}>();

const { length } = toRefs(props);

const pageNo = ref(1);
const { width } = useDisplay();

const totalVisible = ref<number>(3);

const mobileWidth = computed(() => {
  return width.value;
});

const handlePrev = () => {
  if (pageNo.value > 1) {
    pageNo.value--;
    emit("handlePrev", pageNo.value);
  }
};

const handleNext = () => {
  if (pageNo.value < length.value) {
    pageNo.value++;
    emit("handleNext", pageNo.value);
  }
};

onMounted(() => {
  if (mobileWidth.value > 600) {
    totalVisible.value = 3;
  } else {
    totalVisible.value = 1;
  }
});
</script>
<template>
  <div class="flex items-center">
    <button
      @click="handlePrev"
      class="w-8 h-8 mx-1.5 rounded-md text-white shadow-md"
      style="background-color: var(--agent-color-3)"
    >
      <img src="@/assets/public/svg/icon_public_51.svg" class="w-4 h-4 mx-auto" />
    </button>
    <div v-for="i in Math.min(totalVisible, length)" :key="i" class="flex items-center">
      <button
        v-if="pageNo + i - 2 > 0 && pageNo + i - 2 <= length"
        @click="pageNo = pageNo + i - 2"
        class="w-8 h-8 mx-1.5 rounded-md text-white text-base font-semibold shadow-md"
        :class="{
          'bg-gray-700': pageNo !== pageNo + i - 2,
          'bg-blue-500': pageNo === pageNo + i - 2,
        }"
        style="background-color: var(--agent-card-bar-bg)"
      >
        {{ pageNo + i - 2 }}
      </button>
    </div>
    <button
      @click="handleNext"
      class="w-8 h-8 mx-1.5 rounded-md text-white shadow-md"
      style="background-color: var(--agent-color-3)"
    >
      <img src="@/assets/public/svg/icon_public_50.svg" class="w-4 h-4 mx-auto" />
    </button>
  </div>
</template>
