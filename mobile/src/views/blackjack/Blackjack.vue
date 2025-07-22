<template>
    <div class="w-full">
        <transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
            mode="out-in">
            <slot />

        </transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useSocketStore } from '@/stores/socket';

const socketStore = useSocketStore();

onMounted(() => {
    socketStore.socketConnectBlackjack();
});

onBeforeRouteLeave(() => {
    socketStore.socketDisconnectBlackjack();
});
</script>
