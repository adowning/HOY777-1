<template>
    <div class="flex w-full max-w-[45px] items-center justify-between">
        <div class="flex h-[10px] w-[10px] items-center justify-center rotate-45 bg-white/30">
            <div class="h-full w-full animate-loading-bounce bg-white/50" style="animation-delay: -320ms"></div>
        </div>
        <div class="flex h-[10px] w-[10px] items-center justify-center rotate-45 bg-white/30">
            <div class="h-full w-full animate-loading-bounce bg-white/50" style="animation-delay: -160ms"></div>
        </div>
        <div class="flex h-[10px] w-[10px] items-center justify-center rotate-45 bg-white/30">
            <div class="h-full w-full animate-loading-bounce bg-white/50"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
// No script logic is needed for this purely presentational component.
</script>

<style>
/* It's standard practice to define custom @keyframes in your main CSS file 
  or tailwind.config.js. Keeping it here makes the component self-contained.
*/
@keyframes loading_animation {

    0%,
    80%,
    100% {
        transform: scale(0);
    }

    40% {
        transform: scale(1);
    }
}
</style>