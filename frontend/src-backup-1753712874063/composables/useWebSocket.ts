import { ref } from 'vue';
import { useApiConfig } from './useApiConfig';
import { userStore } from '@/store/user';
import { authStore } from '@/store/auth';
import router from '@/router';
import '@/net/protocol.js';
import '@/net/starx-wsclient.js';

declare const starx: any;

export function useWebSocket() {
  const { websocketUrl } = useApiConfig();
  const socket = ref<any>(null);

  const connect = () => {
    const { token } = useApiConfig();
    if (!token.value) return;

    const cfg = {
      host: websocketUrl.value,
      port: parseInt(import.meta.env.VITE_WEBSOCKET_PORT),
      path: '/user/connect/ws',
      connectcb: (event_type: string, event: any) => {
        switch (event_type) {
          case 'connect':
            const { token } = useApiConfig();
            starx.request('message.user.login', { token: token.value }, (data: any) => {
              console.log('WebSocket login response:', data);
            });
            break;
          case 'disconnect':
            console.warn('WebSocket disconnected:', event);
            break;
          case 'onKick':
            console.log("WebSocket kicked:", event);
            if (event.value === 307) {
              const auth = authStore();
              auth.dispatchSignout();
              router.push({ name: "Dashboard" });
            }
            break;
        }
      },
    };

    starx.init(cfg);
    socket.value = starx;

    starx.on('unsolicited', (msg: any) => {
      const { route, body } = msg;
      if (route === 'onFundMessage') { // Example from EventManager
        const user = userStore();
        user.setUserBalance(body);
      }
      // Add other unsolicited message handling here
    });
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect();
    }
  };

  const sendMessage = (route: string, data: object, callback: Function) => {
    if (socket.value && socket.value.getState()) {
      starx.request(route, data, callback);
    } else {
      console.error('WebSocket not connected.');
    }
  };

  return {
    socket,
    connect,
    disconnect,
    sendMessage,
  };
}
