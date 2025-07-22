import { initializeAndConnectSync } from '@/services/sync-manager'
import { createPinia } from 'pinia'
// import type { Pinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { useAuthStore, setupAuthInterceptor } from '@/stores/auth.store'
import { useGameStore } from '@/stores/game.store'
import { useSyncClient, } from '@/composables/useSyncClient'
import { useEventManager } from '@/composables/EventManager'
import { useTransactionStore } from '@/stores/transaction.store'
import { useVipStore } from '@/stores/vip.store'
const pinia = createPinia()
// const { stopLoading } = useLoading()

export async function setupStore(app: any) {
  const nameSpace = 'pinia-store'
  pinia.use(
    //@ts-ignore
    createPersistedState({
      key: (storeKey) => `${storeKey}`,
      storage: localStorage,
    })
  )

  app.use(pinia)

  const authStore = useAuthStore()
  const gameStore = useGameStore()
  initializeAndConnectSync()

   await authStore.initializeAuth()
  setupAuthInterceptor(authStore)

  // const promises = [
  // vipStore.dispatchVipInfo(),
  // transactionStore.dispatchOperatorData(),
  //  transactionStore.dispatchUserTransactionHistory(),
  // await gameStore.dispatchGetAllGames()
  // await gameStore.dispatchGameBigWins()
  // ]
  // await Promise.all(promises)
  console.log('Pinia store setup complete with namespace:', nameSpace)
  return pinia
}

export default pinia

export function resetAllStores() {
  console.log('resetting stores ')
  if (!pinia) {
    console.error('Pinia is not installed')
    return
  }
  const allStores = (pinia as any)._s
  console.log(allStores)
  for (const [_key, store] of allStores) {
    store.$reset()
  }
}

export async function hydrateStores(): Promise<boolean> {
  console.log('hydrating')
  const vipStore = useVipStore()
  const authStore = useAuthStore()
  const gameStore = useGameStore()
  const transactionStore = useTransactionStore()

  const promises = [
    // vipStore.dispatchVipInfo(),
    // transactionStore.dispatchOperatorData(),
    gameStore.dispatchGameBigWins(),
    //  transactionStore.dispatchUserTransactionHistory(),
    gameStore.dispatchGetAllGames(),
  ]
  await Promise.all(promises)
  // if (authStore.isAuthenticated && authStore.accessToken) {
  // If the user is logged in, initialize the WebSocket connection
  initializeAndConnectSync();
  const { status: _status } = useSyncClient();
  // status.value = _status.value
  authStore.hydrateStores = false

  return false
}

export async function startSubscriptions(): Promise<boolean> {
  return true
}
export { pinia as store }
