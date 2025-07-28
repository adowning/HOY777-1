/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import WebSocket from '@/plugins/websocket';

// I18n Plugin
import { i18n } from '@/locale/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';

import InlineSvg from 'vue-inline-svg';

import "vue-progressive-image/dist/style.css";

// Pinia Store
import { setupStore } from '@/store/pinia/store';

const app = createApp(App)

registerPlugins(app)

// Setup Pinia store
setupStore(app);

// Connect to WebSocket
const socketConnection = 'ws://localhost:9999/ws'; // Replace with your WebSocket server URL
app.use(WebSocket, socketConnection);

app.use(i18n)

app.component('inline-svg', InlineSvg);

app.use(ElementPlus);

app.mount('#app')