<script lang="ts" setup>
</script>

<template>
  <div class="m-login-container">
    <!-- <LoginHeader v-if="currentPage === PAGE_TYPE.LOGIN_FORM" /> -->
    <div class="m-login-body px-6">
      <div class="my-15 flex justify-center items-center">
        <img src="@/assets/public/image/logo_public_01.png" class="w-21" />
        <div class="ml-2">
          <div class="text-800-16 text-white">
            Sign Up Bonus
          </div>
          <div class="text-900-20 text-white">
            Up to R$500
          </div>
        </div>
      </div>
      <form
        class="full-width relative"
      >
        <div class="relative mt-8">
          <input
            label="Email Address"
            class="form-textfield dark-textfield m-login-email mx-0"
            variant="solo"
            density="comfortable"
          />
          <div class="m-login-mail-card">
            <ul class="dark-list">
              <li
                class="text-600-12 text-white"
              >
                email@gmail.com
              </li>
              <li
                class="text-600-12 text-white"
                >email@hotmail.com</li>
              <li
                class="text-600-12 text-white"
                >email@yahoo.com</li>
              <li
                class="text-600-12 text-white"
                >email@icloud.com</li>
              <li
                class="text-600-12 text-white"
                >email@outlook.com</li>
            </ul>
          </div>
        </div>
        <div class="mt-6 relative pa-0">
          <input
            label="Password"
            class="form-textfield dark-textfield ma-0 m-login-password"
            variant="solo"
            density="comfortable"
            type="password"
          />
          <div class="m-password-icon">
            <img
              src="@/assets/public/svg/icon_public_07.svg"
              class="m-disable-password w-4"
            />
          </div>
          <div class="m-password-icon">
            <img
              src="@/assets/public/svg/icon_public_06.svg"
              class="m-disable-password w-4"
            />
          </div>
        </div>
        <div class="mt-2">
          <p
            class="ml-9 login-forget-passwrod-text text-400-12"
          >
            Forgot Password?
          </p>
        </div>
        <div class="mt-25">
          <button
            class="ma-3 button-bright m-signin-btn-text w-[94%] h-12"
          >
            Sign In
          </button>
        </div>
        <div class="mt-4">
          <p class="m-divide-text">
            or
          </p>
          <hr class="mx-10 border-gray-600" />
        </div>
        <div class="mt-6">
          <div class="w-8/12 offset-2">
            <div
              class="flex justify-around bg-surface-variant social-icon-wrapper"
            >
              <div
                class="rounded"
              >
                <button
                  class="m-social-icon-button w-9 h-9"
                >
                  <img src="" class="w-9" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <!-- Forgot password -->
      <div class="full-width">
        <div class="relative mt-8">
          <input
            label="Email Address"
            class="form-textfield dark-textfield m-login-forgot"
            variant="solo"
            density="comfortable"
          />
          <div class="m-forgot-mail-card">
            <ul class="dark-list">
              <li
                class="text-600-12 text-white"
              >
                email@gmail.com
              </li>
              <li
                class="text-600-12 text-white"
                >email@hotmail.com</li>
              <li
                class="text-600-12 text-white"
                >email@yahoo.com</li>
              <li
                class="text-600-12 text-white"
                >email@icloud.com</li>
              <li
                class="text-600-12 text-white"
                >email@outlook.com</li>
            </ul>
          </div>
        </div>
        <div class="mt-25">
          <button
            class="ma-3 button-bright m-signin-btn-text w-[94%] h-12"
          >
            Submit
          </button>
        </div>
        <div>
          <button
            class="ma-3 m-forgot-back-btn w-[94%] h-12"
          >
            Back
          </button>
        </div>
        <div class="mt-4">
          <p class="m-divide-text">
            or
          </p>
          <hr class="mx-10 border-gray-600" />
        </div>
        <div class="mt-6">
          <div class="w-8/12 offset-2">
            <div
              class="flex justify-around bg-surface-variant social-icon-wrapper"
            >
              <div
                class="rounded"
              >
                <button
                  class="m-social-icon-button w-9 h-9"
                >
                  <img src="" class="w-9" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="m-close-button w-7 h-7"
    >
      <img src="@/assets/public/svg/icon_public_10.svg" />
      <!-- <span class="inline-flex items-center justify-center">
                mdi-close
            </span> -->
    </button>
    <div
    />
  </div>
