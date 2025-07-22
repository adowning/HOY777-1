// Client entry point (e.g., main.ts for Vue, main.tsx for React)
// Setup your client framework here (Vue, React, Svelte, etc.)
// apps/client/src/main.ts
import "iconify-icon";
import { listIcons } from 'iconify-icon';

import { createApp } from 'vue'
import './assets/main.css'
import './style.css'

// import 'maz-ui/css/main.css'
// import '@/css/path_to_your_main_file.css';
// import 'maz-ui/styles'
console.log('icons ', listIcons())
// Import Tailwind CSS base styles
// Path: client/src/main.ts (Example)
import App from './App.vue'
import { router } from './router' // Assuming your router setup
// import { GlobalAnimationsPlugin } from ...
// import { i18n } from ...
import { setupStore } from './stores' // If you have this function to register all stores
// import { globalAnimations, GlobalAnimationsPlugin } from './utils/setupAnimations'

const app = createApp(App)
// GlobalAnimationsPlugin.install(app)
setupStore(app).then(() => {
  app.use(router) // Use router
  // const animationsController = useAnimationController()
  // Object.entries(globalAnimations).forEach(([key, animation]) => {
  //   animationsController.registerAnimation(animation)

  // })
  app.mount('#app')
})

// const pinia = createPinia() // Create Pinia instance
// app.use(pinia) // Use Pinia

// If you have a setupStore function, ensure it's called after app.use(pinia),
// or that it handles the Pinia instance internally.

// app.use(GlobalAnimationsPlugin);
// app.use(i18n);
