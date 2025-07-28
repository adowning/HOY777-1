
<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';

const emit = defineEmits<{ (e: 'promotionDialogHide'): void }>()

const loading = ref<boolean>(false);

const submitPromotion = async () => {
    loading.value = true;
    emit('promotionDialogHide')
}

</script>

<template>
  <div class="promotion-dialog-container">
      <div class="flex flex-wrap -mx-2 mx-10 mt-10 text-700-14 text-gray">
          <p class="text-center" style="width: 100%">
              Not participating in promotional activities
          </p>
      </div>
      <div class="flex flex-wrap -mx-2 mx-10 mt-16 text-700-14">
          <div class="promotion-confirm-btn">
              <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 button-bright text-none" width="-webkit-fill-available" height="40px" click="submitPromotion" loading="loading">
                  Ok
              </button>
          </div>
          <div class="promotion-cancel-btn ml-2">
              <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 button-bright text-none" width="-webkit-fill-available" height="40px" click="emit('promotionDialogHide')">
                  Cancel
              </button>
          </div>
      </div>
  </div>
</template>


<style lang="scss">
// container
.promotion-dialog-container {
    background-color: #15161C;
    border-radius: 16px !important;
    height: 220px;
}

.promotion-confirm-btn {
    margin-left: auto;
    margin-right: auto;
    // button
    button {
        border-radius: 26px !important;

        .v-btn__content {
            font-weight: 700;
            font-size: 14px;
        }
    }
}

.promotion-cancel-btn {
    margin-left: auto;
    margin-right: auto;
    // button
    button {
        background: #23262F !important;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);
        border-radius: 26px;


        .v-btn__content {
            font-weight: 700;
            font-size: 14px;
            color: #FFFFFF;
        }
    }
}
</style>
