<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { width } = useDisplay();

const mobileWidth = computed(() => {
  return width.value;
});
</script>
<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden invite-footer-card-bg mt-5 mx-3 pa-3 py-5">
    <div class="flex flex-wrap -mx-2 mx-1 align-center">
      <div class="w-full px-2 md:w-6/12 md:ml-6/12 lg:w-6/12 lg:ml-6/12">
        <div class="mt-4 text-800-12 white">
          {{ t("affiliate.invite.invite_text_9") }}
        </div>
        <div class="mt-4 text-500-12 white">
          {{ t("affiliate.invite.invite_text_10") }}
        </div>
        <div class="mt-4 text-800-12 color-1ACB51">
          {{ t("affiliate.invite.invite_text_11") }}
        </div>
        <div class="mt-4 text-500-12 white">
          {{ t("affiliate.invite.invite_text_12") }}
        </div>
      </div>
      <div class="w-full px-2 d-flex align-center justify-center md:w-6/12 md:ml-6/12 lg:w-6/12 lg:ml-6/12">
        <img
          src="@/assets/affiliate/invite/image/img_agent_03.png"
          class="mt-4 m-invite-img-3"
          width="281"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
