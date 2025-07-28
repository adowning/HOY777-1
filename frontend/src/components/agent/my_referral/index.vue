<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import icon_public_83 from "@/assets/public/svg/icon_public_83.svg";
import QrcodeVue from "qrcode.vue";
import * as clipboard from "clipboard-polyfill";
import MStatistics from "./components/mobile/Statistics.vue";
import MInviteFooter from "./components/mobile/InviteFooter.vue";
import { inviteStore } from "@/store/invite";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { authStore } from "@/store/auth";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";

const { dispatchUserInvite } = inviteStore();
const { dispatchInviteAward } = inviteStore();

const emit = defineEmits<{ (e: "goReportTab", index: number): void }>();

const { t } = useI18n();
const svgColor = ref<string>("#ffffff");
const size = ref<number>(64);

const notificationText = ref<string>("");

const loading = ref<boolean>(false);

const svgTransform = (el: any) => {
  for (let node of el.children) {
    node.setAttribute("fill", svgColor.value);
    for (let sub_node of node.children) {
      sub_node.setAttribute("fill", svgColor.value);
    }
  }
  return el;
};

const inviteItem = computed(() => {
  const { getInviteItem } = storeToRefs(inviteStore());
  return getInviteItem.value;
});

const token = computed(() => {
  const { getToken } = storeToRefs(authStore());
  return getToken.value;
});

