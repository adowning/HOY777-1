<template>
  <div
    class="flex title w-full justify-center item-center align-middle py-1 bg-white min-h-[50px] text-black font-bold text-2xl ">
    <div class="absolute left-0">
      <!-- <CloseIcon /> -->
      <div class="m-1" @click="router.push('/home')">
        < </div>
          <!-- <img src="/images/filterbar/side-arrow-prev.avif" /> -->
      </div>
      <div class="py-1">Profile</div>
    </div>
    <div class="profile flex h-full w-full flex-col mt-12 gap-1">

      <div class="flex flex-row profile-row h-30 w-full "
        style="border-bottom-width: 1px; border-bottom-color: #720fc4;">
        <div class="flex flex-col justify-center item-center min-h-[70px] pl-4 ml-4">
          <!-- <div
          class="flex opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700 min-w-[100vw]  onacona item-end pt-1"
          style="color: yellow; line-height: 1">
          Avatar
        </div> -->
          <div
            class="flex py-1 pb-2 justify-start bg-linear-to-tr opacity-90 dark:from-gray-500 dark:via-gray-700 dark:to-gray-400 min-w-[100vw]  justify-start items-end"
            style=" line-height: 1">
            <PlayerAvatar style="transform: scale(1.2)" class="my-1" />
            <div class="min-w-[100px] flex grow-1" />
            <img src="/images/profile/edit_picture.png" class="w-22 h-10 mb-3" />
          </div>
        </div>
      </div>
      <div v-for="param in params" class="flex flex-row profile-row h-30 w-full "
        style="border-bottom-width: 1px; border-bottom-color: #720fc4;">
        <div class="flex flex-col justify-center item-center min-h-[70px] pl-4 ml-4">
          <div
            class="flex opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700 min-w-[100vw]  onacona item-end pt-1"
            style="color: yellow; line-height: 1">
            {{ param.name }}
          </div>
          <div
            class="flex  bg-linear-to-tr opacity-90 dark:from-gray-500 dark:via-gray-700 dark:to-gray-400 min-w-[100vw]  justify-start items-end"
            style=" line-height: 1">

            {{ param.value }}
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped></style>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()
const currentUser = authStore.currentUser
const params = [
  {
    name: "User Name",
    value: currentUser.username,
  },
  {
    name: "Location",
    value: currentUser.location || 'Anywhere, TX',
  },
  {
    name: "Gender",
    value: currentUser.gender || 'Male',
  },
  {
    name: "Age",
    value: currentUser.age || '18',
  },

];
</script>
