<template>
  <div>
    <!-- Display an error bar if the update check fails -->
    <div v-if="error" class="error-bar">
      Update Error: {{ error }}
    </div>

    <!-- Display the update notification bar when an update is available -->
    <div v-if="isUpdateAvailable" class="update-bar">
      <div class="update-info">
        <span>Update available: v{{ updateInfo.version }} ({{ updateInfo.updateType }})</span>
        <p v-if="updateInfo.mandatory" class="mandatory">This update is mandatory.</p>
      </div>
      <div class="update-actions">
        <!-- Show different actions based on the current status -->
        <button v-if="status === 'available'" @click="downloadUpdate">Download</button>
        <div v-if="status === 'downloading'" class="download-status">Downloading... {{ downloadProgress }}%</div>
        <button v-if="status === 'ready'" @click="applyUpdate">Install & Reload</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
// Adjust the path to your useUpdater composable as needed
import { useUpdater } from '@/composables/useUpdater';

// Define the props that this component accepts
const props = defineProps({
  appId: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  currentVersion: {
    type: String,
    required: true,
  },
  serverUrl: {
    type: String,
    required: true,
  },
});

// Initialize the updater with the props
const {
  status,
  updateInfo,
  downloadProgress,
  error,
  downloadUpdate,
  applyUpdate,
} = useUpdater(props);

// Computed property to determine if the update bar should be visible
const isUpdateAvailable = computed(() => 
  (status.value === 'available' || status.value === 'downloading' || status.value === 'ready') && updateInfo.value
);

// You can use this computed property to show a full-screen overlay for mandatory updates
const isUpdateMandatory = computed(() => updateInfo.value?.mandatory);

</script>

<style scoped>
/* Scoped styles for the update notification bar */
.update-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #007bff;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
}
.update-info {
  font-size: 1rem;
}
.update-info .mandatory {
  color: #ffc107;
  font-weight: bold;
  font-size: 0.85rem;
  margin: 4px 0 0;
}
.update-actions button {
  background-color: white;
  color: #007bff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}
.update-actions button:hover {
  background-color: #f0f0f0;
}
.download-status {
  font-weight: bold;
}
.error-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #dc3545;
  color: white;
  text-align: center;
  padding: 10px;
  z-index: 1001;
}
</style>
