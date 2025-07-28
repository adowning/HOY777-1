<script lang="ts" setup>
import { onMounted } from 'vue';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from "vuetify";
import { type GetInvitaionBonusData } from "@/interface/affiliate/invite"
import { type GetBettingCommissionData } from "@/interface/affiliate/invite"
import Notification from "@/components/global/notification/index.vue";
import BonusDialog from "./bonus_dialog/index.vue";
import MBonusDialog from "./bonus_dialog/mobile/index.vue";
import { ElNotification } from 'element-plus'
import SuccessIcon from '@/components/global/notification/SuccessIcon.vue';
import WarningIcon from '@/components/global/notification/WarningIcon.vue';
import { useToast } from "vue-toastification";
import * as clipboard from "clipboard-polyfill";
import QrcodeVue from 'qrcode.vue'
import { type StatisticsItem } from "@/interface/affiliate/invite"
import icon_public_28 from "@/assets/public/svg/icon_public_28.svg";
import icon_public_29 from "@/assets/public/svg/icon_public_29.svg";
import icon_public_30 from "@/assets/public/svg/icon_public_30.svg";
import icon_public_31 from "@/assets/public/svg/icon_public_31.svg";
import icon_public_32 from "@/assets/public/svg/icon_public_32.svg";
import icon_public_33 from "@/assets/public/svg/icon_public_33.svg";

const { t } = useI18n();
const { width } = useDisplay();
const inviteList = ref([
    {
        title: "Invitation URL:",
        content: "https.//betfiery.com/referralcode = 6273728f800a98d4989 7997qwqe31231 werwrsdf33 d3333333wetwewfiNffsdse31231w33wetwewfiNffsds..."
    },
    {
        title: "Copy the invitation code",
        content: "6273728f800a98d4025a3073"
    }
])

const socialIcons = ref<Array<any>>([
  icon_public_28,
  icon_public_32,
  icon_public_33,
  icon_public_29,
  icon_public_30,
  icon_public_31,
]);
const morePeople = ref<number>(1025);
const invitationBonusItem = ref({
    cash: "R$ 40.496.845",
    content: "8099369 people received"
})

const bettingCommissionItem = ref({
    cash: "R$ 38.776.550",
    content: "7755310 people received",
})
const bonusDialog = ref<boolean>(false);
const slider = ref<number>(0);
const size = ref<number>(132)
const revenuCashMenuShow = ref<boolean>(false);
const commissionMenuShow = ref<boolean>(false);
const min = 0;
const max = 100;
const slides = ref([
    [
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_09.png", import.meta.url).href,
            grade: 3,
            totalGrade: 3,
            rate: 100,
            cash: "R$ 10",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_08.png", import.meta.url).href,
            grade: 3,
            totalGrade: 10,
            rate: 30,
            cash: "R$ 30",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_07.png", import.meta.url).href,
            grade: 3,
            totalGrade: 25,
            rate: 20,
            cash: "R$ 60",
        },
    ],
    [
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_08.png", import.meta.url).href,
            grade: 3,
            totalGrade: 10,
            rate: 30,
            cash: "R$ 30",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_09.png", import.meta.url).href,
            grade: 3,
            totalGrade: 3,
            rate: 100,
            cash: "R$ 10",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_07.png", import.meta.url).href,
            grade: 3,
            totalGrade: 25,
            rate: 20,
            cash: "R$ 60",
        },
    ],
    [
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_07.png", import.meta.url).href,
            grade: 3,
            totalGrade: 25,
            rate: 20,
            cash: "R$ 60",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_08.png", import.meta.url).href,
            grade: 3,
            totalGrade: 10,
            rate: 30,
            cash: "R$ 30",
        },
        {
            headerImg: new URL("@/assets/affiliate/invite/image/img_agent_09.png", import.meta.url).href,
            grade: 3,
            totalGrade: 3,
            rate: 100,
            cash: "R$ 10",
        },
    ],
]);
const statisticsItem = ref<StatisticsItem>({
    today_deposited_user: 0,
    yesterday_deposited_user: 3963,
    today_revenue: 55.44,
    yesterday_revenue: 98.02,
    this_month_deposited_user: 0,
    this_month_revenue: 0,
    total_registered_user: 0,
    total_depositing_user: 0,
    total_revenue: 0,
});

