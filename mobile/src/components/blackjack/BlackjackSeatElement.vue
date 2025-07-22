<template>
    <div class="absolute" :class="seatPositionClass">
        <div class="flex flex-col items-center max-sm:scale-125">
            <button v-if="!player" @click="$emit('join', seat)"
                class="flex h-[98px] w-[98px] items-center justify-center rounded-full border border-dashed border-[#44edc7] bg-[#003f35] text-[15px] font-extrabold text-white">
                TAKE<br /> SEAT
            </button>
            <div v-else class="flex flex-col items-center">
                <div class="h-[98px] w-[98px] overflow-hidden rounded-full border-2 border-[#9e9e9e] bg-[#000f1b]">
                    <AvatarImage :image="player.user.avatar" class="h-full w-full" />
                </div>
                <span class="mt-[10px] text-[15px] font-bold text-white" v-html="player.user.username"></span>
            </div>
        </div>

        <div class="absolute" :class="gamePositionClass">
            <div v-if="player && ['running', 'completed'].includes(table.game.state)"
                class="absolute bottom-[80px] left-1/2 -translate-x-1/2">
                <div v-if="player.bet && !player.bet.actions.includes('split')" class="relative w-[80px]">
                    <BlackjackCard v-for="(card, index) in player.bet.cards" :key="index" :card="card"
                        :style="{ zIndex: index, transform: `translate(${index * 20}px, ${index * -15}px)` }" />
                    <BlackjackValue :value="getCardValue(player.bet.cards)" :state="getCardState(player.bet.cards)"
                        :active="isActive" :class="{ 'value-blackjack': isBlackjack(player.bet.cards) }" />
                </div>
                <div v-if="player.bet && player.bet.actions.includes('split')" class="relative">
                    <div class="absolute bottom-0 left-[-95px] w-[73px]">
                        <BlackjackCard v-for="(card, index) in player.bet.cardsLeft" :key="`L${index}`" :card="card"
                            :style="{ zIndex: index, transform: `translate(${index * 20}px, ${index * -15}px)` }" />
                        <BlackjackValue :value="getCardValue(player.bet.cardsLeft)"
                            :state="getCardState(player.bet.cardsLeft)" :active="isActive && hasStoodOrBustedRight"
                            :class="{ 'value-blackjack': isBlackjack(player.bet.cardsLeft) }" />
                    </div>
                    <div class="absolute bottom-0 right-[-70px] w-[73px]">
                        <BlackjackCard v-for="(card, index) in player.bet.cardsRight" :key="`R${index}`" :card="card"
                            :style="{ zIndex: index, transform: `translate(${index * 20}px, ${index * -15}px)` }" />
                        <BlackjackValue :value="getCardValue(player.bet.cardsRight)"
                            :state="getCardState(player.bet.cardsRight)" :active="isActive && !hasStoodOrBustedRight"
                            :class="{ 'value-blackjack': isBlackjack(player.bet.cardsRight) }" />
                    </div>
                </div>
            </div>

            <div
                class="h-[60px] w-[100px] flex items-center justify-between bg-cover bg-center bg-no-repeat bg-[url('@/assets/img/blackjack-bet.png')] max-sm:scale-125">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BlackjackTable, Player, Card } from '@/interfaces/blackjack';
import AvatarImage from '@/components/AvatarImage.vue';
import BlackjackCard from '@/components/blackjack/BlackjackCard.vue';
import BlackjackValue from '@/components/blackjack/BlackjackValue.vue';

const props = defineProps<{
    table: BlackjackTable;
    seat: number;
    player?: Player;
}>();

const emit = defineEmits<{
    (e: 'join', seat: number): void
    (e: 'bet', seat: number, type: 'main' | 'sideLeft' | 'sideRight'): void
}>();

const seatPositionClasses = [
    'top-1/2 left-[-20px]',
    'top-[82%] left-[150px]',
    'top-[92%] left-1/2 -translate-x-1/2',
    'top-[82%] right-[150px]',
    'top-1/2 right-[-20px]',
];
const gamePositionClasses = [
    'top-[-15px] right-[-110px] [transform:rotate(59deg)]',
    'top-[-75px] left-[85px] [transform:rotate(30deg)]',
    'top-[-105px]',
    'top-[-75px] right-[85px] [transform:rotate(-30deg)]',
    'top-[-15px] left-[-110px] [transform:rotate(-59deg)]',
];

const seatPositionClass = computed(() => seatPositionClasses[props.seat]);
const gamePositionClass = computed(() => gamePositionClasses[props.seat]);

const isActive = computed(() => props.table.playersPos === props.seat);

const getCardValue = (cards: Card[]): number => {
    let value = 0;
    let aceCount = 0;
    for (const card of cards) {
        if (card.rank === 'A') { aceCount++; value += 11; }
        else if (['K', 'Q', 'J'].includes(card.rank)) { value += 10; }
        else if (card.rank !== 'hidden') { value += parseInt(card.rank, 10); }
    }
    while (value > 21 && aceCount > 0) { value -= 10; aceCount--; }
    return value;
};

const getCardState = (cards: Card[]): 'won' | 'lose' | '' => {
    if (props.table.game.state !== 'completed') return '';
    const playerValue = getCardValue(cards);
    const dealerValue = getCardValue(props.table.game.dealerCards);

    if (playerValue > 21) return 'lose';
    if (dealerValue > 21) return 'won';
    if (playerValue > dealerValue) return 'won';
    if (playerValue < dealerValue) return 'lose';
    return ''; // Push
};

const isBlackjack = (cards: Card[]) => cards.length === 2 && getCardValue(cards) === 21;

const hasStoodOrBustedRight = computed(() => {
    if (!props.player?.bet) return false;
    return props.player.bet.actions.includes('stand') || getCardValue(props.player.bet.cardsRight) >= 21;
});
</script>
