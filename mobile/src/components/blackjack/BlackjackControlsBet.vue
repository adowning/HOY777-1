<template>
    <div
        class="z-10 mt-[160px] flex flex-col items-center text-center text-[34px] font-black text-white text-shadow max-sm:mt-[130px] max-sm:scale-125">
        PLACE YOUR BETS
        <div class="mt-[5px] flex text-[22px] font-semibold text-shadow">
            STARTING IN <span class="ml-[5px] flex w-[72px] text-[#ffd600]">{{
                parseFloat(blackjackTimer.toString()).toFixed(2) }}s</span>
        </div>
        <div
            class="mt-[10px] flex h-[140px] w-[400px] flex-col items-center bg-[url('@/assets/img/blackjack/action-chips.webp')] bg-cover bg-center bg-no-repeat">
            <div class="flex h-[96px] w-full items-center justify-center">
                <button v-for="(chip, index) in chips" :key="index" @click="$emit('setChip', index)"
                    class="mr-[25px] flex h-[63px] w-[63px] items-center justify-center rounded-full text-[15px] font-extrabold text-white opacity-40 transition-opacity duration-300 last-of-type:mr-0 drop-shadow-[0px_4px_15px_rgba(0,0,0,0.75)]"
                    :class="[chip.bgClass, { 'opacity-100': blackjackChip === index }]">
                    {{ chip.value }}
                </button>
            </div>
            <div class="flex items-center">
                <button @click="clearButton" :disabled="socketSendLoading !== null" class="mr-[10px] h-[31px] w-[57px]">
                    <div class="btn-inset-dark">CLEAR</div>
                </button>
                <button @click="redoButton" :disabled="socketSendLoading !== null" class="mr-[10px] h-[31px] w-[73px]">
                    <div class="btn-inset-dark">REDO BET</div>
                </button>
                <button @click="maxButton" :disabled="socketSendLoading !== null" class="h-[31px] w-[104px]">
                    <div class="btn-inset-green">MAX BET</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import { useBlackjackStore } from '@/stores/blackjack';
import { useAuthStore } from '@/stores/auth.store';
import { useSocketStore } from '@/stores/socket';
import { useGeneralStore } from '@/stores/general'; // Assuming a general store for timeDiff
import type { BlackjackTable, RecentBet, Player } from '@/interfaces/blackjack';

const props = defineProps<{
    table: BlackjackTable;
    blackjackChip: number;
}>();

const emit = defineEmits<{
    (e: 'setChip', value: number): void
}>();

const blackjackStore = useBlackjackStore();
const authStore = useAuthStore();
const socketStore = useSocketStore();
const generalStore = useGeneralStore(); // Assumed store

const { socketSendLoading } = socketStore;
const { currentUser } = authStore;
const { blackjackRecent } = blackjackStore;
const { generalTimeDiff } = generalStore;

const blackjackTimer = ref(10);
let blackjackTimerRepeater: number | null = null;

const chips = computed(() => {
    const standardChips = ['0.1', '1', '10', '100'];
    const whaleChips = ['50', '100', '200', '500'];
    const bgClasses = ['bg-[url(...red.png)]', 'bg-[url(...purple.png)]', 'bg-[url(...blue.png)]', 'bg-[url(...orange.png)]'];
    const values = props.table.game.type === 'standard' ? standardChips : whaleChips;
    return values.map((value, i) => ({ value, bgClass: bgClasses[i] }));
});

const startTimer = () => {
    const timeEnding = new Date(props.table.game.updatedAt).getTime() + 10000;
    blackjackTimer.value = (timeEnding - (Date.now() + generalTimeDiff)) / 1000;

    if (blackjackTimer.value <= 0) {
        blackjackTimer.value = 0;
    } else {
        blackjackTimerRepeater = requestAnimationFrame(startTimer);
    }
};

const clearButton = () => blackjackStore.blackjackSendClearSocket({ table: props.table.table });
const redoButton = () => blackjackStore.blackjackSendBetSocket({ table: props.table.table, bets: blackjackRecent });

