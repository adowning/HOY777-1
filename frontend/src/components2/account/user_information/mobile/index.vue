<script lang="ts" setup>
import MEditNickname from "@/components/account/user_information/dialog/mobile/MEditNickname.vue";
import MEditPassword from "@/components/account/user_information/dialog/mobile/MEditPassword.vue";
import MEditEmail from "@/components/account/user_information/dialog/mobile/MEditEmail.vue";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { type GetUserInfo } from "@/interface/user";
import { appBarStore } from "@/store/appBar";
import WarningIcon from "@/components/global/notification/WarningIcon.vue";
import { useToast } from "vue-toastification";

const { t } = useI18n();
const { setMainBlurEffectShow } = appBarStore();
const { setOverlayScrimShow } = appBarStore();
const { setHeaderBlurEffectShow } = appBarStore();
const { setMenuBlurEffectShow } = appBarStore();

const userInfo = computed((): GetUserInfo => {
  const { getUserInfo } = storeToRefs(authStore());
  return getUserInfo.value;
});

const dialogVisible = ref<boolean>(false);
const editNicknameDialog = ref<boolean>(false);
const editPasswordDialog = ref<boolean>(false);
const editEmailDialog = ref<boolean>(false);

const notificationShow = ref<boolean>(false);

const notificationText = ref<string>(t("account.phone_warning_text"));

