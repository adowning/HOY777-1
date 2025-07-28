export * from './gen';
export * from './runtime.client';
import { useApiConfig } from '@/composables/useApiConfig';
import { client } from './gen/client.gen';

export function setupAuthInterceptor() {
    const apiConfig = useApiConfig();
  client.instance.interceptors.request.use((request) => {
    if (apiConfig.token) {
      console.log('setting accesstoken')
      console.log(apiConfig.token)
      request.headers.set("Authorization", `Bearer ${apiConfig.token}`);
    }
    return request;
  });
}
