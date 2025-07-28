<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import LoginHeader from "./Header.vue";
import { authStore } from "@/store/auth";
import { userStore } from "@/store/user";
import Notification from "@/components/global/notification/index.vue";
import { ElNotification } from "element-plus";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
import { socketStore } from "@/store/socket";
import { vipStore } from "@/store/vip";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { gameStore } from "@/store/game";
import { bannerStore } from "@/store/banner";
import { currencyStore } from "@/store/currency";

const Login = defineComponent({
  components: {
    LoginHeader,
    Notification,
  },
  emits: ["close", "switch"],
  setup(props, { emit }) {
    // translation
    const { t } = useI18n();
    const { dispatchSignIn } = authStore();
    const { dispatchUserProfile } = authStore();
    const { setAuthModalType } = authStore();
    const { setToken } = authStore();
    const { dispatchUserBalance } = userStore();
    const { dispatchCurrencyList } = currencyStore();
    const { dispatchSocketConnect } = socketStore();
    const { dispatchVipInfo } = vipStore();
    const { dispatchVipLevels } = vipStore();
    const route = useRoute();
    const { dispatchGameEnter, getGameBetbyInit, closeKill } = gameStore();

    // initiate component state
    const state = reactive({
      currentPage: 0, // default login form
      PAGE_TYPE: {
        LOGIN_FORM: 0,
        FORGOT_PASSWORD: 1,
      },
      formData: {
        emailAddress: "",
        password: "",
      },
      socialIconList: [
        new URL("@/assets/public/svg/icon_public_28.svg", import.meta.url).href,
        new URL("@/assets/public/svg/icon_public_29.svg", import.meta.url).href,
        new URL("@/assets/public/svg/icon_public_30.svg", import.meta.url).href,
        new URL("@/assets/public/svg/icon_public_31.svg", import.meta.url).href,
      ],
      isShowPassword: false,
      notificationShow: false,
      checkIcon: new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href,
      notificationText: t("login.forgotPasswordPage.notification"),
      loading: false,
      mailCardHeight: 0,
      emailPartName: "",
    });

    // computed variables
    const isFormDataReady = computed(
      (): boolean =>
        state.formData.emailAddress.length > 0 && state.formData.password.length > 0
    );

    // flag when login successed
    const success = computed(() => {
      const { getSuccess } = storeToRefs(authStore());
      return getSuccess.value;
    });

    // error message when login failed

    const errMessage = computed(() => {
      const { getErrMessage } = storeToRefs(authStore());
      return getErrMessage.value;
    });

    // forgot password function when password fogot

    const handleForgotPassword = () => {
      // state.notificationShow = !state.notificationShow;
      // state.checkIcon = new URL(
      //   "@/assets/public/svg/icon_public_18.svg",
      //   import.meta.url
      // ).href;
      // state.notificationText = t("login.forgotPasswordPage.notification");

      const toast = useToast();
      toast.success(t("login.forgotPasswordPage.notification"), {
        timeout: 3000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: SuccessIcon,
        rtl: false,
      });
      state.currentPage = state.PAGE_TYPE.LOGIN_FORM;
    };

    // methods
    const handleLoginFormSubmit = async () => {
      state.loading = true;

      // setToken("token");
      // state.notificationShow = !state.notificationShow;
      // state.checkIcon = new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href
      // state.notificationText = t('login.submit_result.success_text')
      // setTimeout(() => {
      //     setAuthModalType("");
      //     emit('close');
      // }, 1000)

      await dispatchSignIn({
        uid: state.formData.emailAddress,
        password: state.formData.password,
      });
      if (success.value) {
        await dispatchUserProfile();
        await dispatchUserBalance();
        await dispatchCurrencyList();
        await dispatchVipInfo();
        await dispatchVipLevels();
        // await dispatchSocketConnect();
        // state.notificationShow = !state.notificationShow;
        // state.checkIcon = new URL(
        //   "@/assets/public/svg/icon_public_18.svg",
        //   import.meta.url
        // ).href;
        // state.notificationText = t("login.submit_result.success_text");
        if (route.name == "Sports") {
          await closeKill();
          // await dispatchGameEnter({ id: '9999', demo: false });
          await getGameBetbyInit();
        }
        const toast = useToast();
        toast.success(t("login.submit_result.success_text"), {
          timeout: 3000,
          closeOnClick: false,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          draggable: false,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: SuccessIcon,
          rtl: false,
        });
        setTimeout(() => {
          setAuthModalType("");
          emit("close");
        }, 1000);
        await dispatchSocketConnect();
      } else {
        // state.notificationShow = !state.notificationShow;
        // state.checkIcon = new URL(
        //   "@/assets/public/svg/icon_public_17.svg",
        //   import.meta.url
        // ).href;
        // state.notificationText = t("login.submit_result.err_text");

        const toast = useToast();
        toast.success(t("login.submit_result.err_text"), {
          timeout: 3000,
          closeOnClick: false,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          draggable: false,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: WarningIcon,
          rtl: false,
        });
      }

      state.loading = false;
    };

    const showPassword = () => {
      state.isShowPassword = !state.isShowPassword;
    };

    const handleEmailBlur = () => {
      // console.log("onblur")
      setTimeout(() => {
        state.mailCardHeight = 0;
      }, 100);
    };

    const handleEmailChange = () => {
      // console.log("onchange")
      if (state.formData.emailAddress.includes("@")) {
        state.emailPartName = state.formData.emailAddress.split("@")[0];
        state.mailCardHeight = 260;
      } else {
        setTimeout(() => {
          state.mailCardHeight = 0;
        }, 100);
      }
    };

    const handleEmailFocus = () => {
      // console.log("onFocus")
      if (state.formData.emailAddress.includes("@")) {
        state.emailPartName = state.formData.emailAddress.split("@")[0];
        state.mailCardHeight = 260;
      }
    };

    const mergeEmail = (mail: string) => {
      state.formData.emailAddress = state.formData.emailAddress.split("@")[0] + mail;
      setTimeout(() => {
        state.mailCardHeight = 0;
      }, 100);
    };

    return {
      t,
      ...toRefs(state),
      isFormDataReady,
      handleLoginFormSubmit,
      handleForgotPassword,
      showPassword,
      handleEmailBlur,
      handleEmailChange,
      handleEmailFocus,
      mergeEmail,
    };
  },
});

