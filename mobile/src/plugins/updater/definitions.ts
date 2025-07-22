import type { PluginListenerHandle } from '@capacitor/core';
export type { PluginListenerHandle } from '@capacitor/core';

// --- Added missing type exports ---
// These types are now exported so they can be imported by other files.
export type UpdateType = 'BINARY' | 'OTA';

export interface AppVersion {
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

// --- Original Plugin Definitions ---

export interface AppInfo {
  appId: string;
  platform: 'android' | 'ios' | 'web';
  currentVersion: string;
}

export interface DownloadProgress {
  // A value between 0 and 100
  progress: number;
}

export interface DownloadResult {
  // The native file path to the downloaded bundle
  path: string;
}

export interface CapacitorUpdaterPlugin {
  /**
   * Gets essential information about the running app.
   */
  getAppInfo(): Promise<AppInfo>;

  /**
   * Downloads an update bundle to the device's filesystem.
   * @param options - The URL of the file to download.
   */
  download(options: { url: string }): Promise<DownloadResult>;

  /**
   * Applies a previously downloaded OTA update.
   * This typically involves unzipping the bundle and reloading the app.
   * @param options - The native file path of the downloaded bundle.
   */
  applyUpdate(options: { path: string }): Promise<void>;

  /**
   * Listens for download progress events.
   */
  addListener(
    eventName: 'downloadProgress',
    listenerFunc: (event: DownloadProgress) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}
