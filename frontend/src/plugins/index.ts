/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import router from '../router'
import pinia from '../store'
import { configureDayjs } from './dayjs'
import Vue3Lazyload, { lazyloadOptions } from './lazyload'
import Toast, { toastOptions } from './toast'
import { loadFonts } from './webfontloader'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  loadFonts()
  configureDayjs()
  app
    .use(router)
    .use(pinia)
    .use(Toast, toastOptions)
    .use(Vue3Lazyload, lazyloadOptions)
}
