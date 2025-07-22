<script setup lang="ts">
import { router } from '@/router'
import { useAuthStore } from '@/stores/auth.store'
import { useTransactionStore } from '@/stores/transaction.store'
import { useChatStore } from '@/stores/chat.store' // Import the chat store
import { useUserStore } from '@/stores/user.store' // Import the chat store

const authStore = useAuthStore()
const userStore = useUserStore()
const depositStore = useTransactionStore()
const {
  isAuthenticated, // Computed property from authStore (single source of truth)
  currentUser, // isLoading: authLoading, // If you need to show auth-specific loading in App.vue
  // error: authError, // Auth store errors
} = storeToRefs(authStore)

const chatStore = useChatStore() // Use the chat store
const { isChatOpen } = storeToRefs(chatStore) // Get the reactive state
const { isProfileOpen } = storeToRefs(userStore) // Get the reactive state
// const {
//   currentUser, // State from userStore
//   // isLoading: userLoading, // If you need to show user-specific loading in App.vue
//   // error: userError, // User store errors
// } = storeToRefs(userStore);
// const isAuthenticated = computed(() => authenticated.loggedIn);
</script>

<template>
  <div
    class="mobile-section grow-1 relative m-0 flex h-screen min-h-screen w-screen flex-col justify-start align-start items-start overflow-hidden p-0">
    <ShowToasts />
    <!-- ChatPanel should be outside the v-if controlled by its own open state, so it can be toggled -->

    <TopBarMobile v-if="
      isAuthenticated &&
      !depositStore.shopOpen &&
      currentUser != undefined &&
      !router.currentRoute.value.path.includes('/profile') &&
      currentUser !== null &&
      !isChatOpen // Hide when chat is open
    " />

    <slot />
    <!-- Hide slot content when chat is open -->
    <ChatPanel v-if="
      isAuthenticated &&
      !depositStore.shopOpen &&
      !router.currentRoute.value.path.includes('/blackjack') &&
      !router.currentRoute.value.path.includes('/profile') &&
      !router.currentRoute.value.path.includes('/nolimit') &&
      !router.currentRoute.value.path.includes('/battles') &&
      !router.currentRoute.value.path.includes('/redtiger') &&
      currentUser != undefined &&
      currentUser !== null
    " />
    <FooterBarMobile v-if="
      isAuthenticated &&
      !depositStore.shopOpen &&
      !router.currentRoute.value.path.includes('/blackjack') &&
      !router.currentRoute.value.path.includes('/battles') &&
      !router.currentRoute.value.path.includes('/profile') &&
      !router.currentRoute.value.path.includes('/redtiger') &&
      !router.currentRoute.value.path.includes('/nolimit') &&
      currentUser != undefined &&
      currentUser !== null &&
      !isChatOpen // Hide when chat is open
    " />
  </div>
</template>
<style scoped>
.mobile-section {
  /* Background image from URL provided by user */
  background-image: url('/images/starsbg.png');
  background-size: cover;
  /* Cover the entire viewport */
  background-position: center;
  /* Center the background image */
  /* background-repeat: no-repeat;  */
  min-height: 100vh;
  /* Make sure the body takes at least the full viewport height */
  font-family: 'Roboto', sans-serif;
  /* Apply a default sans-serif font */
  /* Flexbox utilities to center the game area on the page */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 0;
  /* Reduced padding slightly for larger game area */
}
</style>
