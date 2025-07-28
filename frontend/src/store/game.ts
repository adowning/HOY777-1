import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type * as Game from "@/interface/game";
import { useApi } from '@/composables/useApi';
import { authStore } from "@/store/auth";
import { appBarStore } from "@/store/appBar";

type dialogType = "login" | "signup";

export const gameStore = defineStore('game', () => {
  const success = ref(false);
  const errMessage = ref('');
  const gameCategories = ref<Array<Game.Category>>([]);
  const gameProviders = ref<Array<Game.Category>>([]);
  const gameSearchList = ref<Game.GameSearchResponse>({ list: [], total: 0 });
  const enterGameItem = ref<Game.GameEnterResponse>({ method: "", parames: "", provider: "", reserve: "", weburl: "" });
  const searchGameDialogShow = ref(false);
  const mobileMenuShow = ref(true);
  const searchTextList = ref<Array<string>>([]);
  const gameFilterText = ref("");
  const originalGames = ref<Array<Game.Search>>([]);
  const gameHistoryItem = ref<Game.GameHistoryResponse>({ total_pages: 0, record: [] });
  const userSpinPage = ref({});
  const userSpin = ref({});
  const language = ref(localStorage.getItem('lang') || 'en');
  const betby = ref<any>(null);
  const gameBigWinItem = ref<Game.GameBigWinData>({ high_rollers: [], lucky_bets: [] });
  const favoriteGameList = ref<Array<number | string>>([]);

  const { get, post, apiRoutes } = useApi();

  const getSuccess = computed(() => success.value);
  const getErrMessage = computed(() => errMessage.value);
  const getGameCategories = computed(() => gameCategories.value);
  const getGameProviders = computed(() => gameProviders.value);
  const getGameSearchList = computed(() => gameSearchList.value);
  const getEnterGameItem = computed(() => enterGameItem.value);
  const getSearchGameDialogShow = computed(() => searchGameDialogShow.value);
  const getSearchTextList = computed(() => searchTextList.value);
  const getGameFilterText = computed(() => gameFilterText.value);
  const getOriginalGames = computed(() => originalGames.value);
  const getMobileMenuShow = computed(() => mobileMenuShow.value);
  const getGameHistoryItem = computed(() => gameHistoryItem.value);
  const getUserSpinPage = computed(() => userSpinPage.value);
  const getUserSpin = computed(() => userSpin.value);
  const getLanguage = computed(() => language.value);
  const getGameBigWinItem = computed(() => gameBigWinItem.value);
  const getFavoriteGameList = computed(() => favoriteGameList.value);

  const setSuccess = (value: boolean) => {
    success.value = value;
  };
  const setErrorMessage = (message: string) => {
    errMessage.value = message;
  };
  const setGameCategories = (categories: Array<Game.Category>) => {
    gameCategories.value = categories;
  };
  const setGameProviders = (providers: Array<Game.Category>) => {
    gameProviders.value = providers;
  };
  const setGameSearchList = (list: Game.GameSearchResponse) => {
    gameSearchList.value = list;
  };
  const setGameEnterItem = (item: Game.GameEnterResponse) => {
    enterGameItem.value = item;
  };
  const setSearchGameDialogShow = (show: boolean) => {
    searchGameDialogShow.value = show;
  };
  const setSearchTextList = (text: string) => {
    const sameSearchText = searchTextList.value.filter(item => item == text);
    if (sameSearchText.length == 0) {
      searchTextList.value.push(text);
    }
  };
  const removeSearchTextList = (index: number) => {
    searchTextList.value.splice(index, 1);
  };
  const removeAllSearchTextList = () => {
    searchTextList.value = [];
  };
  const setGameFilterText = (text: string) => {
    gameFilterText.value = text;
  };
  const setOriginalGames = (games: Array<Game.Search>) => {
    originalGames.value = games;
  };
  const setMobileMenuShow = (show: boolean) => {
    mobileMenuShow.value = show;
  };
  const setGameHistoryItem = (item: Game.GameHistoryResponse) => {
    gameHistoryItem.value = item;
  };
  const setUserSpinPage = (page: any) => {
    userSpinPage.value = page;
  };
  const setUserSpin = (spin: any) => {
    userSpin.value = spin;
  };
  const setLanguage = (lang: string) => {
    language.value = lang;
  };
  const setFavoriteGameList = (list: Array<number | string>) => {
    favoriteGameList.value = list;
  };
  const openDialog = (type: dialogType) => {
    const { setAuthModalType, setAuthDialogVisible } = authStore();
    const { setOverlayScrimShow } = appBarStore();
    setAuthModalType(type);
    setAuthDialogVisible(true);
    setOverlayScrimShow(false);
  };
  const closeKill = () => {
    betby.value?.kill();
  };
  const setGameBigWinItem = (item: Game.GameBigWinData) => {
    gameBigWinItem.value = item;
  };

  const getGameBetbyInit = async () => {
    if (!enterGameItem.value.reserve) {
      await dispatchGameEnter({ id: '9999', demo: false });
    }
    betby.value = new BTRenderer().initialize({
      token: enterGameItem.value.reserve || '',
      lang: language.value,
      target: document.getElementById('betby'),
      brand_id: import.meta.env.VITE_BRAND_ID,
      betSlipOffsetTop: 0,
      betslipZIndex: 999,
      themeName: "default",
      onLogin: () => {
        openDialog('login');
      },
      onRegister: () => {
        openDialog('signup');
      },
      onTokenExpired: async () => {
        closeKill();
        await dispatchGameEnter({ id: '9999', demo: false });
        await getGameBetbyInit();
      },
      onSessionRefresh: async () => {
        closeKill();
        await getGameBetbyInit();
      }
    });
  };

  const dispatchGameCategories = async (sub_api: string) => {
    try {
      setSuccess(false);
      const response = await get<Game.GetGameCategoriesResponse>(`${apiRoutes.GAME_INFO.GAME_CATEGORY}${sub_api}`);
      if (sub_api == "?type=providers") {
        setGameProviders(response.data);
      } else {
        setGameCategories(response.data);
      }
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchGameSearch = async (sub_api: string) => {
    try {
      setSuccess(false);
      const response = await get<Game.GetGameSearchResponse>(`${apiRoutes.GAME_INFO.GAME_SEARCH}${sub_api}`);
      setGameSearchList(response.data);
      setSuccess(true);
    } catch (error: any) {
      setGameSearchList({ list: [], total: 0 });
      setErrorMessage(error);
    }
  };

  const dispatchUserGame = async (data: Game.GameUserBody) => {
    try {
      setSuccess(false);
      const response = await post<Game.GetGameSearchResponse>(apiRoutes.GAME_INFO.USER_GAME, data);
      setGameSearchList(response.data);
      setSuccess(true);
    } catch (error: any) {
      setGameSearchList({ list: [], total: 0 });
      setErrorMessage(error);
    }
  };

  const dispatchFavoriteGame = async (data: any) => {
    try {
      setSuccess(false);
      await post(apiRoutes.GAME_INFO.FAVORITE_GAME, data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchGameEnter = async (data: Game.GameEnterBody) => {
    try {
      setSuccess(false);
      const response = await post<Game.GetGameEnterResponse>(apiRoutes.GAME_INFO.GAME_ENTER, data);
      setErrorMessage("");
      setGameEnterItem(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchGameHistory = async (data: any) => {
    try {
      setSuccess(false);
      const response = await get<Game.GetGameHistoryResponse>(apiRoutes.GAME_INFO.GAME_HISTORY, data);
      setGameHistoryItem(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchUserSpinPage = async (data: any) => {
    try {
      setSuccess(false);
      const response = await get<any>(apiRoutes.GAME_INFO.SPINPAGE, data);
      setUserSpinPage(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchUserSpin = async () => {
    try {
      setSuccess(false);
      const response = await get<any>(apiRoutes.GAME_INFO.SPIN);
      setUserSpin(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchGameBigWin = async () => {
    try {
      setSuccess(false);
      const response = await get<Game.GetGameBigWinResponse>(apiRoutes.GAME_INFO.GAME_BIGWIN);
      setGameBigWinItem(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const dispatchGameFavoriteList = async () => {
    try {
      setSuccess(false);
      const response = await get<Game.GetGameFavoriteListResponse>(apiRoutes.GAME_INFO.FAVORITE_GAME_LIST);
      setFavoriteGameList(response.data);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    success,
    errMessage,
    gameCategories,
    gameProviders,
    gameSearchList,
    enterGameItem,
    searchGameDialogShow,
    mobileMenuShow,
    searchTextList,
    gameFilterText,
    originalGames,
    gameHistoryItem,
    userSpinPage,
    userSpin,
    language,
    betby,
    gameBigWinItem,
    favoriteGameList,
    getSuccess,
    getErrMessage,
    getGameCategories,
    getGameProviders,
    getGameSearchList,
    getEnterGameItem,
    getSearchGameDialogShow,
    getSearchTextList,
    getGameFilterText,
    getOriginalGames,
    getMobileMenuShow,
    getGameHistoryItem,
    getUserSpinPage,
    getUserSpin,
    getLanguage,
    getGameBigWinItem,
    getFavoriteGameList,
    setSuccess,
    setErrorMessage,
    setGameCategories,
    setGameProviders,
    setGameSearchList,
    setGameEnterItem,
    setSearchGameDialogShow,
    setSearchTextList,
    removeSearchTextList,
    removeAllSearchTextList,
    setGameFilterText,
    setOriginalGames,
    setMobileMenuShow,
    setGameHistoryItem,
    setUserSpinPage,
    setUserSpin,
    setLanguage,
    setFavoriteGameList,
    openDialog,
    closeKill,
    setGameBigWinItem,
    getGameBetbyInit,
    dispatchGameCategories,
    dispatchGameSearch,
    dispatchUserGame,
    dispatchFavoriteGame,
    dispatchGameEnter,
    dispatchGameHistory,
    dispatchUserSpinPage,
    dispatchUserSpin,
    dispatchGameBigWin,
    dispatchGameFavoriteList,
  };
});