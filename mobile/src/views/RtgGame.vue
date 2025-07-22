<template>
  <div v-if="error === false && sessionStarted == true" style="width: 100vw; height: 100vh">
    <RtgGameLoader :options="gameLaunchOptions" />
  </div>
  <div v-else>
    <p>Game name is missing in the URL.</p>
  </div>
</template>

<script setup lang="ts">
// import RtgGameLoader from '@/components/games/RtgGameLoader.vue' // Adjust path if needed
import { reactive } from 'vue'
import { useGameStore } from '@/stores/game.store'
import { useRouteQuery } from '@vueuse/router'
import type { RtgGameLaunchOptions } from '@/interfaces'

// interface Props {
//   gameName: String
// }

// const props = defineProps({
//   gameName: {
//     required: true,
//     type: String,
//   },
// })
console.log('x')
const error = ref(false)
// Define the type for the mode explicitly if you want to be able to change it
type GameMode = 'real' | 'demo'
const sessionStarted = ref(false)
const gameSession = ref()
// const route = useRoute()
const gameName = useRouteQuery('gameName') // or with a default value
// if (!gameName.value) gameName.value = props.gameName
// console.log(gameName.value)
// console.log(props.gameName)

if (!gameName.value) error.value = true

const gameStore = useGameStore()

// Correctly typed gameOptions
const gameLaunchOptions = reactive<RtgGameLaunchOptions>({
  gameName: gameName.value as string, // Or dynamically set this
  lang: 'en',
  currency: 'USD',
  mode: 'real',
  // rgsApiBase: `/api/redtiger/games/rtg/platform/${gameSession.id}`, // Example: This should point to YOUR server
  operator: 'demo', // As configured in your RTG setup
  provider: 'kronos', // Or whatever RTG uses for your setup
  lobbyUrl: '/lobby',
  depositUrl: '/account/deposit',
})

onMounted(async () => {
  await gameStore.dispatchGameEnter(gameName.value as string)
  gameSession.value = gameStore.gameSession
  console.log(gameSession.value)
  gameLaunchOptions.rgsApiBase = `/api/redtiger/games/rtg/platform/${gameSession.value.id}`
  sessionStarted.value = true
})
// Or, if you always want it to be 'real' or 'demo' directly:
// const gameOptions = reactive({
//   gameId: "777Strike",
//   lang: "en",
//   currency: "USD",
//   mode: 'real', // This literal is directly assignable
//   // ...
// });
</script>
