<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits<{ (e: "promotionDialogHide", type: string): void }>();

const loading = ref<boolean>(false);

const submitPromotion = async () => {
  loading.value = true;
  emit("promotionDialogHide", "ok");
};
</script>

<template>
  <div class="m-promotion-dialog-container">
    <div class="flex flex-wrap -mx-2 mx-4 mt-10 text-700-12 text-gray">
      <p class="text-center" style="width: 100%">
        Not participating in promotional activities
      </p>
    </div>
    <div class="flex flex-wrap -mx-2 mx-10 mt-12 text-700-14">
      <div class="m-promotion-confirm-btn">
        <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 button-bright text-none" height="40" width="88" click="submitPromotion" loading="loading">
          Ok
        </button>
      </div>
      <div class="m-promotion-cancel-btn ml-auto">
        <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 button-bright text-none" height="40" width="88" click="emit('promotionDialogHide', 'cancel')">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-promotion-dialog-container {
  background-color: #1D2027;
  border-radius: 16px !important;
  height: 173px;
}

.m-promotion-confirm-btn {
  // button
  button {
    border-radius: 8px !important;

    .v-btn__content {
      font-weight: 700;
      font-size: 10px;
    }
  }
}

.m-promotion-cancel-btn {
  // button
  button {
    background: #23262F !important;
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
    border-radius: 26px;

    .v-btn__content {
      font-weight: 700;
      font-size: 10px;
      color: #ffffff;
    }
  }
}
</style>
