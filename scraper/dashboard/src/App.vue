<script setup>
import { ref, onMounted } from 'vue'

const logs = ref([])
const error = ref(null)

async function fetchLog() {
  try {
    const response = await fetch('/api-scraper.log.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const text = await response.text()
    // The log file is a stream of comma-separated JSON objects.
    // To make it a valid JSON array, we wrap it in brackets and remove the trailing comma.
    const validJsonString = `[${text.trim().slice(0, -1)}]`
    const parsedLogs = JSON.parse(validJsonString)
    logs.value = parsedLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Show newest first
    error.value = null
  } catch (e) {
    console.error('Error fetching or parsing log:', e)
    error.value = 'Failed to load logs. Is the scraper running and generating a log file?'
  }
}

onMounted(() => {
  fetchLog()
  setInterval(fetchLog, 5000) // Refresh every 5 seconds
})

const getLogLevelClass = (level) => {
  if (level === 'error') return 'bg-red-100 text-red-800'
  return 'bg-blue-100 text-blue-800'
}
</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen font-sans">
    <div class="container mx-auto p-4 lg:p-8">
      <header class="mb-8">
        <h1 class="text-4xl font-bold tracking-tight">Scraper Monitoring Dashboard</h1>
        <p class="text-gray-400 mt-2">Live status of the API scraper process.</p>
      </header>

      <div v-if="error" class="bg-red-800 border border-red-600 text-white px-4 py-3 rounded-lg relative mb-6" role="alert">
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline ml-2">{{ error }}</span>
      </div>

      <div class="shadow-2xl rounded-lg overflow-hidden bg-gray-800">
        <div class="px-6 py-4">
          <h2 class="text-xl font-semibold">Activity Log</h2>
          <p class="text-gray-500">Updated every 5 seconds</p>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Timestamp</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Level</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Game</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Event</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody class="bg-gray-800 divide-y divide-gray-700">
              <tr v-if="logs.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <svg class="w-12 h-12 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m-9 4h12M3 7h18M5 12h14M5 17h14"></path></svg>
                    <p class="font-semibold">Waiting for log data...</p>
                    <p class="text-sm">The log file might be empty or is being generated.</p>
                  </div>
                </td>
              </tr>
              <tr v-for="(log, index) in logs" :key="index" class="hover:bg-gray-700 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ new Date(log.timestamp).toLocaleString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getLogLevelClass(log.level)">
                    {{ log.level }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ log.gameName }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ log.event }}</td>
                <td class="px-6 py-4 text-sm text-gray-300">
                  <pre class="whitespace-pre-wrap font-mono text-xs">{{ JSON.stringify(log, null, 2) }}</pre>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>