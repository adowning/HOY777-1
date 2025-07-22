import { registerPlugin } from '@capacitor/core';
import type { CapacitorUpdaterPlugin } from './definitions';

// This is the core of the plugin registration.
// It tells Capacitor to create a new plugin named 'CapacitorUpdater'.
const CapacitorUpdater = registerPlugin<CapacitorUpdaterPlugin>('CapacitorUpdater', {
  // This part specifically handles the web/PWA implementation.
  // When your app runs in a browser, Capacitor will automatically
  // load the 'web.ts' file and instantiate the 'CapacitorUpdaterWeb' class.
  web: () => import('./web').then(m => new m.CapacitorUpdaterWeb()),
});

// Re-export all the types and interfaces from definitions.ts so they
// can be easily imported from a single location.
export * from './definitions';

// Export the registered plugin instance so it can be used throughout your app.
export { CapacitorUpdater };
