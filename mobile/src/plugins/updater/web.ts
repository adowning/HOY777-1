import { WebPlugin } from '@capacitor/core';
import type { CapacitorUpdaterPlugin, AppInfo, DownloadResult, DownloadProgress, PluginListenerHandle } from './definitions';

export class CapacitorUpdaterWeb extends WebPlugin implements CapacitorUpdaterPlugin {
  constructor() {
    super();
  }

  async getAppInfo(): Promise<AppInfo> {
    console.warn('CapacitorUpdater: getAppInfo() is not implemented for web. Returning mock data.');
    return {
      appId: 'com.example.app.web',
      platform: 'web',
      currentVersion: '1.0.0',
    };
  }

  async download(options: { url: string }): Promise<DownloadResult> {
    console.warn(`CapacitorUpdater: download(${options.url}) is not implemented for web. Simulating download.`);
    const response = await fetch(options.url);
    const blob = await response.blob();
    const path = URL.createObjectURL(blob);
    this.notifyListeners('downloadProgress', { progress: 100 });
    return { path };
  }

  async applyUpdate(options: { path: string }): Promise<void> {
    console.warn(`CapacitorUpdater: applyUpdate(${options.path}) is not implemented for web. Simulating by reloading.`);
    alert('Simulating OTA update. The app will now reload.');
    window.location.reload();
  }

  // This is the corrected implementation for addListener.
  // It now correctly matches the interface required by Capacitor.
  addListener(
    eventName: 'downloadProgress',
    listenerFunc: (event: DownloadProgress) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    const handle = super.addListener(eventName, listenerFunc);
    // The web implementation of addListener in WebPlugin returns a Promise,
    // so we must cast it to the combined type to satisfy the interface.
    return handle as unknown as Promise<PluginListenerHandle> & PluginListenerHandle;
  }
}
