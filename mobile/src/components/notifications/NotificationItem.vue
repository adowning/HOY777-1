<script setup lang="ts">
import { computed } from 'vue';
import { useNotificationStore } from '@/stores/notification.store';
import type { Notification } from '@/types/ui';

const props = defineProps<{
  notification: Notification;
}>();

const notificationStore = useNotificationStore();

// A computed property to determine the CSS classes based on the notification type.
// This is much cleaner than putting complex logic in your template.
const notificationClasses = computed(() => {
  const baseClasses = 'w-full max-w-sm p-4 rounded-lg shadow-lg text-white flex items-center justify-between';
  switch (props.notification.type) {
    case 'success':
      return `${baseClasses} bg-green-600/90 backdrop-blur-sm border border-green-500`;
    case 'error':
      return `${baseClasses} bg-red-600/90 backdrop-blur-sm border border-red-500`;
    case 'warning':
      return `${baseClasses} bg-yellow-500/90 backdrop-blur-sm border border-yellow-400`;
    case 'info':
    default:
      return `${baseClasses} bg-blue-600/90 backdrop-blur-sm border border-blue-500`;
  }
});

function close(): void {
  notificationStore.removeNotification(props.notification.id);
}
</script>

<template>
  <div :class="notificationClasses">
    <span>{{ notification.message }}</span>
    <button @click="close" class="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
