import { ref, readonly, onMounted, onUnmounted } from 'vue';

// --- Types (mirroring the backend schemas) ---
type UpdateType = 'BINARY' | 'OTA';

interface AppVersion {
  version: string;
  platform: string;
  updateType: UpdateType;
  downloadUrl: string;
  changelog: string[];
  mandatory: boolean;
  releaseDate: string;
  fileSize: number;
  checksum: string;
}

interface UpdateCheckParams {
  appId: string;
  platform: 'android' | 'ios' | 'web';
  currentVersion: string;
  // The base URL of your update server API
  serverUrl: string;
}

type UpdateStatus = 'idle' | 'checking' | 'available' | 'downloading' | 'ready' | 'error';

// --- The Composable ---

export function useUpdater(params: UpdateCheckParams) {
  // --- Reactive State ---
  const status = ref<UpdateStatus>('idle');
  const updateInfo = ref<AppVersion | null>(null);
  const downloadProgress = ref(0);
  const error = ref<string | null>(null);

  let checkInterval: number | null = null;

  // --- Private Functions ---

  /**
   * Performs the actual API call to check for an update.
   * It checks for both OTA and BINARY updates and prioritizes mandatory BINARY updates.
   */
  const _performCheck = async () => {
    if (status.value === 'checking' || status.value === 'downloading') {
      return; // Don't check if an operation is already in progress
    }
    status.value = 'checking';
    error.value = null;
    console.log('Checking for updates...');

    try {
      // Define check promises for both update types
      const check = (updateType: UpdateType) =>
        fetch(`${params.serverUrl}/api/updates/check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...params, updateType }),
        }).then(res => res.json());

      // Check for both types concurrently
      const [binaryResult, otaResult] = await Promise.all([
          check('BINARY'),
          check('OTA')
      ]);
      
      let newUpdate: AppVersion | null = null;

      // Prioritize a mandatory binary update above all else
      if (binaryResult.hasUpdate && binaryResult.mandatory) {
        newUpdate = binaryResult;
      } else if (otaResult.hasUpdate) {
        newUpdate = otaResult;
      } else if (binaryResult.hasUpdate) {
        newUpdate = binaryResult;
      }

      if (newUpdate) {
        console.log(`Update found: v${newUpdate.version} (${newUpdate.updateType})`);
        updateInfo.value = newUpdate;
        status.value = 'available';

        // Automatically download non-mandatory OTA updates in the background
        if (newUpdate.updateType === 'OTA' && !newUpdate.mandatory) {
          downloadUpdate();
        }
      } else {
        console.log('No new updates found.');
        status.value = 'idle';
        updateInfo.value = null;
      }

    } catch (e) {
      console.error('Update check failed:', e);
      error.value = 'Failed to connect to the update server.';
      status.value = 'error';
    }
  };

  /**
   * Downloads the update file from the server.
   */
  const downloadUpdate = async () => {
    if (!updateInfo.value) return;

    status.value = 'downloading';
    downloadProgress.value = 0;
    console.log(`Downloading update from ${updateInfo.value.downloadUrl}`);

    try {
      const response = await fetch(updateInfo.value.downloadUrl);
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      
      const blob = await response.blob();

      // In a real native app (Capacitor/Ionic/React Native), you would save this blob
      // to the device's file system here using a native plugin.
      // For this example, we'll just hold it in memory.
      console.log(`Update downloaded successfully. Size: ${blob.size} bytes`);
      
      // Store the blob URL for potential use
      // In a real app, you'd store the file path.
      // (window as any).downloadedUpdateBlob = blob;

      status.value = 'ready';
      downloadProgress.value = 100;

    } catch (e) {
      console.error('Download failed:', e);
      error.value = 'Failed to download the update file.';
      status.value = 'error';
    }
  };

  /**
   * Triggers the installation of the downloaded update.
   */
  const applyUpdate = () => {
    if (!updateInfo.value) return;

    console.log(`Applying update v${updateInfo.value.version}`);

    if (updateInfo.value.updateType === 'BINARY') {
      // For a binary update, we redirect the user to the download URL.
      // The mobile OS will handle the APK installation prompt.
      window.location.href = updateInfo.value.downloadUrl;
    } else if (updateInfo.value.updateType === 'OTA') {
      // For an OTA update in a real hybrid app, you would call a native plugin here
      // to unpack the downloaded zip and reload the WebView.
      // Example with a hypothetical Capacitor plugin:
      //
      // import { App } from '@capacitor/app';
      // const downloadedFilePath = '...'; // The path where you saved the blob
      // await MyUpdaterPlugin.applyUpdate(downloadedFilePath);
      // App.reload();

      // For this web-based example, we'll just simulate it by reloading the page.
      alert('Update applied! The application will now reload.');
      window.location.reload();
    }
  };

  // --- Lifecycle and Background Logic ---

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      console.log('App brought to foreground, checking for updates.');
      _performCheck();
    }
  };

  onMounted(() => {
    // Check for updates immediately when the app loads
    _performCheck();

    // Set up a periodic check every 15 minutes
    checkInterval = window.setInterval(_performCheck, 15 * 60 * 1000);

    // Add event listener to check when the app is brought to the foreground
    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onUnmounted(() => {
    // Clean up the interval and event listener when the component is unmounted
    if (checkInterval) {
      clearInterval(checkInterval);
    }
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  });

  // --- Exposed Interface ---
  return {
    status: readonly(status),
    updateInfo: readonly(updateInfo),
    downloadProgress: readonly(downloadProgress),
    error: readonly(error),
    checkForUpdate: _performCheck,
    downloadUpdate,
    applyUpdate,
  };
}
