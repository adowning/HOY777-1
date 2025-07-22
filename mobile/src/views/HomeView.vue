<script setup lang="ts">
import { useAppBarStore } from '@/stores/appBar.store'
import { useGameStore } from '@/stores/game.store'
import { useMonitor } from '@/composables/useMonitor'
import { useEventManager } from '@/composables/EventManager'
const { isMobile } = useMonitor()
const eventBus = useEventManager()
const settingsModal = ref(false)
const gameStore = useGameStore()
const appBarStore = useAppBarStore()
const { allGames, bigWinSpins } = storeToRefs(gameStore)

// Reference to the GameCarousel component
const gameCarouselRef = ref()

eventBus.on('settingsModal', (val) => {
  console.log('x')
  settingsModal.value = val
})

// Handle scroll events from FilterBar
const handleScrollLeft = () => {
  if (gameCarouselRef.value) {
    gameCarouselRef.value.scrollLeft()
  }
}

const handleScrollRight = () => {
  if (gameCarouselRef.value) {
    gameCarouselRef.value.scrollRight()
  }
}
</script>
<template>
  <BackGround />
  <LiveWin v-if="bigWinSpins !== undefined && bigWinSpins?.length > 0" />
  <GameCarousel ref="gameCarouselRef" v-if="allGames !== undefined && allGames?.length > 0"
    :style="`${isMobile ? 'margin-top: 0px' : 'margin-top: 10px'}`" />
  <FilterBar @scroll-left="handleScrollLeft" @scroll-right="handleScrollRight" />
  <AdCarousel />
  <SettingsView :has-cancel="false" :model-value="settingsModal" />
  <DailyWheel v-if="appBarStore.getWheelVisible" :has-cancel="false" :model-value="appBarStore.getWheelVisible" />

  <!-- <Vip /> -->
</template>
<style scoped></style>
