<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { width } = useDisplay();

const slider = ref<number>(0);
const min = 0;
const max = 101;

const mobileWidth = computed(() => {
  return width.value;
});

watch(slider, (newValue) => {
  if (slider.value > 97) {
    slider.value = 97;
  }
});
</script>
<template>
  <div class="flex flex-wrap -mx-2 mt-4 justify-center px-10">
    <div class="text-400-12 gray text-center">
      {{ t("affiliate.invite.commission_content_text") }}
    </div>
  </div>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden invite-right-card-bg mt-5 mx-3 pa-3 py-5">
    <div class="flex flex-wrap -mx-2 mx-0">
      <div class="w-full px-2 md:w-6/12 md:ml-6/12 lg:w-6/12 lg:ml-6/12">
        <div class="text-700-14 white">{{ t("affiliate.invite.invite_text_1") }}</div>
        <div class="text-400-12 white mt-4">
          {{ t("affiliate.invite.invite_text_2") }}
        </div>
        <div class="text-400-12 white mt-4">
          <span>{{ t("affiliate.invite.invite_text_3_1") }}</span>
          <Font color="#F9BC01" class="text-900-12">30 %</Font>
          <span>{{ t("affiliate.invite.invite_text_3_2") }}</span>
        </div>
        <div class="text-400-12 white mt-4">
          <span>{{ t("affiliate.invite.invite_text_4_1") }}</span>
          <Font color="#F9BC01" class="text-900-12">30 %</Font>
          <span>{{ t("affiliate.invite.invite_text_4_2") }}</span>
        </div>
        <div class="text-400-12 white mt-4">
          <span>{{ t("affiliate.invite.invite_text_5_1") }}</span>
          <Font color="#F9BC01" class="text-900-12">30 %</Font>
          <span>{{ t("affiliate.invite.invite_text_5_2") }}</span>
        </div>
        <img
          src="@/assets/affiliate/invite/image/img_agent_19.png"
          class="mt-6"
          style="width: 100%; max-width: 630px"
        />
      </div>
      <div class="w-full px-2 text-center md:w-6/12 md:ml-6/12 lg:w-6/12 lg:ml-6/12">
        <img
          src="@/assets/affiliate/invite/image/img_agent_02.png"
          class="mt-1"
          style="width: 80%; max-width: 410px"
        />
        <div class="m-footer-body-bg">
          <div class="text-700-12 white pt-4">
            {{ t("affiliate.invite.invite_text_6") }}
          </div>
          <div class="footer-body-cash-text pt-2" style="font-size: 26px">
            R$ {{ Math.ceil(slider) }}
          </div>
          <div class="text-400-10 gray mx-2">
            <span>{{ t("affiliate.invite.invite_text_7") }}</span>
            <Font color="#F9BC01" class="text-800-10">{{ Math.ceil(slider) }}</Font>
            <span>{{ t("affiliate.invite.invite_text_8") }}</span>
          </div>
          <div class="mx-2 py-3">
            <v-slider
              v-model="slider"
              color="#009B3A"
              class="align-center"
              rounded="rounded-xl"
              :max="max"
              :min="min"
              hide-details
            >
            </v-slider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
