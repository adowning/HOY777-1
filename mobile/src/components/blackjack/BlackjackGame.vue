<template>
    <div
        class="relative mt-[35px] w-[1090px] pb-[55px] max-[1110px]:origin-top max-[1110px]:scale-[.8] max-[1110px]:-mb-[100px] max-[860px]:scale-[.7] max-[760px]:-mb-[220px] max-[760px]:scale-[.5] max-[540px]:-mb-[280px] max-[540px]:scale-[.45] max-[490px]:-mb-[350px] max-[490px]:scale-[.4] max-[440px]:scale-[.35] max-[370px]:scale-[.32]">
        <div class="flex w-full items-center justify-center">
            <img src="@/assets/img/blackjack/table.png" class="w-full" />
        </div>

        <div class="absolute inset-0 top-0 flex w-full justify-center">
            <div v-if="table.game.state === 'created'"
                class="mt-[170px] w-[400px] text-center text-[34px] font-black text-white text-shadow">
                WAITING FOR PLAYERS TO JOIN...
            </div>

            <BlackjackControlsBet v-if="isMyTurnToBet" :table="table" :blackjackChip="blackjackChip"
                @setChip="blackjackSetChip" />
            <BlackjackControlsAction v-else-if="isMyTurnToAction" :table="table" @hit="blackjackHitButton"
                @stand="blackjackStandButton" @split="blackjackSplitButton" @double="blackjackDoubleButton"
                @insurance="blackjackInsuranceButton" />
        </div>

        <div v-if="['running', 'completed'].includes(table.game.state)"
            class="absolute top-[135px] left-1/2 -translate-x-1/2">
            <div class="relative h-[160px] w-[200px]">
                <BlackjackCard v-for="(card, index) in table.game.dealerCards"
                    :key="`${index}-${card.rank}-${card.suit}`" :card="card"
                    :style="{ zIndex: index, transform: `translate(${index * 20}px, ${index * 15}px)` }" />
            </div>
            <BlackjackValue v-if="getCardValue(table.game.dealerCards) > 0"
                :value="getCardValue(table.game.dealerCards)"
                :class="{ 'value-blackjack': table.game.dealerCards.length === 2 && getCardValue(table.game.dealerCards) === 21 }"
                :style="{ transform: `translate(${(table.game.dealerCards.length - 1) * 20 - 13}px, ${(table.game.dealerCards.length - 1) * 15 + 15}px)` }" />
        </div>

        <div class="absolute inset-x-0 top-0 pb-[55px]">
            <BlackjackSeatElement v-for="seatIndex in 5" :key="seatIndex" :seat="seatIndex - 1" :table="table"
                :player="getPlayer(seatIndex - 1)" @join="blackjackJoinButton" @bet="blackjackBetButton" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useBlackjackStore } from '@/stores/blackjack';
import { useGeneralStore } from '@/stores/general';
import { useNotificationStore } from '@/stores/notifications';
import type { BlackjackTable, Player, Card, CardRank } from '@/interfaces/blackjack';

import BlackjackCard from '@/components/blackjack/BlackjackCard.vue';
import BlackjackValue from '@/components/blackjack/BlackjackValue.vue';
import BlackjackSeatElement from '@/components/blackjack/BlackjackSeatElement.vue';
import BlackjackControlsBet from '@/components/blackjack/BlackjackControlsBet.vue';
import BlackjackControlsAction from '@/components/blackjack/BlackjackControlsAction.vue';

const props = defineProps<{
    table: BlackjackTable;
}>();

const authStore = useAuthStore();
const blackjackStore = useBlackjackStore();
const generalStore = useGeneralStore();
const notificationStore = useNotificationStore();

const { authUser } = authStore;
const { socketSendLoading } = blackjackStore;
const { generalTimeDiff } = generalStore;

const blackjackChip = ref(0);

const isMyTurnToBet = computed(() => {
    if (!authUser.user) return false;
    return props.table.game.state === 'countdown' && props.table.players.some(p => p.user._id === authUser.user?._id);
});

const isMyTurnToAction = computed(() => {
    if (!authUser.user || props.table.game.state !== 'running' || props.table.playersPos === null) return false;
    const isPlayerTurn = (props.table.playersPos === 'all' || authUser.user._id === getPlayer(props.table.playersPos)?.user._id);
    const isWithinTime = (Date.now() + generalTimeDiff) <= (new Date(props.table.game.updatedAt).getTime() + 10000);
    return isPlayerTurn && isWithinTime;
});

const getPlayer = (seat: number): Player | undefined => {
    return props.table.players.find(p => p.seat === seat);
};

const getCardValue = (cards: Card[]): number => {
    let value = 0;
    let aceCount = 0;
    for (const card of cards) {
        if (card.rank === 'A') {
            aceCount++;
            value += 11;
        } else if (['K', 'Q', 'J'].includes(card.rank)) {
            value += 10;
        } else if (card.rank !== 'hidden') {
            value += parseInt(card.rank, 10);
        }
    }
    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }
    return value;
};

const getAmountFromChip = (chip: number): number => {
    const amounts = props.table.game.type === 'standard' ? [0.1, 1, 10, 100] : [50, 100, 200, 500];
    return amounts[chip] ?? 0;
};

const blackjackSetChip = (chip: number) => {
    blackjackChip.value = chip;
};

const checkAuth = (): boolean => {
    if (socketSendLoading) return false;
    if (!authUser.user) {
        notificationStore.show({ type: 'error', message: 'Please sign in to perform this action.' });
        return false;
    }
    return true;
};

const blackjackJoinButton = (seat: number) => {
    if (!checkAuth()) return;
    blackjackStore.blackjackSendJoinSocket({ table: props.table.table, seat });
};

const blackjackBetButton = (seat: number, type: 'main' | 'sideLeft' | 'sideRight') => {
    if (!checkAuth()) return;
    const amount = { main: 0, sideLeft: 0, sideRight: 0 };
    amount[type] = Math.floor(getAmountFromChip(blackjackChip.value) * 1000);
    blackjackStore.blackjackSendBetSocket({ table: props.table.table, bets: [{ seat, amount }] });
};

const blackjackInsuranceButton = (insurance: boolean) => {
    if (!checkAuth()) return;
    blackjackStore.blackjackSendInsuranceSocket({ table: props.table.table, insurance });
};

const createPlayerAction = (action: Function) => () => {
    if (!checkAuth()) return;
    action({ table: props.table.table, seat: props.table.playersPos });
};

const blackjackHitButton = createPlayerAction(blackjackStore.blackjackSendHitSocket);
const blackjackStandButton = createPlayerAction(blackjackStore.blackjackSendStandSocket);
const blackjackSplitButton = createPlayerAction(blackjackStore.blackjackSendSplitSocket);
const blackjackDoubleButton = createPlayerAction(blackjackStore.blackjackSendDoubleSocket);
</script>
