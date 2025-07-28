
<script lang="ts" setup>
import { toRefs } from "vue";
import { ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
const { t } = useI18n();
const { width } = useDisplay();
const snackbar = ref<boolean>(false);
const props = defineProps<{
  notificationShow: boolean;
  notificationText: string;
  checkIcon: any;
}>();
const { notificationShow, notificationText, checkIcon } = toRefs(props);
watch(notificationShow, (newValue) => {
  snackbar.value = true;
});
const mobileWidth = computed(() => {
  return width.value;
});
</script>

<template>
  <div
    v-if="snackbar"
    class="fixed z-50 transition-all duration-300"
    :class="{
      'w-60 bottom-4/5 right-[-209px]': mobileWidth > 600,
      'w-60 top-16 right-[-224px] h-15': mobileWidth <= 600,
    }"
    style="background-color: #181522"
  >
    <div class="flex items-center p-2">
      <img :src="checkIcon" class="mx-4" />
      <p class="text-sm text-gray-400 w-58">{{ notificationText }}</p>
      <button
        class="absolute top-1 right-1"
        @click="snackbar = false"
      >
        <img
          v-if="mobileWidth > 600"
          src="@/assets/public/svg/icon_public_52.svg"
          class="w-4"
        />
        <img
          v-else
          src="@/assets/public/svg/icon_public_52.svg"
          class="w-4"
        />
      </button>
    </div>
  </div>
</template>