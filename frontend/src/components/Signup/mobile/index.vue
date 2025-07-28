<script lang="ts" setup>
import ValidationBox from "@/components/Signup/ValidationBox.vue";
</script>

<template>
  <div class="m-signup-container">
    <!-- <SignupHeader v-if="currentPage !== PAGE_TYPE.DISPLAY_NAME" /> -->
    <div class="m-signup-body px-6">
      <div class="my-15 flex justify-center items-center">
        <img src="@/assets/public/image/logo_public_01.png" width="86" />
        <div class="ml-2">
          <div class="text-800-16 white">
            Sign Up Bonus
          </div>
          <div class="text-900-20 white">
            Up to R$500
          </div>
        </div>
      </div>
      <form
        class="full-width"
      >
        <div class="relative mt-10 pa-0">
          <input
            label="Email Address"
            class="form-textfield dark-textfield ma-0 m-text-field m-signup-email"
            variant="solo"
            density="comfortable"
          />
          <ValidationBox
          />
          <div class="m-register-mail-card">
            <ul class="dark-list">
              <li
                class="text-600-12 white"
              >
                email@gmail.com
              </li>
              <li
                class="text-600-12 white"
                >email@hotmail.com</li>
              <li
                class="text-600-12 white"
                >email@yahoo.com</li>
              <li
                class="text-600-12 white"
                >email@icloud.com</li>
              <li
                class="text-600-12 white"
                >email@outlook.com</li>
            </ul>
          </div>
        </div>
        <div class="mt-6 relative pa-0">
          <input
            label="Password"
            class="form-textfield dark-textfield ma-0 m-signup-password"
            variant="solo"
            density="comfortable"
            type="password"
          />
          <img
            src="@/assets/public/svg/icon_public_07.svg"
            class="m-disable-password"
            width="16"
          />
          <img
            src="@/assets/public/svg/icon_public_06.svg"
            class="m-disable-password"
            width="16"
          />
          <ValidationBox
          />
        </div>
        <div class="mt-2">
          <input
            label="Promo Code"
            class="form-textfield normal-textfield m-signup-promo"
            variant="solo"
            density="comfortable"
          />
        </div>
        <div class="mt-2" style="display: flex; align-items: center; height: 46px">
          <input
            type="checkbox"
            hide-details
            class="m-agreement-checkbox"
            style="margin-bottom: 20px"
          />
          <p class="text-600-12 gray ml-1">
            I am 18 years of age or older and I have read, accept and agree to the
            <span class="white pointer">
              Terms and Conditions.
            </span>
          </p>
        </div>
        <div>
          <button
            class="mt-8 mx-3 m-signup-btn w-[94%] h-12"
          >
            Sign Up
          </button>
        </div>
        <div class="mt-6">
          <p class="m-divide-text">
            or
          </p>
          <hr class="mx-10" style="border: 1px solid #414968 !important" />
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
                  class="m-social-icon-button h-9 w-9"
                >
                  <img src="" width="36" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <!-- Confirm cancel. -->
      <div class="full-width">
        <div style="margin-top: 100px" class="mx-4">
          <p class="text-700-20 white center full-width">
            Are you sure you want to cancel?
          </p>
        </div>
        <div class="mt-7">
          <p class="text-400-14 slate-gray center full-width">
            If you cancel, your information will not be saved.
          </p>
        </div>
        <div style="margin-top: 100px">
          <button
            class="ma-3 button-bright m-signup-continue-btn w-[94%] h-12"
          >
            Continue
          </button>
        </div>
        <div class="mt-4">
          <button
            class="ma-3 button-dark m-signup-cancel-btn w-[94%] h-12"
          >
            Cancel
          </button>
        </div>
      </div>

      <!-- Already registered notification -->
      <div class="full-width">
        <div>
          <p class="m-label-text-md slate-gray center full-width px-8">
            This email address is already registered. Please go to the login page.
          </p>
        </div>
        <div style="margin-top: 126px">
          <button
            class="ma-3 button-bright m-signup-confirm-btn w-full h-12"
          >
            Confirm
          </button>
        </div>
        <div class="mt-4">
          <button
            class="ma-3 button-dark m-signup-cancel-btn w-full h-12"
          >
            Cancel
          </button>
        </div>
      </div>

      <!-- Enter avatar and display name -->
      <div class="full-width">
        <div class="carousel-container ml-0">
          <div class="carousel">
            <div>
              <button
                class="button-carousel ma-2"
              ></button>
            </div>
            <div>
              <button
                class="button-carousel ma-2"
              ></button>
            </div>
            <div>
              <img src="" width="123" style="margin-top: 20px" />
            </div>
          </div>
        </div>
        <div class="mt-4 mb-2">
          <p class="text-700-16 white full-width center">
            Choose your avatar and display name
          </p>
        </div>
        <div class="mt-4 relative m-display-name-input">
          <input
            label="Username"
            class="form-textfield dark-textfield"
            variant="solo"
            density="comfortable"
          />
          <ValidationBox
          />
        </div>
        <div>
          <button
            class="ma-3 mt-8 mb-8 button-bright m-signup-confirm-btn w-full h-12"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <button
      class="m-close-button"
      style="top: -53px; visibility: hidden"
    >
      <img src="@/assets/public/svg/icon_public_10.svg" />
      <!-- <v-icon :color="currentPage === PAGE_TYPE.DISPLAY_NAME ? '#7782AA' : '#FFFFFF'">
                mdi-close
            </v-icon> -->
    </button>
  </div>
  <!-- <Notification
    :notificationShow="notificationShow"
    :notificationText="notificationText"
    :checkIcon="checkIcon"
  /> -->