</template>

<style lang="scss">
.m-forgot-back-btn {
  background: #23262f;
  box-shadow: 0px 4px 6px 1px #0000004d;

  .v-btn__content {
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: #ffffff;
  }
}

.m-login-mail-card {
  position: absolute;
  top: 42px;
  left: 50%;
  transform: translateX(-50%);
  background: #1d2027;
  width: 100%;
  border-radius: 16px;
  z-index: 200;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.m-forgot-mail-card {
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-50%);
  background: #1d2027;
  width: calc(100% - 48px);
  border-radius: 16px;
  z-index: 200;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.v-overlay__content {
  overflow-y: unset !important;
}

.m-signin-btn-text {
  .v-btn__content {
    text-align: center;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-password-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 40px;
}

.m-disable-password {
  position: absolute;
  top: 16px;
  right: 10px;
  cursor: pointer;
}

// container
.m-login-container {
  width: 100%;
  background: $color_1;
  overflow-y: auto;

  .v-field--variant-solo {
    background: transparent !important;
  }
}

// wrapper
.m-login-body {
  // border-radius: 8px 8px 0px 0px;
  // background: var(--bg-2-e-274-c, #1d2027);
  // position: absolute;
  // bottom: 0px;
  // width: 100%;
  // height: 473px;
  // z-index: 2000;
  // overflow-y: auto;

  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

.m-login-body::-webkit-scrollbar {
  width: 0px;
}

.m-login-body-height {
  height: 613px !important;
}

// divider
.m-divide-text {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #414968;
  position: relative;
  top: 12px;
  text-align: center;
  width: 120px;
  background-color: #1d2027;
  margin: auto;
  z-index: 1;
}

// close modal button
.m-close-button {
  box-shadow: none !important;
  background-color: transparent !important;
  position: absolute !important;
  top: -53px;
  right: 5px;
}

// divider
.divide-text {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #23262f;
  position: relative;
  top: 12px;
  text-align: center;
  width: 120px;
  background-color: #2e274c;
  margin: auto;
  z-index: 1;
}

// social icon list component
.social-icon-wrapper {
  background-color: #1d2027 !important;

  .v-sheet {
    border-radius: 50px !important;
  }
}

.m-social-icon-button {
  background-color: #131828 !important;
  width: 36px;
  height: 36px;
}

.login-forget-passwrod-text {
  cursor: pointer;
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #7782aa;
}

.text-large {
  font-size: 32px !important;
}

.m-login-email {
  transform-origin: top !important;

  .v-field__field {
    .v-label.v-field-label {
      font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
      font-size: 12px !important;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #7782aa !important;
      opacity: 1 !important;
    }

    .v-label.v-field-label--floating {
      --v-field-label-scale: 0.88em;
      font-size: 8px !important;
      max-width: 100%;
      color: #7782aa !important;
      opacity: 1 !important;
    }
  }
}

.m-login-password {
  transform-origin: top !important;

  .v-field__field {
    input {
      padding-right: 30px !important;
    }

    .v-label.v-field-label {
      font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
      font-size: 12px !important;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #7782aa !important;
      opacity: 1 !important;
    }

    .v-label.v-field-label--floating {
      --v-field-label-scale: 0.88em;
      font-size: 8px !important;
      max-width: 100%;
      color: #7782aa !important;
      opacity: 1 !important;
    }
  }
}

.m-login-forgot {
  transform-origin: top !important;

  .v-field__field {
    .v-label.v-field-label {
      font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
      font-size: 12px !important;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #7782aa !important;
      opacity: 1 !important;
    }

    .v-label.v-field-label--floating {
      --v-field-label-scale: 0.88em;
      font-size: 8px !important;
      max-width: 100%;
      color: #7782aa !important;
      opacity: 1 !important;
    }
  }
}
</style>
