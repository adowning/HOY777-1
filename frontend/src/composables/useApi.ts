import axios, { type AxiosInstance } from 'axios';
import { useApiConfig } from './useApiConfig';
import { useErrorHandler } from './useErrorHandler';
import { useWebSocket } from './useWebSocket';

export function useApi() {
  const { baseUrl, token, apiRoutes } = useApiConfig();
  const { handleException } = useErrorHandler();
  const { sendMessage: sendWsMessage, connect: connectWs, disconnect: disconnectWs } = useWebSocket();

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl.value,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const errorMessage = handleException(error.response?.data?.code || error.response?.status);
      console.error(`API Error: ${errorMessage}`, error);
      return Promise.reject(errorMessage);
    }
  );

  const get = <T>(url: string, params?: object): Promise<T> => {
    return axiosInstance.get<T>(url, { params });
  };

  const post = <T>(url: string, data?: object): Promise<T> => {
    return axiosInstance.post<T>(url, data);
  };

  return {
    get,
    post,
    apiRoutes,
    sendWsMessage,
    connectWs,
    disconnectWs,
  };
}