</template>

<style lang="scss">
@media (max-width: 600px) {
  .v-field__field {
    color: var(--sec-text-7782-aa, #7782aa);
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 40px;

    input {
      padding-top: 6px !important;
      font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .v-label.v-field-label {
      font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .v-label.v-field-label--floating {
      --v-field-label-scale: 0.88em;
      font-size: var(--v-field-label-scale);
      max-width: 100%;
    }
  }

  .v-input__control {
    .mdi:before {
      // font-size: 23px !important;
    }
  }

  .v-list-item--density-default.v-list-item--one-line {
    min-height: 42px !important;
  }
}

.m-label-text-md {
  margin-top: 80px;
  font-weight: 600;
  font-size: 16px;
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
}

.m-signup-continue-btn {
  .v-btn__content {
    color: var(--text-dark-black, white);
    text-align: center;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
}

.m-signup-confirm-btn {
  .v-btn__content {
    text-align: center;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-signup-cancel-btn {
  .v-btn__content {
    color: var(--text-dark-black, #fff);
    text-align: center;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-register-mail-card {
  position: absolute;
  top: 43px;
  left: 50%;
  transform: translateX(-50%);
  background: #1d2027;
  width: 100%;
  border-radius: 16px;
  z-index: 200;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.m-signup-btn {
  background: #009b3a;
  color: white;
  border-radius: 8px !important;
  .v-btn__content {
    text-align: center;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-signup-btn:hover:enabled {
  background: #009b3a;
}

.m-signup-disabled-btn {
  border-radius: 8px;
  background: var(--Secondary-Button, #23262f);
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21);

  .v-btn__content {
    color: #ffffff;
    text-align: center;
    font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.m-disable-password {
  position: absolute;
  top: 16px;
  right: 10px;
  cursor: pointer;
}

// mobile dialog contaier
.m-signup-container {
  height: 100vh;
  width: 100%;
  background: $color_1;
  overflow-y: auto;

  .v-field--variant-solo {
    background: transparent !important;
  }
}

.m-signup-container::-webkit-scrollbar {
  width: 0px;
}

// wrapper
.m-signup-body {
  // border-radius: 8px 8px 0px 0px;
  // background: var(--bg-2-e-274-c, #1d2027);
  // position: absolute;
  // bottom: 0px;
  // width: 100%;
  // height: 464px;
  // z-index: 99;

  // overflow-y: auto;
  .form-textfield div.v-field__field {
    background: #15161c;
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

.m-display-name-input {
  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

.m-signup-body::-webkit-scrollbar {
  width: 0px;
}

// close modal button
.m-close-button {
  box-shadow: none !important;
  background-color: transparent !important;
  position: absolute !important;
  top: 9px;
  right: 12px;
}

.m-close-button-1 {
  box-shadow: none !important;
  background-color: transparent !important;
  position: absolute !important;
  top: 160px;
  right: 12px;
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

// ask signin text
.signin-text {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  text-align: right;
}

.signin-text2 {
  cursor: pointer;
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #009b3a;
}

// agreement
.agreement-text {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin-top: 13px;
  color: #7782aa;
}

.m-agreement-checkbox {
  i.v-icon {
    color: #15161c;
    background-color: #01983a;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    margin-top: 4px;
  }

  i.mdi-checkbox-blank-outline {
    background-color: #1d2027;
    box-shadow: inset 1px 0px 2px 1px rgba(0, 0, 0, 0.11);
    border-radius: 4px;
  }
}

// carousel
.carousel-container {
  width: 100%;
}

.m-signup-email {
  transform-origin: top !important;

  .v-field__field {
    input {
      padding-top: 2px !important;
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

.m-signup-password {
  transform-origin: top !important;

  .v-field__field {
    input {
      padding-top: 2px !important;
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

.m-signup-promo {
  transform-origin: top !important;

  .v-field__field {
    background: #15161c;
    input {
      padding-top: 2px !important;
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
</style>