export default Login;
</script>

<template>
  <div class="rounded-2xl" style="background-color: #2e274c">
    <LoginHeader v-if="currentPage === PAGE_TYPE.LOGIN_FORM" />
    <div class="pt-6 m-0 p-12">
      <!-- SIGN UP FORM  -->
      <form v-if="currentPage === PAGE_TYPE.LOGIN_FORM" ref="form" class="w-full">
        <div class="relative mt-0">
          <input
            :placeholder="t('signup.formPage.emailAddress')"
            class="w-full h-12 px-4 rounded-lg bg-gray-800 text-white shadow-inner"
            v-model="formData.emailAddress"
            @blur="handleEmailBlur"
            @input="handleEmailChange"
            @focus="handleEmailFocus"
          />
        </div>
        <div
          class="absolute left-1/2 -translate-x-1/2 w-94 rounded-2xl z-50 overflow-hidden transition-all duration-300 ease-out"
          :style="{ height: mailCardHeight + 'px', top: '272px', background: '#1D2027' }"
        >
          <ul class="text-white text-base font-medium">
            <li class="py-2 px-4" @click="mergeEmail('@gmail.com')">
              {{ emailPartName }}@gmail.com
            </li>
            <li class="py-2 px-4" @click="mergeEmail('@hotmail.com')">
              {{ emailPartName }}@hotmail.com
            </li>
            <li class="py-2 px-4" @click="mergeEmail('@yahoo.com')">
              {{ emailPartName }}@yahoo.com
            </li>
            <li class="py-2 px-4" @click="mergeEmail('@icloud.com')">
              {{ emailPartName }}@icloud.com
            </li>
            <li class="py-2 px-4" @click="mergeEmail('@outlook.com')">
              {{ emailPartName }}@outlook.com
            </li>
          </ul>
        </div>
        <div class="mt-2 relative">
          <input
            :placeholder="t('signup.formPage.password')"
            class="w-full h-12 px-4 rounded-lg bg-gray-800 text-white shadow-inner"
            :type="isShowPassword ? 'text' : 'password'"
            v-model="formData.password"
          />
          <img
            v-if="isShowPassword"
            src="@/assets/public/svg/icon_public_07.svg"
            class="absolute top-8 right-7 cursor-pointer"
            @click="showPassword"
          />
          <img
            v-else
            src="@/assets/public/svg/icon_public_06.svg"
            class="absolute top-8 right-7 cursor-pointer"
            @click="showPassword"
          />
        </div>
        <div>
          <p
            class="ml-9 text-sm text-gray-400 cursor-pointer"
            @click="currentPage = PAGE_TYPE.FORGOT_PASSWORD"
          >
            {{ t("login.formPage.forgetPassword") }}
          </p>
        </div>
        <div class="mt-12">
          <button
            :loading="loading"
            class="m-3 w-full h-15 text-white rounded-lg"
            :disabled="!isFormDataReady"
            @click="handleLoginFormSubmit"
            style="background: var(--button-bright-bg);"
          >
            {{ t("login.formPage.button") }}
          </button>
        </div>
        <div class="flex justify-center mb-6 mt-10">
          <p class="text-gray-400 mr-2">
            {{ t("login.formPage.donthaveAccount") }}
          </p>
          <p class="text-yellow-400 cursor-pointer" @click="$emit('switch')">
            {{ t("login.formPage.createOne") }}
          </p>
        </div>
        <div class="mt-2 relative">
          <p
            class="relative top-3 text-center w-30 bg-gray-800 mx-auto z-10 text-lg font-medium"
            style="color: #23262f;"
          >
            {{ t("signup.formPage.divider") }}
          </p>
          <hr class="border-white" />
        </div>
        <div class="mt-10">
          <div class="w-2/3 mx-auto">
            <div class="flex justify-around">
              <div
                v-for="(item, index) in socialIconList"
                :key="index"
                class="rounded-full"
                style="background-color: #131828"
              >
                <button class="w-12 h-12 rounded-full flex items-center justify-center">
                  <img :src="item" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <!-- Forgot password -->
      <div v-if="currentPage == PAGE_TYPE.FORGOT_PASSWORD" class="w-full">
        <div class="mt-8 flex justify-center">
          <img
            src="@/assets/public/image/logo_public_01.png"
            class="w-32 h-10 mr-2"
          />
          <!-- <span class="logo-text purple text-large">{{ t('main.logo_text_1') }}</span>
                    <span class="logo-text yellow text-large">{{ t('main.logo_text_2') }}</span> -->
        </div>
        <div class="mt-8">
          <p class="text-white text-center w-full px-12">
            {{ t("login.forgotPasswordPage.title") }}
          </p>
        </div>
        <div class="relative mt-8">
          <input
            :placeholder="t('signup.formPage.emailAddress')"
            class="w-full h-12 px-4 rounded-lg bg-gray-800 text-white shadow-inner"
          />
        </div>
        <div class="mt-8">
          <button
            :disabled="loading"
            :loading="loading"
            class="m-3 w-full h-15 rounded-lg"
            @click="handleForgotPassword"
            style="background: var(--button-bright-bg);"
          >
            {{ t("login.forgotPasswordPage.submit") }}
          </button>
        </div>
        <div class="mt-10">
          <div class="w-2/3 mx-auto">
            <div class="flex justify-around">
              <div
                v-for="(item, index) in socialIconList"
                :key="index"
                class="rounded-full"
                style="background-color: #131828"
              >
                <button class="w-12 h-12 rounded-full flex items-center justify-center">
                  <img :src="item" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="absolute top-1 right-1"
      @click="$emit('close')"
    >
      <img
        v-if="currentPage !== PAGE_TYPE.LOGIN_FORM"
        src="@/assets/public/svg/icon_public_52.svg"
        class="w-6 h-6"
      />
      <img v-else src="@/assets/public/svg/icon_public_10.svg" class="w-6 h-6" />
    </button>
    <Notification
      :notificationShow="notificationShow"
      :notificationText="notificationText"
      :checkIcon="checkIcon"
    />
  </div>
</template>
