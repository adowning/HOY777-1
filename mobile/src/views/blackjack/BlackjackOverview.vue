<template>
    <div class="relative flex w-full flex-col items-center px-[10px] py-[25px] max-[950px]:pb-[443px] md:py-[45px]">
        <div class="w-full max-w-[1300px]">
            <div
                class="flex w-full items-center justify-between border-b border-[#133047] pb-[25px] max-[850px]:flex-col max-[850px]:items-start">
                <div class="flex items-center">
                    <IconUserGradient class="mr-[12px]" />
                    <span class="gradient-green text-[28px] font-black">STANDARD TABLES</span>
                    <div class="ml-[15px] flex items-center text-[28px] font-normal text-[#c1c1c1]">
                        ( <img src="@/assets/img/icons/coin.svg" alt="icon" class="mr-[8px] h-[24px] w-[24px]" />
                        <div class="text-[12px] font-semibold text-[#c1c1c1]">
                            <span class="text-[16px] font-extrabold text-white">0</span>.10 <span
                                class="text-[16px] font-extrabold text-white">- 1,000</span>.00
                        </div> )
                    </div>
                </div>
                <router-link to="/blackjack/tables"
                    class="flex items-center text-[14px] font-semibold text-[#607c92] max-[850px]:mt-[20px]">
                    <IconTables class="mr-[10px] fill-[#607c92]" /> VIEW ALL TABLES
                </router-link>
            </div>
            <div class="w-full pt-[25px]">
                <transition enter-active-class="transition-opacity duration-500" enter-from-class="opacity-0"
                    mode="out-in">
                    <div v-if="!connected" class="flex flex-wrap gap-[10px]" key="loading">
                        <div v-for="i in 10" :key="i"
                            class="h-[150px] relative overflow-hidden bg-[radial-gradient(285%_150%_at_50%_50%,#001323_0%,#000e1a_100%)] [clip-path:polygon(25px_0,calc(100%-25px)_0,100%_25%,100%_75%,calc(100%-25px)_100%,25px_100%,0_75%,0_25%)] after:absolute after:inset-0 after:h-full after:w-full after:animate-loading_animation after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent w-[calc(20%-8px)] max-[1050px]:w-[calc(25%-7.5px)] max-[900px]:w-[calc(33.33%-6.66px)] max-[700px]:w-[calc(50%-5px)]">
                        </div>
                    </div>
                    <div v-else class="flex flex-wrap" key="data">
                        <BlackjackTablesElement v-for="table of blackjackGetTables.standard.slice(0, 10)"
                            :key="table.table" :table="table" />
                    </div>
                </transition>
            </div>
        </div>

        <div class="mt-[50px] w-full max-w-[1300px]">
            <div class="flex w-full items-center justify-between border-b border-[#133047] pb-[25px]">
                <div class="flex items-center">
                    <IconWhaleGradient class="mr-[12px]" />
                    <span class="gradient-yellow text-[28px] font-black">WHALE TABLES</span>
                    <div class="ml-[15px] flex items-center text-[28px] font-normal text-[#c1c1c1]">
                        ( <img src="@/assets/img/icons/coin.svg" alt="icon" class="mr-[8px] h-[24px] w-[24px]" />
                        <div class="text-[12px] font-semibold text-[#c1c1c1]">
                            <span class="text-[16px] font-extrabold text-white">50</span>.00 <span
                                class="text-[16px] font-extrabold text-white">- 1,000</span>.00
                        </div> )
                    </div>
                </div>
            </div>
            <div class="w-full pt-[25px]">
                <transition enter-active-class="transition-opacity duration-500" enter-from-class="opacity-0"
                    mode="out-in">
                    <div v-if="!connected" class="flex flex-wrap gap-[10px]" key="loading">
                        <div v-for="i in 5" :key="i"
                            class="h-[150px] relative overflow-hidden bg-[radial-gradient(285%_150%_at_50%_50%,#001323_0%,#000e1a_100%)] [clip-path:polygon(25px_0,calc(100%-25px)_0,100%_25%,100%_75%,calc(100%-25px)_100%,25px_100%,0_75%,0_25%)] after:absolute after:inset-0 after:h-full after:w-full after:animate-loading_animation after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent w-[calc(20%-8px)] max-[1050px]:w-[calc(25%-7.5px)] max-[900px]:w-[calc(33.33%-6.66px)] max-[700px]:w-[calc(50%-5px)]">
                        </div>
                    </div>
                    <div v-else class="flex flex-wrap" key="data">
                        <BlackjackTablesElement v-for="table of blackjackGetTables.whale" :key="table.table"
                            :table="table" />
                    </div>
                </transition>
            </div>
        </div>
        <Bets />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useBlackjackStore } from '@/stores/blackjack';
import { useSocketStore } from '@/stores/socket';
import type { BlackjackTable } from '@/interfaces/blackjack';
import Bets from '@/components/bets/Bets.vue';
import IconTables from '@/components/icons/IconTables.vue';
import IconUserGradient from '@/components/icons/IconUserGradient.vue';
import IconWhaleGradient from '@/components/icons/IconWhaleGradient.vue';
import BlackjackTablesElement from '@/components/blackjack/BlackjackTablesElement.vue';

const blackjackStore = useBlackjackStore();
const socketStore = useSocketStore();
const { tables: blackjackTables, connected } = storeToRefs(blackjackStore);

interface TableGroups { standard: BlackjackTable[]; whale: BlackjackTable[]; }
const blackjackGetTables = computed((): TableGroups => ({
    standard: blackjackTables.value.filter(t => t.game.type === 'standard'),
    whale: blackjackTables.value.filter(t => t.game.type === 'whale'),
}));
</script>
