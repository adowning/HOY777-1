<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="m-signup-header-container">
    <div class="pl-10 pt-9">
      <div>
        <p class="m-logo-text2 white">
          {{ t("signup.formPage.header.titleLine1") }}
          <br />
          {{ t("signup.formPage.header.titleLine2") }}
        </p>
      </div>
    </div>
    <img src="@/assets/public/image/logo_public_01.png" class="m-logo-image" width="80" />
    <img src="@/assets/login/image/img_su_01.png" class="m-coin-image" />
  </div>
</template>

<style lang="scss">
.m-signup-header-container {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 172px;
  border-radius: 8px 8px 0px 0px;
  margin: 0px !important;
  background: linear-gradient(0deg, #0b123a 0%, #66ff63 100%), #5904d9;

  .v-col {
    z-index: 1;
  }

  img.m-bg-image {
    position: absolute;
    width: 100%;
    height: 187px;
    z-index: 0;
    border-radius: 38px 38px 0px 0px;
  }

  img.m-logo-image {
    position: absolute;
    top: 22px;
    left: 18px;
  }

  img.m-coin-image {
    position: absolute;
    top: -14px;
    right: 0px;
    width: 258px;
    height: 169px;
  }

  .signup-logo-title-1-position {
    position: absolute;
    top: 25px;
    left: 70px;
  }

  .signup-logo-title-2-position {
    position: absolute;
    top: 25px;
    left: 130px;
  }
}

.logo-text {
  font-family: "Bauhaus 93";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 41px;
  text-shadow: #522a59 0px 2px 0px;
}

.m-logo-text2 {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: normal;
  margin-top: 70px;
}
</style>
