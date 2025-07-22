import { defineStore } from "pinia";
import { useNotificationStore } from "./notification.store";
import { useTransactionStore } from "./transaction.store";
import { useUserStore } from "./user.store";
import { useEventManager } from "@/composables/EventManager";
import { useVipStore } from "./vip.store";
import { apiClient } from "../plugins/api";
import { client } from "@/plugins/api/gen/client.gen";
import { useRouter } from 'vue-router'
import type { GetMeResponse, PostLoginData, PostLoginResponse, PostLoginResponses, PostUsersResponse } from "@/plugins/api/gen";
import type { User, VipInfo, Wallet, Operator } from "@/types/interfaces";
// import type { Operator, User, VipInfo, Wallet } from "@/types/interfaces";

// --- Helper Function to set Authorization Header ---
// This function should be called ONCE when your app starts.
// It ensures every request from the `client` has the auth token if it exists.
export function setupAuthInterceptor(store: ReturnType<typeof useAuthStore>) {
  client.interceptors.request.use((request) => {
    if (store.accessToken) {
      console.log('setting accesstoken')
      console.log(store.accessToken)
      request.headers.set("Authorization", `Bearer ${store.accessToken}`);
    }
    return request;
  });
}

const DEFAULT_AVATAR_FALLBACK = "avatar-7.webp";

