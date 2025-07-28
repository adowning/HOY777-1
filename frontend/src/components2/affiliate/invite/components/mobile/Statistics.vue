<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { type StatisticsItem } from "@/interface/affiliate/invite"
import { storeToRefs } from 'pinia';
import { inviteStore } from '@/store/invite';
import {type InviteData} from "@/interface/invite";

const { t } = useI18n();
const { width } = useDisplay();
const props = defineProps<{inviteItem: InviteData}>();
const {inviteItem} = toRefs(props);

const revenuCash = ref<number>(415.740);
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
</script>

<template>
  <div class="flex flex-wrap -mx-2 mx-4 my-2 align-center">
    <div class="w-full px-2 mt-3 pa-0 md:w-7/12 md:ml-7/12 lg:w-7/12 lg:ml-7/12">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden pa-2 m-statistics-card-1" color="#1D2027">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden pa-2 m-statistics-card-2" color="#15161C">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full px-2 m-invite-border text-center py-1 mt-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_1") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                {{ inviteItem.deposit_users_today }}
              </div>
            </div>
            <div class="w-full px-2 text-center py-1 mt-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_2") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                {{ inviteItem.deposit_users_yesterdays }}
              </div>
            </div>
            <div class="w-full px-2 m-invite-border text-center py-2 mb-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_3") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                R$ {{ Number(inviteItem.bonus_today).toFixed(2) }}
              </div>
            </div>
            <div class="w-full px-2 text-center py-2 mb-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="text-400-10 gray">{{ t("affiliate.invite.text_4") }}</div>
              <div class="m-invite-url-right-text mt-2">
                R$ {{ Number(inviteItem.bonus_yesterdays).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden pa-2 m-statistics-card-2 mt-2" color="#15161C">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full px-2 m-invite-border text-center py-1 mt-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_5") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                {{ inviteItem.deposit_users_month }}
              </div>
            </div>
            <div class="w-full px-2 text-center py-1 mt-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_6") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                {{ inviteItem.invited_users }}
              </div>
            </div>
            <div class="w-full px-2 m-invite-border text-center py-2 mb-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_7") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                R$ {{ Number(inviteItem.bonus_month).toFixed(2) }}
              </div>
            </div>
            <div class="w-full px-2 text-center py-2 mb-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
              <div class="text-400-10 gray">{{ t("affiliate.invite.text_8") }}</div>
              <div class="m-invite-url-right-text mt-2">
                {{ inviteItem.deposit_users }}
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden pa-2 m-statistics-card-2 mt-2" color="#15161C">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full px-2 m-invite-border text-center py-1 mt-4 mb-2">
              <div class="text-400-10 gray">
                {{ t("affiliate.invite.text_9") }}
              </div>
              <div class="m-invite-url-right-text mt-2">
                R$ {{ Number(inviteItem.bonus_total).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="bg-white shadow-lg rounded-lg overflow-hidden mt-5 pa-5 invite-right-card-bg">
          <div class="flex flex-wrap -mx-2 align-center mx-2">
            <div class="w-full px-2 pa-2 w-8/12">
              <div class="text-700-16 white">
                {{ t("affiliate.invite.monthly_revenu_goal") }}
              </div>
            </div>
            <div class="w-full px-2 text-right pa-0 pt-2 w-4/12">
              <img src="@/assets/public/image/img_public_06.png" width="74" height="69" />
            </div>
          </div>
          <div class="flex flex-wrap -mx-2 mx-2 my-0">
            <div class="w-full px-2">
              <div class="d-flex mt-2">
                <div class="m-invite-revenu-cash-text">R$ {{ revenuCash }}</div>
                <v-menu v-model="revenuCashMenuShow">
                  <template v-slot:activator="{ props }">
                    <img
                      src="@/assets/public/svg/icon_public_22.svg"
                      class="ml-4"
                      v-bind="props"
                      width="16"
                    />
                  </template>
                  <ul class="bg-white rounded-md p-2 shadow px-2" theme="dark" bg-color="#1D2027" width mobileWidth> 600 ? 471 : mobileWidth - 30"
                    style="margin: 0px 2px 0px -15px"
                  >
                    <li class="flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer pt-4">
                      <div class="text-center text-400-12 gray">
                        {{ t("affiliate.invite.help_text_1") }}
                      </div>
                    </li>
                  </ul>
                </v-menu>
              </div>
              <div>
                <span class="text-500-10 yellow">{{ morePeople }}</span>
                <span class="text-500-10 white">{{
                  t("affiliate.invite.more_people_text")
                }}</span>
              </div>
            </div>
          </div>
        </div> -->
    </div>
  </div>
</template>

<style lang="scss">
.m-statistics-card-1 {
  border-radius: 8px;
  box-shadow: none;
}
.m-statistics-card-2 {
  border-radius: 8px;
  background: var(--BG-5-1C1929, #15161C);
  box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset;
}

.m-invite-url-right-text {
  font-weight: 800;
  font-size: 12px;
  color: #ffffff;
}
</style>
