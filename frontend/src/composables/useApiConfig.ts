import { ref, readonly } from 'vue';
import Cookies from 'js-cookie';
import CacheKey from '@/constants/cacheKey';
import { NETWORK_ROUTES } from '@/net/apiRoutes';

export function useApiConfig() {
  const token = ref<string | undefined>(Cookies.get(CacheKey.TOKEN));
  const baseUrl = readonly(ref(import.meta.env.VITE_BASE_API));
  const websocketUrl = readonly(ref(import.meta.env.VITE_WEBSOCKET_URL));

  const setToken = (newToken: string) => {
    token.value = newToken;
    Cookies.set(CacheKey.TOKEN, newToken, { expires: 2 });
  };

  const clearToken = () => {
    token.value = undefined;
    Cookies.remove(CacheKey.TOKEN);
  };

  return {
    token: readonly(token),
    baseUrl,
    websocketUrl,
    setToken,
    clearToken,
    apiRoutes: NETWORK_ROUTES
  };
}
