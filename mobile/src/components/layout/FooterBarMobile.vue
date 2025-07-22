<script setup lang="ts">
import LeaderJson from '@/assets/anim/leadernew.json'
import RewardsJson from '@/assets/anim/rewards.json'
import fireBlueJson from '@/assets/anim/fireBlue.json'
import { useAppBarStore } from '@/stores/appBar.store'
import { useTransactionStore } from '@/stores/transaction.store'
import { ref } from 'vue'
import VaultJson from '@/assets/anim/vault.json'
import { router } from '@/router'

import { useAuthStore } from '@/stores/auth.store'
import { useGameStore } from '@/stores/game.store'
import { useEventManager } from '@/composables/EventManager'
const eventBus = useEventManager()

const target = ref()
const showBottomBar = ref(true)

const authStore = useAuthStore()
const gameStore = useGameStore()
// --- State & Getters from Sores (using storeToRefs for reactivity) ---
const { currentUser } = storeToRefs(authStore)
const { isPlaying } = storeToRefs(gameStore)
const depositStore = useTransactionStore()
const appBarStore = useAppBarStore()
const pressed = ref(false)
const leaderBoardOpen = ref(false)
const rightDrawer = ref(false)
const bonusDrawer = ref(false)
const wheelPageOpen = ref(false)

eventBus.on('hideBottomBar', () => {
  console.log('Hiding bottom bar...')
  showBottomBar.value = false
})
function toggleChat() {
  rightDrawer.value = !rightDrawer.value
  appBarStore.setRightBarToggle(rightDrawer.value)
}
function toggleBonusDrawer() {
  bonusDrawer.value = !bonusDrawer.value
  appBarStore.setBonusDashboardDialogVisible(bonusDrawer.value)
}
function _toggleShopOpen() {
  // console.log('asdf')
  depositStore.toggleShopOpen()
  depositStore.setDepositScreenName(DepositScreenName.SELECT_PRODUCT)
  // router.push('/rtggame')
}
function changeLeaderBoardOpen() {
  // console.log(leaderBoardOpen)
  // leaderBoardOpen.value = true
  // eventBus.emit('leaderBoardOpen', leaderBoardOpen.value)
  router.push('/battles')
}
function changeWheelPageOpen() {
  pressed.value = !pressed.value
  // leaderBoardOpen.value = true
  // appBarStore.toggleWheelVisible()
}
</script>

<template>
  <div v-if="!isPlaying" ref="target" class="bbar flex onacona" style="width: 100%">
    <!-- <BaseLevel> -->
    <div class="flex flex-row justify-start gap-12 px-3" style="width: 110%; z-index: 888; background-image: url('/images/bottom/slice.avif'); background-size: 120% 100%">
      <div class="items-end justify-start" style="display: flex; flex-wrap: nowrap; grid-gap: 0px; padding: 2px">
        <div class="wn-btn-item" @click="changeWheelPageOpen">
          <WheelIcon :pressed="pressed" :current-user="currentUser" style="z-index: 999; margin-bottom: 35px; margin-left: -32px" />
        </div>
        <div class="flex w-9" />

        <div class="wn-btn-item" @click="changeLeaderBoardOpen()">
          <VGSprite
            id="leader"
            class="flex"
            image-src="/images/bottom/leadernew.png"
            :sprite-sheet-data="LeaderJson"
            style="background-repeat: no-repeat; z-index: 10; margin-top: -58px; margin-right: 5px"
            :speed="30"
            :delay="3500"
            :offset="12000"
            :autoplay="true"
          />
          <span class="glow rounded-lg px-1" style="font-size: 16px; line-height: 1.3">Battles</span>
        </div>
        <div class="flex w-3" />
        <div class="wn-btn-item mr-3 pt-22" style="margin-top: 19px" @click="_toggleShopOpen">
          <VGSprite
            id="vaultIcon"
            class="flex"
            image-src="/images/bottom/vault.png"
            :sprite-sheet-data="VaultJson"
            style="background-repeat: no-repeat; z-index: 10; margin-top: -200px; padding-top: 30px; margin-right: -27px; transform: scale(0.6) translateY(55px)"
            :speed="60"
            :delay="6000"
            :offset="5000"
            :autoplay="true"
          />
          <span class="glow align-center justify-center rounded-lg px-1" style="font-size: 16px; line-height: 1.3">Deposit</span>
        </div>
        <div class="flex w-4" />
        <div class="wn-btn-item ml-2 pt-1" style="margin-top: -20px" @click="_toggleShopOpen">
          <VGSprite
            id="RewardsIcon"
            class="flex"
            image-src="/images/bottom/rewards.png"
            :sprite-sheet-data="RewardsJson"
            style="background-repeat: no-repeat; z-index: 10; margin-top: -200px; padding-top: 20px; margin-left: 30px; transform: scale(0.8) translateY(35px) translateX(20px)"
            :speed="60"
            :delay="9000"
            :offset="2000"
            :autoplay="true"
          />
          <span class="glow align-center justify-center rounded-lg pr-2" style="font-size: 16px; line-height: 1.3">Reward</span>
        </div>
      </div>
    </div>
    <!-- </BaseLevel> -->
  </div>
</template>

<style scoped>
.bbar {
  position: fixed !important;
  background-size: cover;
  position: relative;
  height: 5%;
  background-position: center;
  bottom: 0px;
  left: 0px;
  background-repeat: no-repeat;
}

.wn-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-basis: 100%;
  transition: all 0.3s;
  box-sizing: border-box;
}

@media (min-width: 576px) {
  .wn-btn-container {
    cursor: pointer;
  }
}

.wn-btn-item {
  width: 62px;
  max-width: 62px;
  min-width: 62px;
  color: white;
  height: 70%;
  max-height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  position: relative;
}
</style>
