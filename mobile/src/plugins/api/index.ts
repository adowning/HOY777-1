import { useAuthStore } from '@/stores/auth.store'
import { client } from './gen/client.gen';
import * as api from './gen/sdk.gen'

export const API_BASE_URL = 'http://localhost:3000'

// Create an instance of our custom API client
// export const apiClient = client

// Re-export types for convenience
// export type { User }

// Request interceptor to add auth token
// apiClient.axios.interceptors.request.use(
//   (config) => {
//     const authStore = useAuthStore()
//     const token = authStore.accessToken

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     return config
//   },
//   (error) => Promise.reject(error)
// )
//  const setToken = () => {
//   const authStore = useAuthStore()
//   const token = authStore.accessToken
//   if(token)
//   client.setConfig({
//     auth: () => token, 
//     baseUrl:API_BASE_URL,
//     // headers: {
//     //   Authorization: `Bearer ${token}`
//     // }
//   });
//   return client
// }
// export  const authClient = setToken()


// const myClient = createClient({
//   baseUrl: 'https://example.com',
// });
export const apiClient = api
export const rawClient = client
// Response interceptor for handling errors
// apiClient.axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config

//     // If the error is not a 401 or we've already retried, reject
//     if (error.response?.status !== 401 || originalRequest?._retry) {
//       return Promise.reject(error)
//     }

//     originalRequest._retry = true
//     const authStore = useAuthStore()

//     try {
//       const refreshToken = authStore.refreshToken
//       if (!refreshToken) {
//         throw new Error('No refresh token available')
//       }

//       // Use the type-safe refresh token endpoint
//       const response = await apiClient.refreshToken({
//         refreshToken
//       })

//       const { accessToken } = response

//       if (accessToken) {
//         // Update the auth store with new tokens
//         authStore.setTokens({
//           accessToken,
//           refreshToken: response.refreshToken || refreshToken
//         })

//         // Update the authorization header
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`

//         // Retry the original request
//         return apiClient.axios(originalRequest)
//       }
//     } catch (refreshError) {
//       // If refresh fails, log the user out
//       await authStore.logout()
//       window.location.href = '/login' // Redirect to login
//       return Promise.reject(refreshError)
//     }

//     return Promise.reject(error)
//   }
// )

// Export the configured Zodios client
// export default {
//   install: (app: any) => {
//     app.config.globalProperties.$api = apiClient
//     app.provide('api', apiClient)
//   },
//   apiClient,
// }
