/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import { configureDayjs } from './dayjs'
import Toast, { toastOptions } from './toast'
import Vue3Lazyload, { lazyloadOptions } from './lazyload'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  loadFonts()
  configureDayjs()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(Toast, toastOptions)
    .use(Vue3Lazyload, lazyloadOptions)
}
