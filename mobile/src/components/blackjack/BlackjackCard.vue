<template>
    <div class="absolute bottom-0 left-0 h-[84px] w-[60px] [perspective:1000px]">
        <div class="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
            :class="{ '[transform:rotateY(-180deg)]': card.rank === 'hidden' }">
            <div
                class="absolute h-full w-full rounded-[5px] bg-[#ebe9e6] p-[5px] [backface-visibility:hidden] drop-shadow-lg">
                <img v-if="card.rank !== 'hidden'" class="h-full rounded-[5px] transition-opacity duration-300"
                    :src="`/src/assets/img/blackjack/cards/${card.rank.toLowerCase()}_${card.suit}.jpg`"
                    alt="Card front" />
            </div>
            <div
                class="absolute flex h-full w-full items-center justify-center rounded-[5px] bg-gradient-to-b from-[#212335] to-[#31355a] [transform:rotateY(-180deg)] [backface-visibility:hidden] drop-shadow-lg">
                <img src="@/assets/img/blackjack/cards/back.png" alt="Card back" class="h-full rounded-[5px]" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Card } from '@/interfaces/blackjack';

defineProps<{
    card: Card;
}>();
</script>
