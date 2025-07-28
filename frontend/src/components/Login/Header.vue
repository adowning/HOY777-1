<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const LoginHeader = defineComponent({
  setup() {
    const { t } = useI18n();
    const { name } = useDisplay();

    const currentLanguage = computed((): string => localStorage.getItem("lang") || "en");

    const mobileVersion = computed(() => {
      return name.value;
    });

    return {
      t,
      currentLanguage,
      mobileVersion,
    };
  },
});

export default LoginHeader;
</script>

<template>
  <div
    class="relative z-10 h-47 m-0 rounded-t-2xl"
    style="background: linear-gradient(0deg, #275798 0%, #9419f0 100%)"
  >
    <p
      class="absolute top-14 left-66 z-20 text-black font-bold text-lg leading-5"
    >
      <span :class="currentLanguage === 'en' ? 'ml-0' : 'ml-8'">
        {{ t("login.formPage.header.titleLine1") }}
      </span>
      <br />
      <span :class="currentLanguage === 'en' ? 'ml-0' : 'ml-6'">
        {{ t("login.formPage.header.titleLine2") }}
      </span>
    </p>
    <img
      src="@/assets/login/image/img_li_01.png"
      class="absolute visible top-5 left-2 z-30"
    />
    <img src="@/assets/login/image/img_li_02.png" class="absolute top-5 left-2" />
    <img src="@/assets/login/image/img_li_03.png" class="absolute left-2 top-5" />
    <img src="@/assets/login/image/img_li_04.png" class="absolute left-61 top-2" />
    <img src="@/assets/login/image/img_li_05.png" class="absolute left-63 top-11" />
  </div>
</template>
