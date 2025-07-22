<template>
    <div class="relative flex w-full flex-col items-center px-[10px] py-[25px] max-[950px]:pb-[443px] md:py-[45px]">
        <div v-if="blackjackTable"
            class="flex w-full max-w-[1090px] items-center justify-between max-[850px]:flex-col max-[850px]:items-start">
            <div class="header-left">
                <div class="flex items-center">
                    <router-link to="/blackjack" class="mr-[20px]">
                        <svg width="18" height="17" viewBox="0 0 18 17" class="fill-[#c1c1c1]"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 16.18L8 0.820004C8 0.0931494 7.24623 -0.277135 6.79868 0.244006L0.203166 7.92398C-0.0677208 8.23941 -0.0677208 8.76055 0.203166 9.07611L6.79867 16.7561C7.24623 17.2771 8 16.9068 8 16.18Z" />
                            <rect x="6" y="5" width="12" height="7" rx="1" />
                        </svg>
                    </router-link>
                    <div class="flex items-center text-[28px] font-black text-white">
                        {{ blackjackTable.game.type === 'standard' ? 'STANDARD TABLES' : 'WHALE TABLES' }}
                        <div class="ml-[15px] flex items-center text-[28px] font-normal text-[#c1c1c1]">
                            (
                            <img src="@/assets/img/icons/coin.svg" alt="icon" class="mr-[8px] h-[24px] w-[24px]" />
                            <div v-if="blackjackTable.game.type === 'standard'"
                                class="text-[12px] font-semibold text-[#c1c1c1]">
                                <span class="text-[16px] font-extrabold text-white">0</span>.10
                                <span class="text-[16px] font-extrabold text-white">- 1,000</span>.00
                            </div>
                            <div v-else class="text-[12px] font-semibold text-[#c1c1c1]">
                                <span class="text-[16px] font-extrabold text-white">50</span>.00
                                <span class="text-[16px] font-extrabold text-white">- 1,000</span>.00
                            </div>
                            )
                        </div>
                    </div>
                </div>
                <div class="mt-[10px] text-[16px] font-semibold text-[#c1c1c1]">LOBBY {{ blackjackTable.table + 1 }},
                    GAME
                    ID = {{ blackjackTable.game._id }}</div>
            </div>
            <button @click="modalsSetShow('BlackjackRules')"
                class="flex items-center text-[16px] font-bold max-[850px]:mt-[20px]">
                <IconInfo class="mr-[8px] fill-[#ffb703]" />
                <span class="gradient-yellow">GAME RULES</span>
            </button>
        </div>

        <BlackjackGame v-if="blackjackTable" :table="blackjackTable" />
        <Bets />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useBlackjackStore } from '@/stores/blackjack';
import { useModalsStore } from '@/stores/modals';
import type { BlackjackTable } from '@/interfaces/blackjack';
import IconInfo from '@/components/icons/IconInfo.vue';
import Bets from '@/components/bets/Bets.vue';
import BlackjackGame from '@/components/blackjack/BlackjackGame.vue';

const route = useRoute();
const blackjackStore = useBlackjackStore();
const modalStore = useModalsStore();

const { tables: blackjackTables } = storeToRefs(blackjackStore);
const blackjackTable: Ref<BlackjackTable | null> = ref(null);

const modalsSetShow = (modalName: string) => modalStore.setShow(modalName);

const setTableFromRouteParams = () => {
    if (blackjackTables.value.length > 0) {
        const tableId = Array.isArray(route.params.tableId) ? route.params.tableId[0] : route.params.tableId;
        if (tableId) blackjackTable.value = blackjackTables.value[Number(tableId) - 1] ?? null;
    }
};

watch(blackjackTables, setTableFromRouteParams, { deep: true });
onMounted(setTableFromRouteParams);
</script>