const handlePhonNumber = () => {
  notificationShow.value = !notificationShow.value;
  if (notificationShow.value) {
    const toast = useToast();
    toast.success(notificationText.value, {
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
};

const editNicknameDialogShow = () => {
  dialogVisible.value = true;
  editNicknameDialog.value = true;
  editPasswordDialog.value = false;
  editEmailDialog.value = false;
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
  setOverlayScrimShow(true);
};

const editPasswordDialogShow = () => {
  dialogVisible.value = true;
  editPasswordDialog.value = true;
  editNicknameDialog.value = false;
  editEmailDialog.value = false;
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
  setOverlayScrimShow(true);
};

const editEmailDialogShow = () => {
  dialogVisible.value = true;
  editEmailDialog.value = true;
  editPasswordDialog.value = false;
  editNicknameDialog.value = false;
  setMainBlurEffectShow(true);
  setHeaderBlurEffectShow(true);
  setMenuBlurEffectShow(true);
  setOverlayScrimShow(true);
};

const userDialogHide = () => {
  dialogVisible.value = false;
  editPasswordDialog.value = false;
  editNicknameDialog.value = false;
  editEmailDialog.value = false;
  setMainBlurEffectShow(false);
  setHeaderBlurEffectShow(false);
  setMenuBlurEffectShow(false);
  setOverlayScrimShow(false);
};

const submitNickName = (name: string) => {
  userInfo.value.name = name;
};

const handleVerifyCode = () => {};
</script>

<template>
  <div class="relative">
    <div class="mx-4 mt-4 text-700-12 text-white">
      {{ t("account.menu.user_info_text") }}
    </div>
    <div class="mx-3 mt-6">
      <div class="pa-0">
        <div
          color="#15161C"
          theme="dark"
          class="m-user-info-item flex justify-between items-center"
        >
          <div class="ml-2" style="line-height: 18px">
            <div class="text-400-10 text-gray">
              {{ t("account.item.nick_name_text") }}
            </div>
            <div class="text-600-12">{{ userInfo.name }}</div>
          </div>
          <button class="m-account-edit-btn text-none" @click="editNicknameDialogShow">
            {{ t("account.edit_text") }}
          </button>
        </div>
      </div>
    </div>
    <div class="mx-3 mt-8">
      <div class="pa-0">
        <div
          color="#15161C"
          theme="dark"
          class="m-user-info-item flex justify-between items-center"
        >
          <div class="ml-2" style="line-height: 18px">
            <div class="text-400-10 text-gray">{{ t("account.item.email_text") }}</div>
            <div class="text-600-12">{{ userInfo.email }}</div>
          </div>
          <button class="m-account-edit-btn text-none" @click="editEmailDialogShow">
            <img
              src="@/assets/public/svg/icon_public_08.svg"
              v-if="userInfo.email_confirmd"
              width="16"
            />
            <img src="@/assets/public/svg/icon_public_09.svg" v-else width="16" />
            {{ t("account.edit_text") }}
          </button>
        </div>
      </div>
      <div class="pa-0 mt-2">
        <button
          class="text-none m-email-verify-btn-color"
          @click="handleVerifyCode"
          height="40px"
        >
          {{ t("account.verify_code_text") }}
        </button>
      </div>
    </div>
    <div class="mx-3 mt-8">
      <div class="pa-0">
        <div
          color="#15161C"
          theme="dark"
          class="m-user-info-item flex justify-between items-center"
        >
          <div class="ml-2" style="line-height: 18px">
            <div class="text-400-10 text-gray">
              {{ t("account.item.current_pwd_text") }}
            </div>
            <div class="text-600-12 user-pwd-spacing">***************</div>
          </div>
          <button class="m-account-edit-btn text-none" @click="editPasswordDialogShow">
            {{ t("account.edit_text") }}
          </button>
        </div>
      </div>
    </div>
    <div class="mx-3 my-4">
      <div class="pa-0">
        <div class="mt-4">
          <div class="flex">
            <div class="w-1/3">
              <div color="#15161C" theme="dark" class="m-user-info-item">
                <div
                  :value="t('account.item.area_text')"
                  class="text-center flex items-center justify-center h-full"
                >
                  <div style="line-height: 18px">
                    <div class="text-400-10 text-gray">
                      {{ t("account.item.area_text") }}
                    </div>
                    <div class="d-flex align-center justify-center">
                      <img src="@/assets/public/image/img_public_25.png" width="23" />
                      <img
                        src="@/assets/public/svg/icon_public_50.svg"
                        width="14"
                        class="ml-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-2/3 pl-0">
              <div
                color="#15161C"
                theme="dark"
                class="m-user-info-item flex justify-between items-center"
              >
                <div class="ml-2">
                  <div class="text-600-12 text-gray">{{ userInfo.phone }}</div>
                </div>
                <button class="m-account-edit-btn" @click="handlePhonNumber">
                  <img src="@/assets/public/svg/icon_public_12.svg" width="16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="m-account-speaker-bg">
      <img
        src="@/assets/public/svg/icon_public_75.svg"
        class="m-account-speaker-img-position"
      />
    </button>
    <div v-if="dialogVisible" class="w-[328px]" @click:outside="userDialogHide">
      <MEditNickname
        v-if="editNicknameDialog"
        @userDialogHide="userDialogHide"
        :email="userInfo.email"
        @submitNickName="submitNickName"
      />
      <MEditPassword v-if="editPasswordDialog" @userDialogHide="userDialogHide" />
      <MEditEmail v-if="editEmailDialog" @userDialogHide="userDialogHide" />
    </div>
    <!-- <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" /> -->
  </div>
</template>

<style lang="scss">
.m-account-speaker-bg {
  width: 44px;
  height: 44px;
  background: #009b3a;
  border-radius: 44px;
  position: absolute;
  right: 20px;
  top: 328px;

  .m-account-speaker-img-position {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.m-user-info-item {
  height: 40px !important;
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}

.m-account-edit-btn {
  background: transparent !important;
  box-shadow: none !important;
  min-width: auto !important;
  padding: 0 16px;

  .v-btn__content {
    font-weight: 400;
    font-size: 12px;
    color: #7782aa;
  }
}

.user-pwd-spacing {
  letter-spacing: 2px;
}

.m-email-verify-btn-color {
  width: 100%;
  background: transparent;
  border: 1px solid #009b3a;
  border-radius: 8px;

  .v-btn__content {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #009b3a;
  }
}

.Vue-Toastification__container {
  right: 0 !important;
  left: unset !important;
  width: 290px !important;
  margin-right: 37px;
  height: 60px !important;
  //flex-direction: unset!important;
}
.Vue-Toastification__toast {
  align-items: center !important;
  z-index: 1000000000 !important;
  top: 70px;
  right: -20px !important;
  width: 320px !important;
  height: 60px;
  border: none;
  border-radius: 16px 0px 0px 16px;
  background: var(--bg-2, #181522);
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.4);
}

.Vue-Toastification__toast-body {
  color: var(--sec-text, #7782aa);
  font-family: Inter, -apple-system, Framedcn, Helvetica Neue, Condensed, DisplayRegular,
    Helvetica, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei,
    Microsoft Yahei, sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
}

.Vue-Toastification__close-button {
  top: 22px !important;
  background-image: url("@/assets/public/svg/icon_public_52.svg");
  background-repeat: no-repeat;
  background-size: 18px;
  color: transparent;
  opacity: 1;
}
</style>
