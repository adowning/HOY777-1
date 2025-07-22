import { ref, type Ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth.store'
import { apiClient } from '@/plugins/api'
// import type { User, PaginatedResponse, User, SetReferrerDto, UpdateUserInput } from '@/interfaces'

type UserBasicUpdateResponse = Pick<
  User,
  'id' | 'username' | 'avatar' 
>
interface ApiError extends Error {
  code?: string | number;
  details?: any;
  [key: string]: any; // Index signature for dynamic property access
}

type UserAvatarUpdateResponse = Pick<User, 'id' | 'avatar'>
type UserCashtagUpdateResponse = Pick<User, 'id' >

type ReferredUserSubset = Pick<
  User,
  'id' | 'username' | 'avatar' | 'createdAt'
>
interface LeaderboardUserSubset extends Pick<
  User,
  'id' | 'username' | 'avatar'
> {}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()
  
  // State
  const isProfileOpen = ref(false)
  const isLoading = ref(false)
  const error = ref<ApiError | null>(null) as Ref<ApiError | null>
  const myReferrals = ref<ReferredUserSubset[] | null>(null)
  const leaderboard = ref<User[] | null>(null)
  const allUsers = ref<User[] | null>(null)

  // Actions
  function setProfileOpenState(isOpen: boolean): void {
    isProfileOpen.value = isOpen
  }

  async function updateUser(
    payload: PatchApiUserByIdData
  ): Promise<ApiResponse<UserBasicUpdateResponse>> {
    if (!authStore.currentUser?.id) {
      return { success: false, error: { name: 'AuthError', message: 'User not authenticated' } }
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await apiClient.patchApiUserById({
        path: {
          id: authStore.currentUser.id
        },
        body: payload.body
      })

      if (authStore.currentUser && response.data) {
        authStore.currentUser = { ...authStore.currentUser, ...response.data }
      }

      return { success: true, data: response.data as unknown as UserBasicUpdateResponse }
    } catch (e: any) {
      const err = normalizeError(e)
      error.value = err
      return { success: false, error: err }
    } finally {
      isLoading.value = false
    }
  }

  async function updateUserAvatar(payload: { avatarUrl: string }): Promise<ApiResponse<UserAvatarUpdateResponse>> {
    if (!authStore.currentUser?.id) {
      return { success: false, error: { name: 'AuthError', message: 'User not authenticated' } }
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await apiClient.patchApiUserById({
        path: {
          id: authStore.currentUser.id
        },
        body: { avatar: payload.avatarUrl }
      })

      if (authStore.currentUser && response.data) {
        authStore.currentUser.avatar = response.data.avatar
      }

      return { success: true, data: response.data as unknown as UserAvatarUpdateResponse }
    } catch (e: any) {
      const err = normalizeError(e)
      error.value = err
      return { success: false, error: err }
    } finally {
      isLoading.value = false
    }
  }


  async function fetchMyReferrals(): Promise<{
    success: boolean;
    data?: ReferredUserSubset[] | null;
    error?: ApiError;
  }> {
    if (!authStore.isAuthenticated) {
      return { success: false, error: { name: 'AuthError', message: 'Not authenticated' } }
    }

    isLoading.value = true
    error.value = null
    
    try {
      // This is a placeholder - adjust according to your actual API
      // You might need to implement a specific endpoint for this
      const response = await apiClient.getApiUser()
      myReferrals.value = response.data as unknown as ReferredUserSubset[]
      return { success: true, data: myReferrals.value }
    } catch (e: any) {
      const err = normalizeError(e)
      error.value = err
      return { success: false, error: err, data: null }
    } finally {
      isLoading.value = false
    }
  }

  async function fetchLeaderboard(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    success: boolean;
    data?: User[] | null;
    error?: ApiError;
  }> {
    if (!authStore.isAuthenticated) {
      return { success: false, error: { name: 'AuthError', message: 'Not authenticated' } }
    }

    isLoading.value = true
    error.value = null

    try {
      // This is a placeholder - adjust according to your actual API
      // You might need to implement a specific endpoint for this
      // const response = await apiClient.getApiUserById({

      //   query: {
      //     page: page.toString(),
      //     limit: limit.toString(),
      //     sort: 'totalXpFromOperator',
      //     order: 'desc'
      //   }
      // })
      
      // leaderboard.value = {
      //   data: response.data as LeaderboardUserSubset[],
      //   meta: {
      //     total: response.data?.length || 0,
      //     page,
      //     limit,
      //     totalPages: Math.ceil((response.data?.length || 0) / limit)
      //   }
      // } as PaginatedResponse<LeaderboardUserSubset>
      
      return { success: true, data: leaderboard.value }
    } catch (e: any) {
      const err = normalizeError(e)
      error.value = err
      return { success: false, error: err, data: null }
    } finally {
      isLoading.value = false
    }
  }

  async function fetchAllUsers(params?: {
    page?: number
    limit?: number
    search?: string
    orderBy?: 'username' | 'createdAt' | 'totalXpFromOperator'
    orderDirection?: 'asc' | 'desc'
  }): Promise<{
    success: boolean
    data?: User[] | null
    error?: any
  }> {
    if (!authStore.isAuthenticated) {
      return { success: false, error: { name: 'AuthError', message: 'Not authenticated' } };
    }

    isLoading.value = true;
    error.value = null;

    try {
      // const queryParams = {
      //   page: params?.page?.toString() || '1',
      //   limit: params?.limit?.toString() || '50',
      //   ...(params?.search && { search: params.search }),
      //   ...(params?.orderBy && { orderBy: params.orderBy }),
      //   ...(params?.orderDirection && { orderDirection: params.orderDirection })
      // };
      
      const response = await apiClient.getApiUser();


      return { success: true, data: response.data };
    } catch (e: any) {
      const err = normalizeError(e);
      error.value = err;
      return { success: false, error: err, data: null };
    } finally {
      isLoading.value = false;
    }
  }

  function clearActionError(errorType?: string): void {
    if (!error.value) return;
    
    // Clear the specific error property or all errors if no type is provided
    if (errorType && errorType in error.value) {
      // Create a new object to maintain type safety
      error.value = { ...error.value, [errorType]: undefined };
    } else {
      error.value = null;
    }
  }

  function normalizeError(e: unknown): ApiError {
    if (e instanceof Error) {
      const errorObj: ApiError = {
        name: e.name,
        message: e.message,
        ...('code' in e && { code: (e as any).code }),
        ...('details' in e && { details: (e as any).details })
      };
      return errorObj;
    }
    return {
      name: 'UnknownError',
      message: typeof e === 'string' ? e : 'An unknown error occurred'
    };
  }

  // Expose state and actions
  return {
    // State
    isProfileOpen,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    myReferrals: computed(() => myReferrals.value),
    leaderboard: computed(() => leaderboard.value),
    allUsers: computed(() => allUsers.value),
    // Actions
    updateUser,
    updateUserAvatar,
    fetchMyReferrals,
    fetchLeaderboard,
    fetchAllUsers,
    clearActionError,
    setProfileOpenState
  }
})
