<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits<{ (e: "closeLoginBonusDialog"): void }>();
const { t } = useI18n();

const vipGrade = ref("VIP1");
const loginBonusItem = ref({
  award: [8, 10, 12, 14, 16, 18, 20, 22], // reward list
  signin_day: 0, // The number of days that have been signed in
  is_signin: true, // You can sign in today
});

const handleLoginBonus = (day: number) => {
  if (day == loginBonusItem.value.signin_day + 1) {
    loginBonusItem.value.signin_day = day;
  }
};
</script>

<template>
  <div class="relative h-[620px] rounded-2xl bg-[#29263c]">
    <img
      src="@/assets/public/image/bg_public_03_01.png"
      class="absolute -top-7 right-6"
    />
    <button
      class="absolute -top-14 right-3 w-8 h-8 rounded-full bg-[#29263c] flex items-center justify-center"
      @click="emit('closeLoginBonusDialog')"
    >
      <img src="@/assets/public/svg/icon_public_52.svg" class="w-5" />
    </button>
    <img
      src="@/assets/affiliate/invite/image/img_agent_02.png"
      class="absolute -top-32 left-1/2 -translate-x-1/2 w-72"
    />
    <div
      class="absolute top-3 left-1/2 -translate-x-1/2 w-[447px] h-[547px] rounded-2xl bg-[#1d2027] shadow-inner z-20"
    >
      <div class="mt-4 text-center">
        <Font class="text-xl font-black text-[#f9bc01]">{{ vipGrade }}</Font>
        <Font class="text-xl font-black text-white"
          >&nbsp;{{ t("vip.login_bonus.title_text") }}</Font
        >
      </div>
      <div class="mt-4 mx-2 flex">
        <div class="w-1/3 px-1 flex justify-center">
          <div
            class="relative w-[133px] h-[150px] rounded-md bg-[#29263c] shadow-md"
            v-if="loginBonusItem.signin_day >= 1"
          >
            <p
              class="absolute top-3 left-1/2 -translate-x-1/2 text-lg font-black text-gray-400"
            >
              {{ t("vip.login_bonus.day_1_text") }}
            </p>
            <img
              src="@/assets/public/svg/icon_public_18.svg"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10"
            />
            <p
              class="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-black text-gray-400"
            >
              $ {{ loginBonusItem.award[0] }}
            </p>
          </div>
          <div
            class="relative w-[133px] h-[150px] rounded-md bg-gradient-to-b from-[#c6428b] to-[#f08734] shadow-md cursor-pointer overflow-hidden"
            v-else
            @click="handleLoginBonus(1)"
          >
            <img
              src="@/assets/vip/image/img_vip_32.png"
              class="w-[450px] h-[450px] rounded-md animate-rotate absolute top-1/2 left-1/2"
              v-if="loginBonusItem.signin_day + 1 == 1"
            />
            <p
              class="absolute top-3 left-1/2 -translate-x-1/2 text-lg font-black text-white"
            >
              {{ t("vip.login_bonus.day_1_text") }}
            </p>
            <img
              src="@/assets/vip/image/img_vip_21.png"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <p
              class="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-black text-white"
            >
              $ {{ loginBonusItem.award[0] }}
            </p>
          </div>
        </div>
        <div class="w-1/3 px-1 flex justify-center">
          <div
            class="relative w-[133px] h-[150px] rounded-md bg-[#29263c] shadow-md"
            v-if="loginBonusItem.signin_day >= 2"
          >
            <p
              class="absolute top-3 left-1/2 -translate-x-1/2 text-lg font-black text-gray-400"
            >
              {{ t("vip.login_bonus.day_2_text") }}
            </p>
            <img
              src="@/assets/public/svg/icon_public_18.svg"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10"
            />
            <p
              class="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-black text-gray-400"
            >
              $ {{ loginBonusItem.award[1] }}
            </p>
          </div>
          <div
            class="relative w-[133px] h-[150px] rounded-md bg-gradient-to-b from-[#2087e8] to-[#0e4987] shadow-md cursor-pointer overflow-hidden"
            v-else
            @click="handleLoginBonus(2)"
          >
            <img
              src="@/assets/vip/image/img_vip_32.png"
              class="w-[450px] h-[450px] rounded-md animate-rotate absolute top-1/2 left-1/2"
              v-if="loginBonusItem.signin_day + 1 == 2"
            />
            <p
              class="absolute top-3 left-1/2 -translate-x-1/2 text-lg font-black text-white"
            >
              {{ t("vip.login_bonus.day_2_text") }}
            </p>
            <img
              src="@/assets/vip/image/img_vip_22.png"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <p
              class="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-black text-white"
            >
              $ {{ loginBonusItem.award[1] }}
            </p>
          </div>
        </div>
        <div class="w-1/3 px-1 flex justify-center">
          <div
            class="relative w-[133px] h-[150px] rounded-md bg-[#29263c] shadow-md"
            v-if="loginBonusItem.signin_day >= 3"
          >
            <p
              class="absolute top-3 left-1/2 -translate-x-1/2 text-lg font-black text-gray-400"
            >
              {{ t("vip.login_bonus.day_3_text") }}
            </p>
            <img
              src="@/assets/public/svg/icon_public_18.svg"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10"
            />
            <p
              class="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-black text-gray-400"
            >
              $ {{ loginBonusItem.award[2] }}
            </p>
          </div>
          <div
            class="relative w-[133px] h-[150px] rounded-md bg-gradient-to-b from-[#2087e8] to-[#0e4987] shadow-md cursor-pointer overflow-hidden"
            v-else
            @click="handleLoginBonus(3)"
          >
            <img
              src="@/assets/vip/image/img_vip_32.png"
              class="w-[450px] h-[450px] rounded-md animate-rotate absolute top-1/2 left-1/2"
              v-if="loginBonusItem.signin_day + 1 == 3"
            />
            <p
              class="absolute top-3 left-1/2 -translate-x-1/2 text-lg font-black text-white"
            >
              {{ t("vip.login_bonus.day_3_text") }}
            </p>
            <img
              src="@/assets/vip/image/img_vip_23.png"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <p
              class="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-black text-white"
            >
              $ {{ loginBonusItem.award[2] }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>