const maxButton = () => {
    if (!authUser?.user) return;
    const bets = props.table.players
        .filter((p): p is Required<Player> => p.user._id === authUser.user?._id && p.bet !== null)
        .map(player => {
            const amountCurrent = player.bet.amount.main + player.bet.amount.sideLeft + player.bet.amount.sideRight;
            const maxLimit = (props.table.game.type === 'standard' ? 50000 : 100000) * 1000;
            const amountBet = Math.floor(maxLimit - amountCurrent);
            return amountBet >= 10 ? { seat: player.seat, amount: { main: amountBet, sideLeft: 0, sideRight: 0 } } : null;
        })
        .filter(b => b !== null);

    if (bets.length > 0) {
        blackjackStore.blackjackSendBetSocket({ table: props.table.table, bets });
    }
};

watch(() => props.table, (newTable) => {
    if (newTable.game.state === 'countdown') {
        startTimer();
    }
}, { deep: true, immediate: true });

onBeforeUnmount(() => {
    if (blackjackTimerRepeater) cancelAnimationFrame(blackjackTimerRepeater);
});
</script>

<style>
.blackjack-controls-bet {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 160px;
    /* font-family: 'Rubik'; */
    text-align: center;
    font-size: 34px;
    font-weight: 900;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
}

@media only screen and (max-width: 540px) {
    .blackjack-controls-bet {
        scale: 1.3;
        margin-top: 130px;
    }
}

.blackjack-controls-bet .bet-timer {
    display: flex;
    margin-top: 5px;
    font-size: 22px;
    font-weight: 600;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.blackjack-controls-bet .bet-timer span {
    width: 72px;
    display: flex;
    margin-left: 5px;
    color: #ffd600;
}

.blackjack-controls-bet .bet-container {
    width: 400px;
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    background-image: url('~@/assets/img/blackjack/action-chips.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.blackjack-controls-bet .container-amount {
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.blackjack-controls-bet .container-amount button {
    width: 63px;
    height: 63px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 25px;
    border-radius: 50%;
    font-size: 15px;
    font-weight: 800;
    color: #ffffff;
    filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.75));
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: opacity 0.3s ease;
    opacity: 0.4;
}

.blackjack-controls-bet .container-amount button:last-of-type {
    margin-right: 0;
}

.blackjack-controls-bet .container-amount button.button-active {
    opacity: 1;
}

.blackjack-controls-bet .container-amount button.button-red {
    background-image: url('~@/assets/img/blackjack/chip-red.png');
}

.blackjack-controls-bet .container-amount button.button-purple {
    background-image: url('~@/assets/img/blackjack/chip-purple.png');
}

.blackjack-controls-bet .container-amount button.button-blue {
    background-image: url('~@/assets/img/blackjack/chip-blue.png');
}

.blackjack-controls-bet .container-amount button.button-orange {
    background-image: url('~@/assets/img/blackjack/chip-orange.png');
}

.blackjack-controls-bet .container-buttons {
    display: flex;
    align-items: center;
}

.blackjack-controls-bet .container-buttons button {
    width: 104px;
    height: 31px;
}

.blackjack-controls-bet .container-buttons button.button-clear {
    width: 57px;
    margin-right: 10px;
}

.blackjack-controls-bet .container-buttons button.button-redo {
    width: 73px;
    margin-right: 10px;
}

.blackjack-controls-bet .container-buttons button .button-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    clip-path: polygon(4px 0, calc(100% - 4px) 0, 100% 25%, 100% 75%, calc(100% - 4px) 100%, 4px 100%, 0 75%, 0 25%);
}

.blackjack-controls-bet .container-buttons button.button-clear .button-inner,
.blackjack-controls-bet .container-buttons button.button-redo .button-inner {
    color: #bbbfd0;
    background: #214059;
    transition: color 0.3s ease;
}

.blackjack-controls-bet .container-buttons button.button-max .button-inner {
    color: #ffffff;
    background: linear-gradient(255deg, #00ffc2 0%, #00aa6d 50%);
}

.blackjack-controls-bet .container-buttons button:hover.button-clear .button-inner,
.blackjack-controls-bet .container-buttons button:hover.button-redo .button-inner {
    color: #ffffff;
}
</style>
