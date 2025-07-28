<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { type StatisticsItem } from "@/interface/affiliate/invite"
import { type InviteData } from "@/interface/invite";

const { t } = useI18n();
const props = defineProps<{ inviteItem: InviteData }>();
const { inviteItem } = toRefs(props);
</script>

<template>
  <div class="mx-2 mt-2">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden pa-2 m-agent-statistics-card">
      <div class="flex flex-wrap -mx-2">
        <div class="w-full px-2 m-agent-invite-border text-center py-1 mt-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
          <div class="text-400-10 gray">
            {{ t("affiliate.invite.text_1") }}
          </div>
          <div class="m-agent-invite-url-right-text mt-2">
            {{ inviteItem.deposit_users_today }}
          </div>
        </div>
        <div class="w-full px-2 text-center py-1 mt-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
          <div class="text-400-10 gray">
            {{ t("affiliate.invite.text_2") }}
          </div>
          <div class="m-agent-invite-url-right-text mt-2">
            {{ inviteItem.deposit_users_yesterdays }}
          </div>
        </div>
        <div class="w-full px-2 m-agent-invite-border text-center py-2 mb-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
          <div class="text-400-10 gray">
            {{ t("affiliate.invite.text_3") }}
          </div>
          <div class="m-agent-invite-url-right-text mt-2">
            R$ {{ Number(inviteItem.bonus_today).toFixed(2) }}
          </div>
        </div>
        <div class="w-full px-2 text-center py-2 mb-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
          <div class="text-400-10 gray">{{ t("affiliate.invite.text_4") }}</div>
          <div class="m-agent-invite-url-right-text mt-2">
            R$ {{ Number(inviteItem.bonus_yesterdays).toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white shadow-lg rounded-lg overflow-hidden pa-2 m-agent-statistics-card mt-2">
      <div class="flex flex-wrap -mx-2">
        <div class="w-full px-2 m-agent-invite-border text-center py-1 mt-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
          <div class="text-400-10 gray">
            {{ t("affiliate.invite.text_5") }}
          </div>
          <div class="m-agent-invite-url-right-text mt-2">
            {{ inviteItem.deposit_users_month }}
          </div>
        </div>
        <div class="w-full px-2 text-center py-1 mt-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
          <div class="text-400-10 gray">
            {{ t("affiliate.invite.text_6") }}
          </div>
          <div class="m-agent-invite-url-right-text mt-2">
            {{ inviteItem.invited_users }}
          </div>
        </div>
        <div class="w-full px-2 m-agent-invite-border text-center py-2 mb-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
          <div class="text-400-10 gray">
            {{ t("affiliate.invite.text_7") }}
          </div>
          <div class="m-agent-invite-url-right-text mt-2">
            R$ {{ Number(inviteItem.bonus_month).toFixed(2) }}
          </div>
        </div>
        <div class="w-full px-2 text-center py-2 mb-4 w-6/12 md:w-3/12 md:ml-3/12 lg:w-3/12 lg:ml-3/12">
          <div class="text-400-10 gray">{{ t("affiliate.invite.text_8") }}</div>
          <div class="m-agent-invite-url-right-text mt-2">
            {{ inviteItem.deposit_users }}
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white shadow-lg rounded-lg overflow-hidden pa-2 m-agent-statistics-card mt-2">
      <div class="flex flex-wrap -mx-2">
        <div class="w-full px-2 m-agent-invite-border text-center py-1 mt-4 mb-2">
          <div class="text-400-10 gray">
            {{ t("affiliate.invite.text_9") }}
          </div>
          <div class="m-agent-invite-url-right-text mt-2">
            R$ {{ Number(inviteItem.bonus_total).toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-agent-statistics-card {
  border-radius: 8px;
  background: $agent_card_notmet_bg;
}

.m-agent-invite-url-right-text {
  font-weight: 800;
  font-size: 12px;
  color: #ffffff;
}

.m-agent-invite-border {  
  border-right: 2px solid $agent_card_bg;
}
</style>
