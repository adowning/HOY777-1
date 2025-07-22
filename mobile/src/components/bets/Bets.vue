<template>
    <div class="max-w-[1050px] w-full mx-auto mt-[50px] lg:mt-0 lg:absolute lg:left-0 lg:bottom-0">
        <div class="flex justify-center items-center">
            <button v-if="currentUser" @click="betsSetTab('my')" :class="getNavButtonClass('my')">
                MY BETS
                <span :class="getNavUnderlineClass('my')"></span>
            </button>
            <button @click="betsSetTab('all')" :class="getNavButtonClass('all')">
                ALL
                <span :class="getNavUnderlineClass('all')"></span>
            </button>
            <button @click="betsSetTab('whale')" :class="getNavButtonClass('whale')">
                WHALE WINS
                <span :class="getNavUnderlineClass('whale')"></span>
            </button>
            <button @click="betsSetTab('lucky')" :class="getNavButtonClass('lucky')">
                LUCKY WINS
                <span :class="getNavUnderlineClass('lucky')"></span>
            </button>
        </div>

        <div class="relative rounded-t-[15px] lg:rounded-none overflow-hidden h-[440px] lg:h-[388px]">
            <div
                class="hidden lg:flex justify-between items-center px-[35px] h-[52px] bg-[#082842] text-[#8bacc8] text-sm font-bold">
                <div class="w-1/5">GAME</div>
                <div class="w-1/5">USER</div>
                <div class="w-1/5">TIME</div>
                <div class="w-[15%]">WAGER</div>
                <div class="w-[10%]">MULTIPLIER</div>
                <div class="w-[15%] text-right">PAYOUT</div>
            </div>

            <div class="h-full lg:h-[calc(100%-52px)] overflow-hidden">
                <transition name="fade" mode="out-in">
                    <div v-if="isAppLoading" class="w-full h-full flex justify-center items-center" key="loading">
                        <LoadingAnimation />
                    </div>
                    <div v-else-if="betsGetList.length > 0" class="w-full" key="data">
                        <BetsElement v-for="(bet, index) in betsGetList" :key="bet._id + betsTab" :bet="bet"
                            :class="index % 2 === 0 ? 'bg-[#031b2e]' : 'bg-[#051e33]'" />
                    </div>
                    <div v-else
                        class="w-full h-full flex justify-center items-center uppercase text-xs font-semibold text-[#5e768e]"
                        key="empty">
                        No bets found.
                    </div>
                </transition>
            </div>

            <div
                class="absolute bottom-0 left-0 w-full h-7 bg-gradient-to-t from-[rgba(1,22,39,0.75)] to-transparent z-10">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Ref, } from 'vue';
import { storeToRefs } from 'pinia';
import type { Bet } from '@/interfaces/bets';
import { useAuthStore } from '@/stores/auth.store';
import { useGeneralStore } from '@/stores/general';
import LoadingAnimation from '@/components/LoadingAnimation.vue';
import BetsElement from '@/components/bets/BetsElement.vue';

type BetTab = 'all' | 'my' | 'whale' | 'lucky';

// --- Store Setup ---
const authStore = useAuthStore();
const generalStore = useGeneralStore();
const appBarStore = useAppBarStore();
const { currentUser } = storeToRefs(authStore);
const { bets, } = storeToRefs(generalStore);
const { isAppLoading } = storeToRefs(appBarStore);

// --- Local State ---
const betsTab: Ref<BetTab> = ref('all');

// --- Methods ---
const betsSetTab = (tab: BetTab): void => {
    betsTab.value = tab;
};

// --- Dynamic Classes for Template ---
const getNavButtonClass = (tab: BetTab): string => {
    const baseClasses = 'relative sm:mr-4 mr-10 last:mr-0 pb-[23px] lg:pb-2 text-sm sm:text-xs font-bold transition-colors duration-300';
    const activeColor = 'text-white';
    const inactiveColor = 'text-[#bbbfd0]';
    return `${baseClasses} ${betsTab.value === tab ? activeColor : inactiveColor}`;
};

const getNavUnderlineClass = (tab: BetTab): string => {
    const baseClasses = 'absolute bottom-0 left-0 h-px w-full bg-white transition-opacity';
    const activeOpacity = 'opacity-100';
    const inactiveOpacity = 'opacity-0';
    return `${baseClasses} ${betsTab.value === tab ? activeOpacity : inactiveOpacity}`;
};

// --- Computed & Lifecycle ---
const betsGetList = computed(() => {
    if (bets.value && bets.value[betsTab.value]) {
        return bets.value[betsTab.value].slice(0, 12);
    }
    return [];
});

onMounted(() => {
    if (bets.value === null && !loading.value) {
        generalStore.generalGetBetsDataSocket({});
    }
});
</script>

<style scoped>
/* Scoped styles are no longer needed! Tailwind handles it all. */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>