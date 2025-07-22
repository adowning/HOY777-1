<template>
  <div  class="container animate__animated animate__fadeIn animate__faster">
    <div class="logo">
      <img v-if="!playing" src="/images/logo_anim_back.png" width="200" />
      <img v-if="playing" src="/images/animated_logo.gif" width="200" />
    </div>
    <div class="loader" style="transform: translateY(-20px) scale(0.4) translateX(20px)">
      <span style="font-size: 42px; font-weight: 700" class="glow loading-text w-[40px] flex justify-start"> </span>

      <span style="--i: 1"><iconify-icon icon="game-icons:round-star" width="22" height="22"></iconify-icon></span>
      <span style="--i: 2"><iconify-icon icon="game-icons:round-star" width="22" height="22"></iconify-icon></span>
      <span style="--i: 3"><iconify-icon icon="game-icons:round-star" width="22" height="22"></iconify-icon></span>
      <span style="--i: 4"><iconify-icon icon="game-icons:round-star" width="22" height="22"></iconify-icon></span>
      <span style="--i: 5"><iconify-icon icon="game-icons:round-star" width="22" height="22"></iconify-icon></span>
      <span style="--i: 6"><iconify-icon icon="game-icons:round-star" width="22" height="22"></iconify-icon></span>
      <span style="--i: 7"><iconify-icon icon="game-icons:round-star" width="22" height="22"></iconify-icon></span>
      <span style="--i: 8"><iconify-icon icon="game-icons:round-star" width="22" height="22"></iconify-icon></span>
      <span style="--i: 9"><iconify-icon icon="game-icons:round-star" width="22" height="22"></iconify-icon></span>
      <span style="--i: 10"><iconify-icon icon="game-icons:round-star" width="22" height="22"></iconify-icon></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const playing = ref(false)
const showLoading = ref(true)
onMounted(() => {
  setTimeout(() => {
    showLoading.value = true
  }, 300)
  setInterval(() => {
    setTimeout(() => {
      playing.value = false
    }, 2100)
    playing.value = true
  }, 5000)
})
</script>

<style scoped>
.container {
  z-index: 999;
  margin: 0;
  top: 0px;
  left: 0px;
  z-index: 999999999;
  display: flex;
  position: fixed;
  align-items: start;
  justify-content: center;
  /* background-image: url('/images/common/loading.png'); */
  background-color: black;
  background-size: 100% 100%;
  min-height: 100vh;
  height: 100vh;
  max-width: 580px;
  width: 100vw;
}

.logo {
  z-index: 9909;
  position: absolute;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
}

.loader {
  z-index: 9909;
  position: absolute;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  top: 35%;
  left: 25%;
  transform: translate(-50%, -50%);
  justify-content: center;
  animation: animateColor 5.2s linear infinite;
}

@keyframes animateColor {
  0% {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(360deg);
  }
}

.loader span {
  position: absolute;
  transform-origin: 150px;
  transform: translateX(-150px) rotate(calc(var(--i) * 36deg));
  filter: drop-shadow(0 0 5px #3cc2ff) drop-shadow(0 0 15px #3cc2ff) drop-shadow(0 0 30px #3cc2ff);
}

.loader span iconify-icon {
  display: inline-block;
  position: relative;
  color: #3cc2ff;
  animation: rotate-stars 2.4s linear infinite;
  animation-delay: calc(var(--i) * -0.2s);
}

@keyframes rotate-stars {
  0% {
    transform: rotate(0deg) scale(0.5);
  }

  50% {
    transform: rotate(180deg) scale(1.5);
  }

  100% {
    transform: rotate(360deg) scale(0.5);
  }
}

/* --- Corrected animation for the ellipsis --- */
.loading-text::after {
  content: 'loading';
  transform: translateX(-60px);
  animation: ellipsis 2s infinite steps(4, end);
}

@keyframes ellipsis {
  0% {
    content: 'loading';
  }

  25% {
    content: 'loading.';
  }

  50% {
    content: 'loading..';
  }

  75% {
    content: 'loading...';
  }
}
</style>
