<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification.store';
import { storeToRefs } from 'pinia';
import NotificationItem from './NotificationItem.vue';

const store = useNotificationStore();
// Use storeToRefs to keep reactivity on the notifications array.
const { notifications } = storeToRefs(store);
</script>

<template>
  <div class="fixed top-5 right-5 z-50 space-y-3">
    <transition-group name="notification" tag="div">
      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<style scoped>
/*
  These are the animation classes for the <transition-group>.
  They create a smooth slide-in and fade-out effect.
*/
.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