const mobileWidth = computed(() => {
    return width.value;
})

const invitationBonusList = ref<GetInvitaionBonusData[]>([
    {
        id: "User931469401",
        content: "Receive an invitation bonus",
        cash: "R$ 12"
    },
    {
        id: "User931469401",
        content: "Receive an invitation bonus",
        cash: "R$ 12"
    },
    {
        id: "User931469401",
        content: "Receive an invitation bonus",
        cash: "R$ 12"
    },
    {
        id: "User931469401",
        content: "Receive an invitation bonus",
        cash: "R$ 12"
    },
    {
        id: "User931469401",
        content: "Receive an invitation bonus",
        cash: "R$ 12"
    }
])

const notificationShow = ref<boolean>(false);
const notificationText = ref<string>("");
const checkIcon = ref<any>(new URL("@/assets/public/svg/icon_public_18.svg", import.meta.url).href);



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

window.addEventListener('scroll', function () {
    revenuCashMenuShow.value = false;
    commissionMenuShow.value = false;
});

const closeBonusDialog = () => {
    bonusDialog.value = false;
}

onMounted(() => {
})
</script>
<template>
  <div class="flex flex-wrap -mx-2 mx-2 mt-2 align-center">
    <div class="w-full px-2 ma-0 pa-0 md:w-5/12 md:ml-5/12 lg:w-5/12 lg:ml-5/12" style="height: 100%">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden text-center pb-4" color="#1D2027" theme="dark" style="box-shadow: unset">
        <p class="ma-5 invite-partner-text">{{ t("affiliate.invite.invite_partner") }}</p>
        <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer invite-url-item">
          <v-list-item-title class="ml-4 text-left">
            <div class="invite-url-title">{{ inviteList[0].title }}</div>
            <div style="text-wrap: balance">{{ inviteList[0].content }}</div>
            <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 mt-1 invite-url-copy-btn" icon click="inviteUrlCopy(inviteList[0].content)" width="40" height="40">
              <img src="@/assets/public/svg/icon_public_71.svg" />
            </button>
          </v-list-item-title>
          <template v-slot:append>
            <div class="invite-qr-code-body text-center">
              <QrcodeVue :value="inviteList[0].content" :size="size" class="mt-2" />
            </div>
          </template>
        </li>
        <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer invite-url-item">
          <v-list-item-title class="ml-4 text-left">
            <div class="invite-url-title">{{ inviteList[1].title }}</div>
            <div>{{ inviteList[1].content }}</div>
          </v-list-item-title>
          <template v-slot:append>
            <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 invite-url-copy-btn" icon click="inviteUrlCopy(inviteList[1].content)" width="40" height="40">
              <img src="@/assets/public/svg/icon_public_71.svg" />
            </button>
          </template>
        </li>
      </div>
    </div>
    <div class="w-full px-2 md:w-7/12 md:ml-7/12 lg:w-7/12 lg:ml-7/12">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden text-center pa-2" color="#1D2027" theme="dark" style="box-shadow: unset">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden pa-5 mb-2" color="#15161C" style="box-shadow: unset">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full px-2 text-center py-1 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="invite-url-title">{{ t("affiliate.invite.text_1") }}</div>
              <div class="invite-url-right-text mt-1">
                {{ statisticsItem.today_deposited_user }}
              </div>
            </div>
            <div class="w-full px-2 [mobileWidth < 960 ? '' : 'invite-border'] w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="invite-url-title">{{ t("affiliate.invite.text_3") }}</div>
              <div class="invite-url-right-text mt-1">
                R$ {{ statisticsItem.today_revenue }}
              </div>
            </div>
            <div class="w-full px-2 text-center py-1 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="invite-url-title">
                {{ t("affiliate.invite.text_2") }}
              </div>
              <div class="invite-url-right-text mt-1">
                {{ statisticsItem.yesterday_deposited_user }}
              </div>
            </div>
            <div class="w-full px-2 text-center py-1 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="invite-url-title">
                {{ t("affiliate.invite.text_4") }}
              </div>
              <div class="invite-url-right-text mt-1">
                R$ {{ statisticsItem.yesterday_revenue }}
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden pa-5 mb-2" color="#15161C" style="box-shadow: unset">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full px-2 text-center py-1 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="invite-url-title">
                {{ t("affiliate.invite.text_5") }}
              </div>
              <div class="invite-url-right-text mt-1">
                {{ statisticsItem.this_month_deposited_user }}
              </div>
            </div>
            <div class="w-full px-2 [mobileWidth < 960 ? '' : 'invite-border'] w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="invite-url-title">
                {{ t("affiliate.invite.text_7") }}
              </div>
              <div class="invite-url-right-text mt-2">
                R$ {{ statisticsItem.this_month_revenue.toFixed(2) }}
              </div>
            </div>
            <div class="w-full px-2 text-center py-1 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="invite-url-title">{{ t("affiliate.invite.text_6") }}</div>
              <div class="invite-url-right-text mt-2">
                {{ statisticsItem.total_registered_user }}
              </div>
            </div>
            <div class="w-full px-2 text-center py-1 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="invite-url-title">
                {{ t("affiliate.invite.text_8") }}
              </div>
              <div class="invite-url-right-text mt-2">
                {{ statisticsItem.total_depositing_user }}
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden pa-5 mb-3" color="#15161C" style="box-shadow: unset">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full px-2 text-center py-1">
              <div class="invite-url-title">{{ t("affiliate.invite.text_9") }}</div>
              <div class="invite-url-right-text mt-2">
                R$ {{ statisticsItem.total_revenue.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden pa-5 invite-right-card-bg" style="box-shadow: unset">
          <div class="flex flex-wrap -mx-2 align-center">
            <img src="@/assets/affiliate/invite/image/img_agent_5.png" width="92" />
            <p class="text-700-18 white mr-2">{{ t("affiliate.invite.text_10") }}</p>
            <div class="d-flex align-center justify-center" style="margin-left: auto">
              <template v-for="(icon, index) in socialIcons">
                <img :src="icon" width="58" class="mr-2" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap -mx-2 justify-center mt-10 premiums-text">
    {{ t("affiliate.invite.premiums_text") }}
  </div>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden invite-right-card-bg mt-5 mx-3">
    <div class="flex flex-wrap -mx-2">
      <div style="display: flex; padding: 30px 20px 0px 20px">
        <div class="w-full px-2 md:w-4/12 md:ml-4/12 lg:w-4/12 lg:ml-4/12">
          <div class="flex flex-wrap -mx-2 align-center">
            <div class="w-full px-2 text-center w-5/12">
              <img
                src="@/assets/public/image/img_public_07.png"
                width="100"
                height="70"
              />
            </div>
            <div class="w-full px-2 w-7/12">
              <div class="invitation-bonus-text">
                {{ t("affiliate.invite.invitation_bonus") }}
              </div>
              <div class="invitation-bonus-text-1">{{ invitationBonusItem.cash }}</div>
              <div class="invitation-bonus-text-2">{{ invitationBonusItem.content }}</div>
            </div>
          </div>
          <div class="flex flex-wrap -mx-2 [mobileWidth < 600 ? 'mx-1' : 'mx-1']">
            <v-table class="invitation-bonus-table-bg" theme="dark">
              <tbody class="invite-url-title">
                <tr v-for="(item, index) in invitationBonusList" :key="index">
                  <td>{{ item.id }}</td>
                  <td>{{ item.content }}</td>
                  <td class="invitation-bonus-cash-text">{{ item.cash }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>
        <div class="w-full px-2 md:w-4/12 md:ml-4/12 lg:w-4/12 lg:ml-4/12">
          <div class="flex flex-wrap -mx-2 align-center">
            <div class="w-full px-2 text-center w-5/12">
              <img
                src="@/assets/public/image/img_public_03.png"
                width="100"
                height="70"
              />
            </div>
            <div class="w-full px-2 w-7/12">
              <div class="invitation-bonus-text">
                {{ t("affiliate.invite.betting_commision") }}
              </div>
              <div class="invitation-bonus-text-1">{{ bettingCommissionItem.cash }}</div>
              <div class="invitation-bonus-text-2">
                {{ bettingCommissionItem.content }}
              </div>
            </div>
          </div>
          <div class="flex flex-wrap -mx-2 [mobileWidth < 600 ? 'mx-1' : 'mx-1']">
            <v-table class="invitation-bonus-table-bg" theme="dark">
              <tbody class="invite-url-title">
                <tr v-for="(item, index) in invitationBonusList" :key="index">
                  <td>{{ item.id }}</td>
                  <td>{{ item.content }}</td>
                  <td class="invitation-bonus-cash-text">{{ item.cash }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>
        <div class="text-center" style="margin-top: 16px !important">
          <p class="premiums-text">{{ t("affiliate.invite.how_does_work") }}</p>
          <p class="invite-partner-text mt-4">
            {{ t("affiliate.invite.invitation_bonus") }}
          </p>
          <div class="mt-4">
            <span class="invite-how-text-1">{{
              t("affiliate.invite.how_does_content_1")
            }}</span>
            <span class="invite-how-text-2">$12</span>
            <span class="invite-how-text-1">{{
              t("affiliate.invite.how_does_content_2")
            }}</span>
          </div>
          <img
            src="@/assets/affiliate/invite/image/img_agent_01.png"
            style="margin-top: 60px !important"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="bg-white shadow-lg rounded-lg overflow-hidden mt-5 mx-3 pa-3 py-5" color="#1D2027">
    <div class="flex flex-wrap -mx-2 justify-center">
      <div class="premiums-text">{{ t("affiliate.invite.achivement_bonus") }}</div>
      <img
        src="@/assets/public/svg/icon_public_22.svg"
        class="ml-4"
        style="cursor: pointer"
        @click="bonusDialog = true"
      />
    </div>
    <v-dialog v-model="bonusDialog" :width="mobileWidth < 600 ? 328 : 471">
      <BonusDialog @close="closeBonusDialog" v-if="mobileWidth > 600" />
      <MBonusDialog @close="closeBonusDialog" v-else />
    </v-dialog>
    <div class="flex flex-wrap -mx-2 justify-center">
      <div class="w-full px-2 w-1/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12"></div>
      <div class="w-full px-2 text-center w-10/12 md:w-6/12 md:ml-6/12 lg:w-6/12 lg:ml-6/12">
        <p class="achivement-bonus-text">
          {{ t("affiliate.invite.achivement_bonus_text_1") }}
        </p>
      </div>
      <div class="w-full px-2 w-1/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12"></div>
    </div>
    <div class="flex flex-wrap -mx-2 mt-10">
      <v-carousel
        interval="6000"
        height="386"
        hide-delimiter-background
        :hide-delimiters="slides.length <= 1"
        show-arrows="hover"
      >
        <template v-slot:prev="{ props }">
          <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 button-carousel text-none prev-btn-position" variant="elevated" icon="mdi-chevron-left" click="props.onClick" v-if slides length> 1"
          >
          </button>
        </template>
        <template v-slot:next="{ props }">
          <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 button-carousel text-none next-btn-position" variant="elevated" icon="mdi-chevron-right" click="props.onClick" v-if slides length> 1"
          >
          </button>
        </template>
        <v-carousel-item v-for="(slide, slideIndex) in slides" :key="slideIndex">
          <v-sheet color="#1D2027" height="100%" tile>
            <div class="flex flex-wrap -mx-2 mx-10 justify-center items-center">
              <div class="w-full px-2 w-4/12" v-for="(i, index) in 3" key="index" v-if mobileWidth> 960"
              >
                <div class="bg-white shadow-lg rounded-lg overflow-hidden mt-4 relative invite-carousel-card" color="#1D2027">
                  <div class="invite-carousel-card-header"></div>
                  <img :src="slide[index].headerImg" class="invite-carousel-header-img" />
                  <div class="invite-carousel-header-text">
                    {{ t("affiliate.invite.agent_realization_text") }}
                    {{ slide[index].totalGrade }}
                  </div>
                  <div class="invite-carousel-header-rate bonus-progress-bg">
                    <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden bonus-progress" v-model="slide[index].rate" height="23">
                      <div class="text-800-16 white">
                        <font class="active">{{ slide[index].grade }} / </font>
                        {{ slide[index].totalGrade }}
                      </div>
                    </div>
                  </div>
                  <div class="invite-carousel-body-text">
                    {{ slide[index].cash }}
                  </div>
                  <div class="text-center">
                    <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 [
 slide[index].grade == 3 ? 'button-bright' : 'invite-receive-btn',
 ]" width="164px" height="48px">
                      {{ t("affiliate.invite.receive_btn_text") }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-full px-2 w-6/12" v-for="(i, index1) in 2" key="index1" v-else-if mobileWidth> 600 && mobileWidth <= 960"
              >
                <div class="bg-white shadow-lg rounded-lg overflow-hidden mt-4 relative invite-carousel-card" color="#1D2027">
                  <div class="invite-carousel-card-header"></div>
                  <img
                    :src="slide[index1].headerImg"
                    class="invite-carousel-header-img"
                  />
                  <div class="invite-carousel-header-text">
                    {{ t("affiliate.invite.agent_realization_text") }}
                    {{ slide[index1].grade }}
                  </div>
                  <div class="invite-carousel-header-rate bonus-progress-bg">
                    <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden bonus-progress" v-model="slide[index1].rate" height="21">
                      <div class="text-800-16 white">
                        <font class="active">{{ slide[index1].grade }} / </font>
                        {{ slide[index1].totalGrade }}
                      </div>
                    </div>
                  </div>
                  <div class="invite-carousel-body-text">
                    {{ slide[index1].cash }}
                  </div>
                  <div class="text-center">
                    <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 [
 slide[index1].grade == 3 ? 'button-bright' : 'invite-receive-btn',
 ]" width="164px" height="48px">
                      {{ t("affiliate.invite.receive_btn_text") }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-full px-2" v-for="(i, index2) in 1" key="index2" v-else>
                <div class="bg-white shadow-lg rounded-lg overflow-hidden mt-4 relative invite-carousel-card" color="#1D2027">
                  <div class="invite-carousel-card-header"></div>
                  <img
                    :src="slide[index2].headerImg"
                    class="invite-carousel-header-img"
                  />
                  <div class="invite-carousel-header-text">
                    {{ t("affiliate.invite.agent_realization_text") }}
                    {{ slide[index2].grade }}
                  </div>
                  <div class="invite-carousel-header-rate bonus-progress-bg">
                    <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden bonus-progress" v-model="slide[index2].rate" height="21">
                      <div class="text-800-16 white">
                        <font class="active">{{ slide[index2].grade }} / </font>
                        {{ slide[index2].totalGrade }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="invite-carousel-body-text"
                    :style="[mobileWidth < 600 ? 'font-size: 26px' : '']"
                  >
                    {{ slide[index2].cash }}
                  </div>
                  <div class="text-center">
                    <button class="inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 [
 slide[index2].grade == 3 ? 'button-bright' : 'invite-receive-btn',
 ]" width="164px" height="48px">
                      {{ t("affiliate.invite.receive_btn_text") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div> -->
  <div class="flex flex-wrap -mx-2 mt-6 justify-center">
    <div class="premiums-text">{{ t("affiliate.invite.commission_title_text") }}</div>
    <v-menu v-model="commissionMenuShow">
      <template v-slot:activator="{ props }">
        <img
          src="@/assets/public/svg/icon_public_22.svg"
          class="ml-4"
          v-bind="props"
          style="cursor: pointer"
        />
      </template>
      <ul class="bg-white rounded-md p-2 shadow px-2" theme="dark" bg-color="#1D2027" width="400">
        <p class="pa-4 invite-url-title">{{ t("affiliate.invite.help_text_2") }}</p>
      </ul>
    </v-menu>
  </div>
  <div class="flex flex-wrap -mx-2 mt-4 justify-center px-10">
    <div class="commission-content-text">
      {{ t("affiliate.invite.commission_content_text") }}
    </div>
  </div>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden invite-right-card-bg mt-5 mx-3 pa-3 py-5">
    <div class="flex flex-wrap -mx-2 mobileWidth < 600 ? 'mx-0' : 'mx-6'">
      <div class="w-full px-2 md:w-6/12 md:ml-6/12 lg:w-6/12 lg:ml-6/12">
        <div class="premiums-text">{{ t("affiliate.invite.invite_text_1") }}</div>
        <div class="invitation-bonus-text-2 mt-4">
          {{ t("affiliate.invite.invite_text_2") }}
        </div>
        <div class="invitation-bonus-text-2 mt-4">
          <span>{{ t("affiliate.invite.invite_text_3_1") }}</span>
          <font color="#F9BC01">30 %</font>
          <span>{{ t("affiliate.invite.invite_text_3_2") }}</span>
        </div>
        <div class="invitation-bonus-text-2 mt-4">
          <span>{{ t("affiliate.invite.invite_text_4_1") }}</span>
          <font color="#F9BC01">15 %</font>
          <span>{{ t("affiliate.invite.invite_text_4_2") }}</span>
        </div>
        <div class="invitation-bonus-text-2 mt-4">
          <span>{{ t("affiliate.invite.invite_text_5_1") }}</span>
          <font color="#F9BC01">5 %</font>
          <span>{{ t("affiliate.invite.invite_text_5_2") }}</span>
        </div>
        <img
          src="@/assets/affiliate/invite/image/img_agent_19.png"
          class="mt-10"
          style="width: 100%; max-width: 630px"
        />
      </div>
      <div class="w-full px-2 text-center md:w-6/12 md:ml-6/12 lg:w-6/12 lg:ml-6/12">
        <img
          src="@/assets/affiliate/invite/image/img_agent_02.png"
          class="mt-1"
          style="width: 60%; max-width: 410px"
        />
        <div class="footer-body-bg">
          <div class="premiums-text" :class="[mobileWidth < 600 ? 'pt-4' : 'pt-10']">
            {{ t("affiliate.invite.invite_text_6") }}
          </div>
          <div
            class="footer-body-cash-text"
            :class="[mobileWidth < 600 ? 'pt-2' : 'pt-4']"
            :style="[mobileWidth < 600 ? 'font-size: 26px' : '']"
          >
            R$ {{ Math.ceil(slider) }}
          </div>
          <div class="footer-text-7">
            <span>{{ t("affiliate.invite.invite_text_7") }}</span>
            <font color="#F9BC01">{{ Math.ceil(slider) }}</font>
            <span>{{ t("affiliate.invite.invite_text_8") }}</span>
          </div>
          <div :class="[mobileWidth < 600 ? 'px-0 py-3' : 'pa-6']">
            <v-slider
              v-model="slider"
              color="#009B3A"
              class="align-center"
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
  <div class="bg-white shadow-lg rounded-lg overflow-hidden invite-footer-card-bg mt-5 mx-3 pa-3 py-5">
    <div class="flex flex-wrap -mx-2 mx-1 align-center">
      <div class="w-full px-2 d-flex align-center justify-center md:w-6/12 md:ml-6/12 lg:w-6/12 lg:ml-6/12">
        <img
          src="@/assets/affiliate/invite/image/img_agent_03.png"
          class="mt-10 invite-img-3"
          style="width: 100%; max-width: 400px"
        />
      </div>
      <div class="w-full px-2 md:w-6/12 md:ml-6/12 lg:w-6/12 lg:ml-6/12">
        <div class="mt-4 invite-url-right-text">
          {{ t("affiliate.invite.invite_text_9") }}
        </div>
        <div class="mt-4 invitation-bonus-text-2">
          {{ t("affiliate.invite.invite_text_10") }}
        </div>
        <div class="mt-4 footer-url-text">{{ t("affiliate.invite.invite_text_11") }}</div>
        <div class="mt-4 invitation-bonus-text-2">
          {{ t("affiliate.invite.invite_text_12") }}
        </div>
      </div>
    </div>
  </div>
  <!-- <Notification :notificationShow="notificationShow" :notificationText="notificationText" :checkIcon="checkIcon" /> -->
</template>
<style lang="scss">
.invite-qr-code-body {
  width: 153px;
  height: 153px;
  background: #ffffff;
  margin: 16px;
}
.invite-partner-text {
  color: #f9bc01;
  font-weight: 700;
  font-size: 18px;
}

.invite-url-item {
  margin: 16px 12px !important;
  background-color: #15161C !important;
  padding: 4px 8px !important;
  border-radius: 8px !important;

  .v-list-item__content {
    height: 100%;
  }

  .v-btn--icon {
    border-radius: 10px;
  }
}

.invite-receive-btn {
  background: #23262F !important;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.21) !important;
  border-radius: 16px !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  color: #ffffff !important;
}

.invite-url-title {
  font-weight: 400;
  font-size: 12px;
  color: #7782aa;
}

.footer-text-7 {
  font-weight: 700;
  font-size: 14px;
  color: #7782aa;
}

.footer-url-text {
  font-weight: 800;
  font-size: 16px;
  color: #1acb51;
}

.invite-border {
  border-right: 2px solid #23262F;
}

.invite-url-right-text {
  font-weight: 800;
  font-size: 14px;
  color: #ffffff;
}

.invite-right-card-bg {
  background: linear-gradient(90deg, #29263f 0%, #4a32aa 100%) !important;
}

.invite-revenu-text {
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
}

.invite-url-copy-btn {
  border-radius: 4px;
  background: var(--Secondary-Button-353652, #23262F);
}

.invite-revenu-cash-text {
  font-weight: 700;
  font-size: 20px;
  color: #f9bc01;
}

.invite-more-people-value-text {
  font-weight: 500;
  font-size: 12px;
  color: #f9bc01;
}

.invite-more-people-text {
  font-weight: 500;
  font-size: 12px;
  color: #ffffff;
}

.premiums-text {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
}

.invitation-bonus-text {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
}

.invitation-bonus-text-1 {
  font-weight: 800;
  font-size: 16px;
  color: #f9bc01;
}

.invitation-bonus-text-2 {
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
}

.invitation-bonus-table-bg {
  background-color: #1D2027 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 8px !important;
  width: 100% !important;
}

.invitation-bonus-cash-text {
  font-weight: 800;
  color: #f9bc01;
}

.invite-how-text-1 {
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
}

.invite-how-text-2 {
  font-weight: 400;
  font-size: 14px;
  color: #f9bc01;
}

.achivement-bonus-text {
  font-weight: 400;
  font-size: 16px;
  color: #7782aa;
}

.v-carousel__controls {
  height: 12px !important;

  .v-btn {
    width: 6px !important;
    height: 6px !important;
    margin-right: 6px !important;
  }

  .v-btn__content {
    font-size: 6px;
    color: #7782aa;
  }

  .v-btn--active {
    .v-btn__content {
      font-size: 6px;
      width: 18px !important;
      color: #ffffff !important;
    }
  }
}

.invite-carousel-card-pd {
  padding: 0px 40px !important;
}

.invite-carousel-card-header {
  height: 200px;
  width: 100%;
  background: #6aa82d;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
}

.invite-carousel-card {
  margin-left: auto !important;
  margin-right: auto !important;
  width: 246px !important;
  height: 337px !important;
  overflow: inherit !important;
}

.invite-carousel-header-img {
  position: absolute;
  top: -19px;
  left: 50%;
  transform: translateX(-50%);
  width: 89px;
  height: 125px;
}

.invite-carousel-header-rate {
  width: 80%;
  position: absolute;
  top: 158px;
  left: 50%;
  transform: translateX(-50%);
}

.invite-carousel-header-text {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 127px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 800;
  font-size: 16px;
  color: #ffffff;
}

.invite-carousel-body-text {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 215px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 800;
  font-size: 32px;
  color: #f9bc01;
}

.invite-carousel-btn {
  margin-top: 70px;
}

.commission-content-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #7782aa;
  text-align: center;
}

.footer-body-bg {
  background: #1D2027;
  border-radius: 8px;
}

.footer-body-cash-text {
  font-weight: 800;
  font-size: 32px;
  color: #f9bc01;
}

.invite-footer-card-bg {
  background: linear-gradient(90deg, #de8245 0%, #d84594 100%) !important;
  border-radius: 8px !important;
}

.bonus-progress {
  .v-progress-linear__determinate {
    border-radius: 30px;
    background: linear-gradient(180deg, #6d44f8 0%, #5726fc 100%);
  }
}

.bonus-progress-bg .v-progress-linear {
  background: #1D2027 !important;
  box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12) !important;
  border-radius: 20px !important;
}
.invite-img-3 {
  margin-top: -20px;
  margin-bottom: -20px;
}
</style>
