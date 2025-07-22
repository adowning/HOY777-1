import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useNotificationStore } from "./notification.store";
import { useTransactionStore } from "./transaction.store";
import { useUserStore } from "./user.store";
import { useVipStore } from "./vip.store";
import { apiClient } from "../plugins/api";
import { client } from "@/plugins/api/gen/client.gen";
import { useEventManager } from "@/composables/EventManager";
import { hydrateStores } from "./index";
import Cookies from "js-cookie";
import type { PostAuthLoginResponse, UserSessionData, PostAuthLoginResponses, GetMeResponse } from "@/plugins/api/gen";
interface AuthCredentials {
  username: string;
  password: string;
}

const DEFAULT_AVATAR_FALLBACK = "avatar-7.webp";

type AuthErrorState = {
  message: string;
  error?: string | null;
  code?: number | string;
  details?: unknown;
};

// type AuthResponse = {
//   accessToken: string
//   refreshToken: string
//   user: User
// }

export const useAuthStore = defineStore(
  "auth",
  () => {
    const router = useRouter();
    const notificationStore = useNotificationStore();

    function updateToken(token: string | null) {
      if (token) {
        // apiClient. .defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        // delete apiClient.defaults.headers.common['Authorization']
      }
    }

    // --- State ---
    const accessToken = ref<string | null>(null);
    const refreshToken = ref<string | null>(null);
    const currentUser = ref<User | null>(null);
    const isLoading = ref<boolean>(false);
    const authError = ref<AuthErrorState | null>(null);
    const initialAuthCheckComplete = ref<boolean>(false);
    const isSignUpMode = ref<boolean>(false);
    const authDialogVisible = ref<boolean>(false);
    const eventManager = useEventManager(); // Get an instance of the event manager
    const transactionStore = useTransactionStore();
    const userStore = useUserStore();
    const vipStore = useVipStore();
    // --- Getters ---
    const isAuthenticated = computed(
      () => !!accessToken.value && !!currentUser.value
    );
    const userAvatar = computed(
      () => currentUser.value?.avatar || DEFAULT_AVATAR_FALLBACK
    );

    // --- Internal Core Logic ---

    function _setAccessToken(token: string | null) {
      accessToken.value = token;
      updateToken(token); // Update token in apiClient and localStorage
    }

    function _setRefreshToken(token: string | null) {
      refreshToken.value = token;
    }

    function _setCurrentUser(user: any | null) {
      if (user) {
        user.avatar == user.avatar || DEFAULT_AVATAR_FALLBACK;
        //console.log(user.avatar.charAt(7));
        if (user.avatar.charAt(7) == 0)
          user.avatar = user.avatar.slice(0, 7) + user.avatar.slice(7 + 1);
        //console.log(user.avatar);
        currentUser.value = { ...user };
        authError.value = null;
      } else {
        currentUser.value = null;
      }
    }
    function updateUserBalance(newBalance: number, changeAmount: number): void {
      if (currentUser.value?.activeWallet) {
        currentUser.value.activeWallet.balance = newBalance;

        // Emit a global event that the TopBarMobile component can listen to.
        eventManager.emit("balance:update", { changeAmount });
        console.log(
          `Auth Store: Emitted balance:update event with change of ${changeAmount}.`
        );
      }
    }
    // --- Auth Response Processing ---
    async function _processAuthResponse(
      responseData: PostAuthLoginResponses[200] | null
    ): Promise<boolean> {
      //console.log("y");
      //console.log(responseData);
      if (!responseData?.accessToken || !responseData.refreshToken) {
        return false;
      }
      //console.log("x");

      _setAccessToken(responseData.accessToken);
      transactionStore.setOperatorData(responseData.user.activeWallet.operator);
      //console.log("x");
      vipStore.setVipInfo(responseData.user.vipInfo);

      transactionStore.setTransactionHistory(
        responseData.user.activeWallet.transactions
      );
      //console.log("x");

      Cookies.set("access_token", responseData.accessToken);
      localStorage.setItem("accessToken", responseData.accessToken);

      client.interceptors.request.use((request, options) => {
        request.headers.set(
          "Authorization",
          `Bearer ${responseData.accessToken}`
        );
        // return request;
      });
      if (responseData.refreshToken) {
        _setRefreshToken(responseData.refreshToken);
      }
      //console.log("hydrating...");
      await hydrateStores();
      _setCurrentUser(responseData.user);

      return true;
    }

    function _clearAuthData() {
      _setAccessToken(null);
      _setRefreshToken(null);
      _setCurrentUser(null);
      // Clear persisted storage
      localStorage.removeItem("auth");
    }

    function _handleApiError(error: unknown, prefix: string): AuthErrorState {
      const defaultError = {
        message: `${prefix}: An unexpected error occurred`,
        error: "UNKNOWN_ERROR",
        code: "UNKNOWN",
      } as const;

      if (!error) {
        return defaultError;
      }

      // Handle ZodiosError
      if (typeof error === "object" && "response" in error) {
        const zodiosError = error as {
          response?: {
            status: number;
            data: {
              message?: string;
              error?: string;
              details?: unknown;
            };
          };
          message: string;
        };

        const status = zodiosError.response?.status;
        const data = zodiosError.response?.data || {};

        return {
          message: `${prefix}: ${data.message || zodiosError.message || "Unknown error"}`,
          error: data.error || "API_ERROR",
          code: status ? String(status) : "UNKNOWN",
          details: data.details,
        };
      }

      // Handle standard Error
      if (error instanceof Error) {
        return {
          message: `${prefix}: ${error.message}`,
          error: error.name,
          code: "ERROR",
        };
      }

      // Handle string errors
      if (typeof error === "string") {
        return {
          message: `${prefix}: ${error}`,
          error: "ERROR",
          code: "ERROR",
        };
      }

      return defaultError;
    }

    // --- Actions ---

    async function initializeAuth() {
      //console.log("AuthStore: Initializing auth...");
      if (initialAuthCheckComplete.value) return;

      // Load token from persisted state first (pinia-plugin-persistedstate)
      if (!accessToken.value) {
        accessToken.value = localStorage.getItem("accessToken");

      }
      //console.log(accessToken.value)
      if (!accessToken.value) {
        _clearAuthData();
        initialAuthCheckComplete.value = true;
        return;
      }
      Cookies.set(
        "access_token",
        accessToken.value,
        {
          isRemembered: true,
          domain: "localhost:3000",
          expires: 7,
        }
        // isRemembered
        //   ? {
        //       expires: loginDay
        //     }
      );
      document.cookie = "access_token=" + accessToken.value;
      client.interceptors.request.use((request, options) => {
        request.headers.set("Authorization", `Bearer ${accessToken.value}`);
        return request;
      });
      isLoading.value = true;
      // Token exists, validate it by fetching the user profile.
      try {
        // End any lingering game sessions from a previous login
        await apiClient.postApiSessionsEnd();
        const response = await fetchCurrentUser();
        if (response !== null && response !== undefined)
          _processAuthResponse({
            accessToken: response.accessToken,
            refreshToken: response.data.refreshToken,
            user: response.user,
          });
      } catch (e: any) {
        console.error("AuthStore: Initialization failed.", e.message);
        await logout(false); // Token is invalid, log out
      } finally {
        isLoading.value = false;
        initialAuthCheckComplete.value = true;
        if (currentUser.value !== null) hydrateStores.value = true;
      }
    }

    async function fetchCurrentUser(): Promise<
      GetMeResponse | undefined | null
    > {
      if (!accessToken.value) return null;

      isLoading.value = true;
      try {
        const response = await apiClient.getMeMe()
        if (response.data) {
          // _setCurrentUser(response.data.user)

          return response.data;
        } else {
          _setCurrentUser(null);
          return null;
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        _clearAuthData();
        return null;
      }
    }
    // async function myInterceptor(response) {
    //   const data = superjson.parse(await response.text());
    //   return data;
    // }
    async function signInWithPassword(creds: any): Promise<boolean> {
      try {
        // const interceptorId = client.interceptors.response.use(myInterceptor);

        const response = await apiClient.postAuthLogin({ body: creds });
        //console.log(response);
        let success = false;
        //console.log("asdf");
        if (response.data)
          success = await _processAuthResponse({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            user: response.data.user,
          });
        if (success) {
          notificationStore.addNotification(
            "success",
            "Successfully signed in!"
          );
        }
        return success;
      } catch (error) {
        const errorState = _handleApiError(error, "Sign in failed");
        notificationStore.addNotification("error", errorState.message);
        return false;
      }
    }

    async function signUpNewUser(payload: AuthCredentials): Promise<boolean> {
      try {
        const response = await apiClient.postAuthRegister({ body: payload });
        let success = false;
        if (response.error) {
          notificationStore.addNotification("error", response.error.error);
          return false;
        }
        if (response.data) success = _processAuthResponse(response.data);
        if (success) {
          notificationStore.addNotification(
            "success",
            "Account created successfully!"
          );
        }
        return success;
      } catch (error) {
        const errorState = _handleApiError(error, "Sign up failed");
        notificationStore.addNotification("error", errorState.message);
        return false;
      }
    }

    // async function signInWithGoogleIdToken(idToken: string): Promise<boolean> {
    //   try {
    //     const response = await apiClient.googleAuth({ token: idToken })
    //     const success = _processAuthResponse(response)
    //     if (success) {
    //       notificationStore.addNotification('success', 'Google sign-in successful!')
    //     }
    //     return success
    //   } catch (error) {
    //     const errorState = _handleApiError(error, 'Google sign in failed')
    //     notificationStore.addNotification('error', errorState.message)
    //     return false
    //   }
    // }

    async function logout(navigate = true) {
      const authStore = useAuthStore();
      try {
        // Call the logout endpoint
        await apiClient.postAuthLogout();
      } catch (error) {
        console.error("Error during logout:", error);
        // Continue with local cleanup even if API call fails
      } finally {
        // Clear local auth state
        _clearAuthData();

        // Clear any stored tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Reset the store
        // authStore.$reset()

        // Navigate to login if requested
        if (navigate) {
          const router = useRouter();
          router.push("/login");
        }

        notificationStore.addNotification("info", "You have been logged out.");
      }
    }

    // function updateUserBalance(newBalance: number): void {
    //   if (currentUser.value) {
    //     currentUser.value.activeWallet.balance = newBalance
    //   }
    // }

    function updateUserGameSession(id: string | null): void {
      if (currentUser.value) {
        currentUser.value.currentSessionDataId = id;
      }
    }

    function setUser(user: any) {
        currentUser.user = user;
    }

    function updateUser(user: any) {
        if (!currentUser) return;
        currentUser.balance = user.balance;
        currentUser.xp = user.xp;
        currentUser.stats = user.stats;
        currentUser.rakeback = user.rakeback;
        currentUser.mute = user.mute;
        currentUser.ban = user.ban;
        currentUser.verifiedAt = user.verifiedAt;
        currentUser.updatedAt = user.updatedAt;
    }

    return {
      // State
      accessToken,
      refreshToken,
      currentUser,
      isLoading,
      authError,
      initialAuthCheckComplete,
      isSignUpMode,
      authDialogVisible,
      hydrateStores,
      // Getters
      isAuthenticated,
      getCurrentUser: () => currentUser.value,
      userAvatar,
      // Actions
      initializeAuth,
      updateUser,
      setUser,
      fetchCurrentUser,
      signInWithPassword,
      signUpNewUser,
      // signInWithGoogleIdToken,
      logout,
      _clearAuthData,
      updateUserBalance,
      updateUserGameSession,
      toggleSignUpMode: () => {
        isSignUpMode.value = !isSignUpMode.value;
      },
      setSignUpMode: (mode: boolean) => {
        isSignUpMode.value = mode;
      },
      setAuthDialogVisible: (visible: boolean) => {
        authDialogVisible.value = visible;
      },
      clearAuthError: () => {
        authError.value = null;
      },
    };
  },
  {
    persist: {
      storage: localStorage,
      key: "auth-store",
      pick: ["accessToken", "refreshToken", "currentUser", "isSignUpMode"],
    },
  }
);