const inviteUrlCopy = (content: string) => {
  clipboard.writeText(content).then(
    () => {
      console.log("Copied to clipboard!");
      notificationText.value = "Successful replication";
      const toast = useToast();
      toast.success(notificationText.value, {
        timeout: 5000,
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
    },
    (error) => {
      console.error("Could not copy text: ", error);
    }
  );
};

const goReportTab = () => {
  emit("goReportTab", 3);
};

const sendTelegramAppInvite = () => {
  const Telegram_BASE_URL = "https://t.me/share/url?url=";
  const BASE_URL = token
    ? `${import.meta.env.VITE_BASE_URL}?code=${inviteItem.value.invite_code}`
    : import.meta.env.VITE_BASE_URL;
  const url = `${Telegram_BASE_URL}${BASE_URL}`;
  window.location.href = url;
};

const sendWhatsAppInvite = () => {
  const inviteMessage = encodeURIComponent("message");
  const WHATSAPP_BASE_URL = "https://api.whatsapp.com/send?text=";
  const BASE_URL = token
    ? `${import.meta.env.VITE_BASE_URL}?code=${inviteItem.value.invite_code}`
    : import.meta.env.VITE_BASE_URL;
  const url = `${WHATSAPP_BASE_URL}${BASE_URL}`;
  window.location.href = url;
};

const sendFacebookAppInvite = () => {
  const FACEBOOK_BASE_URL = "https://www.facebook.com/sharer/sharer.php?u=";
  const BASE_URL = token
    ? `${import.meta.env.VITE_BASE_URL}?code=${inviteItem.value.invite_code}`
    : import.meta.env.VITE_BASE_URL;
  const url = `${FACEBOOK_BASE_URL}${BASE_URL}`;
  window.location.href = url;
};

const sendTwitterAppInvite = () => {
  const TWITTER_BASE_URL = "https://twitter.com/intent/tweet?url=";
  const BASE_URL = token
    ? `${import.meta.env.VITE_BASE_URL}?code=${inviteItem.value.invite_code}`
    : import.meta.env.VITE_BASE_URL;
  const url = `${TWITTER_BASE_URL}${BASE_URL}`;
  window.location.href = url;
};

const sendEmailAppInvite = () => {
  const EMAIL_BASE_URL = "mailto:?body=";
  const BASE_URL = token
    ? `${import.meta.env.VITE_BASE_URL}?code=${inviteItem.value.invite_code}`
    : import.meta.env.VITE_BASE_URL;
  const url = `${EMAIL_BASE_URL}${BASE_URL}`;
  window.location.href = url;
};

const inviteAward = async () => {
  loading.value = true;
  await dispatchInviteAward({});
  loading.value = false;
  const toast = useToast();
  toast.success(t("Successful collection!"), {
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
};

onMounted(async () => {
  await dispatchUserInvite();
});
</script>

<template>
  <div>
    <div class="relative">
      <img src="@/assets/public/svg/img_public_26.svg" class="w-full" />
      <div
        class="absolute w-75 h-11 rounded-lg bottom-1/6 right-1 z-[-1]"
        style="background: var(--agent-referral-report-card-bg)"
      >
        <div class="flex items-center absolute top-4 right-11">
          <inline-svg
            :src="icon_public_83"
            width="20"
            height="20"
            :transform-source="svgTransform"
          >
          </inline-svg>
          <span class="text-xs text-white ml-1">{{ t("agent.text_6") }}</span>
        </div>
      </div>
      <div
        class="absolute w-32 h-8 bottom-1/6 right-1 z-[2]"
        @click="goReportTab"
      ></div>
      <div class="flex w-11/12 items-center absolute top-8 -mt-4 mx-4">
        <div class="w-1/2">
          <div class="text-xs text-white">{{ t("agent.text_7") }}</div>
        </div>
        <div class="w-1/2 text-right">
          <button
            class="w-28 h-8 rounded-lg text-black text-center text-xs font-bold"
            :loading="loading"
            @click="inviteAward"
            style="background: var(--agent-card-title-color); box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.3);"
          >
            {{ t("agent.text_8") }}
          </button>
        </div>
      </div>
      <div class="absolute top-20 mx-7 text-lg font-bold text-white">
        R$ {{ inviteItem.available_bonus }}
      </div>
    </div>
    <div
      class="h-60 mx-2 rounded-lg shadow-md"
      style="background: var(--agent-card-notmet-bg);"
    >
      <div class="text-sm font-bold text-white text-center mt-3">
        {{ t("agent.text_9") }}
      </div>
      <div class="m-4 flex">
        <div
          class="w-19 h-26 rounded-t-lg"
          style="background: var(--agent-card-price-color);"
        >
          <div class="w-19 h-19 bg-white rounded-lg">
            <QrcodeVue
              :value="inviteItem.web_invite_url"
              :size="size"
              class="m-1.5"
            />
          </div>
          <div
            class="text-xs font-bold text-black text-center mt-2"
            @click="inviteUrlCopy(inviteItem.web_invite_url)"
          >
            {{ t("agent.text_10") }}
          </div>
        </div>
        <div
          class="w-full h-26 ml-2 rounded-lg relative"
          style="background: var(--agent-card-bg); box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.35) inset;"
        >
          <div class="m-2 text-gray-400 text-xs">{{ t("agent.text_11") }}</div>
          <div class="m-2 text-xs text-white">{{ inviteItem.invite_code }}</div>
          <button
            @click="inviteUrlCopy(inviteItem.invite_code)"
            class="absolute w-6 h-6 rounded-md bottom-2 right-2"
            style="background: var(--agent-card-notmet-bg);"
          >
            <img
              src="@/assets/public/svg/icon_public_71.svg"
              class="w-4"
            />
          </button>
        </div>
      </div>
      <div class="mt-4 mx-4 flex justify-between">
        <div class="text-center" @click="sendFacebookAppInvite">
          <img src="@/assets/agent/svg/img_agent_9.svg" />
          <div class="text-xs font-bold text-white">{{ t("agent.text_12") }}</div>
        </div>
        <div class="text-center" @click="sendTelegramAppInvite">
          <img src="@/assets/agent/svg/img_vip_15.svg" />
          <div class="text-xs font-bold text-white">{{ t("agent.text_13") }}</div>
        </div>
        <div class="text-center">
          <img src="@/assets/agent/svg/img_agent_10.svg" @click="sendWhatsAppInvite" />
          <div class="text-xs font-bold text-white">{{ t("agent.text_14") }}</div>
        </div>
        <div class="text-center">
          <img
            src="@/assets/agent/svg/img_agent_11.svg"
            @click="sendTwitterAppInvite"
          />
          <div class="text-xs font-bold text-white">{{ t("agent.text_15") }}</div>
        </div>
        <div class="text-center">
          <img src="@/assets/agent/svg/img_agent_12.svg" @click="sendEmailAppInvite" />
          <div class="text-xs font-bold text-white">{{ t("agent.text_16") }}</div>
        </div>
      </div>
    </div>
    <MStatistics :inviteItem="inviteItem" />
    <MInviteFooter />
  </div>
</template>

<style lang="scss">
.Vue-Toastification__container {
  right: 0 !important;
  left: unset !important;
  width: 290px !important;
  margin-right: 37px;
  height: 60px !important;
  z-index: 10000000000000000;
}
</style>