type AuthErrorState = {
  message: string;
  error?: string | null;
  code?: number | string;
  details?: unknown;
};
interface AuthCredentials {
  username: string;
  password: string;
}
export const useAuthStore = defineStore('auth', () => {

  const notificationStore = useNotificationStore();
  const transactionStore = useTransactionStore();
  const userStore = useUserStore();
  const vipStore = useVipStore();
  const eventManager = useEventManager()
  // --- State ---
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const currentUser = ref<User | null>();
  const isLoading = ref<boolean>(false);
  const hydrateStores = ref<boolean>(false);
  const authError = ref<AuthErrorState | null>(null);
  const initialAuthCheckComplete = ref<boolean>(false);
  const authDialogVisible = ref<boolean>(false);

  // --- Getters ---
  const isAuthenticated = computed(
    () => !!accessToken.value && !!currentUser.value
  );

  const userAvatar = computed(() => {
    if (currentUser.value?.avatar && currentUser.value.avatar.charAt(7) === '0') {
      return currentUser.value.avatar.slice(0, 7) + currentUser.value.avatar.slice(8);
    }
    return currentUser.value?.avatar || DEFAULT_AVATAR_FALLBACK;
  });

  // --- Internal Core Logic ---

  function _setCurrentUser(user: User | null) {
    if (user) {
      currentUser.value = { ...user };
      authError.value = null;
    } else {
      currentUser.value = null;
    }
  }

  /**
   * Processes successful auth data from login or the /me/me endpoint.
   * It intelligently handles the different data structures from each endpoint.
   */
  function _hydrateUserAndStores(data: {
    user: User;
    vipInfo?: Partial<VipInfo>;
    wallet?: Partial<Wallet>;
    operator?: Partial<Operator>;
    accessToken?: string;
    refreshToken?: string;
  }) {
    if (data.accessToken) {
      accessToken.value = data.accessToken;
    }
    if (data.refreshToken) {
      refreshToken.value = data.refreshToken;
    }

    const user = data.user;
    // The `/me/me` response provides wallet and vipInfo at the top level.
    // The `/auth/login` response nests them inside the user object (`activeWallet`).
    // We prioritize the explicit top-level data from `/me/me` if it exists.
    const walletData = data.wallet ?? (user as any).activeWallet;
    const vipInfoData = data.vipInfo ?? (user as any).vipInfo;
    const operatorData = data.operator ?? walletData?.operator;

    // Crucially, preserve transactions, which only come from the login call's `activeWallet`.
    // The `getMeMe` response doesn't have them, so we only update from the login data.
    const transactions = walletData?.transactions;

    if (user && walletData && vipInfoData && operatorData) {
      console.log('performing hydration')
      _setCurrentUser(user);
      transactionStore.setOperatorData(operatorData);
      vipStore.setVipInfo(vipInfoData);
      if (transactions) {
        transactionStore.setTransactionHistory(transactions);
      }
      hydrateStores.value = true
    } else {
      console.error("Authentication response is missing critical user data.", { data });
      _clearAuthDataAndLogout();
      return false;
    }

    return true;
  }

  function _clearAuthDataAndLogout(navigate = false) {
    accessToken.value = null;
    refreshToken.value = null;
    currentUser.value = null;
    if (navigate) {
      // router.push("/login");
    }
  }

  function _handleApiError(error: unknown, prefix: string): AuthErrorState {
    const defaultError = { message: `${prefix}: An unexpected error occurred`, error: "UNKNOWN_ERROR", code: "UNKNOWN" } as const;
    if (!error) return defaultError;
    if (typeof error === 'object' && 'response' in error) {
      const zodiosError = error as { response?: { status: number; data: any; }; message: string; };
      const status = zodiosError.response?.status;
      const data = zodiosError.response?.data || {};
      return {
        message: `${prefix}: ${data.message || data.error || zodiosError.message || "Unknown API error"}`,
        error: data.error || "API_ERROR",
        code: status ? String(status) : "UNKNOWN",
        details: data.details,
      };
    }
    if (error instanceof Error) {
      return { message: `${prefix}: ${error.message}`, error: error.name, code: 'ERROR' };
    }
    return defaultError;
  }

  // --- Actions ---
  async function initializeAuth() {
    console.log("initializeAuth")
    if (initialAuthCheckComplete.value) return;
    if (!accessToken.value) {
      console.log('no accessToken')
      initialAuthCheckComplete.value = true;
      return;
    }
    isLoading.value = true;
    try {
      const _meResponse = await apiClient.getMe();
      if (_meResponse.error) {
        return
      }
      const meResponse = _meResponse.data as GetMeResponse
      if (meResponse.user) {
        _hydrateUserAndStores({
          user: meResponse.user,
          vipInfo: meResponse.vipInfo as VipInfo,
          wallet: meResponse.wallet,
          operator: meResponse.operator
        });
      } else {
        throw new Error("Invalid session data from /me/me endpoint");
      }
    } catch (e) {
      console.error("AuthStore: Initialization failed, token might be expired.", e);
      logout();
    } finally {
      isLoading.value = false;
      initialAuthCheckComplete.value = true;
    }
  }

  /**
   * Signs in the user, gets fresh data from /me/me, and hydrates the state.
   */
  async function signInWithPassword(creds: unknown): Promise<boolean> {
    isLoading.value = true;
    authError.value = null;
    try {
      // Step 1: Login to get tokens and initial user data (with transaction history).
      //@ts-ignore
      const _loginResponse = await apiClient.postAuthLogin({ body: creds });
      if (_loginResponse.error) {
        return false
      }
      const loginResponse = _loginResponse.data as PostLoginResponse
      // Step 2: Set the access token immediately. The interceptor now has it for the next call.
      // Also hydrate with the login data first to capture the transaction list.
      console.log(loginResponse)
      if (!loginResponse.token) {
        throw new Error("Login response was incomplete or malformed.");
      }
      accessToken.value = loginResponse.token

      // Step 3: Call getMeMe() to get the freshest, most complete user data.
      const _meResponse = await apiClient.getMe();
      if (_meResponse.error) {
        return false
      }
      const meResponse = _meResponse.data as GetMeResponse

      // Step 4: Re-hydrate the stores with the comprehensive data from getMeMe.
      // This ensures the state is the absolute freshest post-login.
      _hydrateUserAndStores({
        user: meResponse.user,
        vipInfo: meResponse.vipInfo,
        wallet: meResponse.wallet,
        operator: meResponse.operator,
        // Carry over tokens, as getMeMe doesn't return them
        accessToken: accessToken.value as string,
        refreshToken: refreshToken.value as string
      });

      notificationStore.addNotification("success", "Successfully signed in!");
      return true;

    } catch (error) {
      authError.value = _handleApiError(error, "Sign in failed");
      notificationStore.addNotification("error", authError.value.message);
      _clearAuthDataAndLogout();
      return false;
    } finally {
      isLoading.value = false;
    }
  }
  // Add this interface if it's not already present in your store file.
  // It's based on the original file you provided.


  /**
   * Registers a new user, automatically logs them in, and hydrates the application state.
   */
  async function signUpNewUser(creds: AuthCredentials): Promise<boolean> {
    isLoading.value = true;
    authError.value = null;
    try {
      // Step 1: Register the new user.
      const _registerResponse = await apiClient.postSignup({ body: creds });
      if (_registerResponse.error) {
        // Assuming the error is handled in _handleApiError
        throw _registerResponse.error;
      }
      const registerResponse = _registerResponse.data as { token: string };

      if (!registerResponse.token) {
        throw new Error("Registration response did not include a token.");
      }

      // Step 2: Set the access token immediately.
      accessToken.value = registerResponse.token;

      // Step 3: Call getMe() to get the freshest, most complete user data.
      const _meResponse = await apiClient.getMe();
      if (_meResponse.error) {
        throw _meResponse.error;
      }
      const meResponse = _meResponse.data as GetMeResponse;

      // Step 4: Hydrate the stores with the comprehensive data from getMe.
      const success = _hydrateUserAndStores({
        user: meResponse.user,
        vipInfo: meResponse.vipInfo,
        wallet: meResponse.wallet,
        operator: meResponse.operator,
        accessToken: accessToken.value,
        refreshToken: refreshToken.value ?? undefined, // This might be null, which is fine
      });

      if (!success) {
        throw new Error("Failed to hydrate user stores after registration.");
      }

      notificationStore.addNotification("success", "Account created! You are now logged in.");
      return true;

    } catch (error) {
      authError.value = _handleApiError(error, "Sign up failed");
      notificationStore.addNotification("error", authError.value.message);
      _clearAuthDataAndLogout(); // Ensure no partial auth state remains on failure
      return false;
    } finally {
      isLoading.value = false;
    }
  }
  function setUser(user: any) {
    currentUser.value = user;
  }

  function updateUserVipInfo(key: string, value: any) {
    if (!currentUser) return;
    (currentUser.value as any)['vipInfo'][key] = value;
    // eventManager.emit("balance:update", {  newBalance });

  }
  function updateUser(key: string, value: any) {
    if (!currentUser) return;
    (currentUser.value as any)[key] = value;
  }
  function updateUserBalance(newBalance: number): void {
    if (currentUser.value) {
      currentUser.value.balance = newBalance;

      // Emit a global event that the TopBarMobile component can listen to.
      eventManager.emit("balance:update", { newBalance });
      console.log(
        `Auth Store: Emitted balance:update event with change of ${newBalance}.`
      );
    }
  }
  async function logout() {
    const navigate = true
    try {
      await apiClient.postLogout();
    } catch (error) {
      console.error("Server logout failed, clearing local state anyway.", error);
    } finally {
      _clearAuthDataAndLogout(navigate);
      notificationStore.addNotification("info", "You have been logged out.");
    }
  }
  // ... other actions
  return {
    setUser,
    updateUserVipInfo,
    updateUserBalance,
    updateUser,
    accessToken,
    refreshToken,
    currentUser,
    isLoading,
    authError,
    initialAuthCheckComplete,
    authDialogVisible,
    isAuthenticated,
    userAvatar,
    initializeAuth,
    signInWithPassword,
    signUpNewUser,
    logout,
    hydrateStores,
    setAuthDialogVisible: (visible: boolean) => { authDialogVisible.value = visible; },
    clearAuthError: () => { authError.value = null; },
  };
},
  {
    // @ts-ignore
    persist: {
      storage: localStorage,
      key: "auth-store",
      pick: ["accessToken", "refreshToken", "currentUser", "isSignUpMode"],
    },
  }
);