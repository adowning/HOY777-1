import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useSocketStore } from './socket';
import { useNotificationStore } from './notifications';
import { useModalsStore } from './modals';

interface BattlesGameData {
    game: any | null;
    loading: boolean;
}

export const useBattlesStore = defineStore('battles', () => {
    const filterSortGames = ref('date');
    const filterSortCases = ref('highest');
    const filterSearch = ref('');
    const filterPrice = ref('ALL');
    const filterMode = ref('1v1');
    const filterType = ref('standard');
    const filterLevel = ref(0);
    const filterFunding = ref(0);
    const filterPrivate = ref(false);
    const filterAffiliate = ref(false);
    const filterCursed = ref(false);
    const filterTerminal = ref(false);
    const boxes = ref<any[]>([]);
    const games = ref<any[]>([]);
    const history = ref<any[]>([]);
    const selected = ref<any[]>([]);
    const gameData = reactive<BattlesGameData>({
        game: null,
        loading: false
    });

    const router = useRouter();
    const socketStore = useSocketStore();
    const notificationsStore = useNotificationStore();
    const modalsStore = useModalsStore();

    function setFilterSortGames(value: string) {
        filterSortGames.value = value;
    }

    function setFilterSortCases(value: string) {
        filterSortCases.value = value;
    }

    function setFilterSearch(value: string) {
        filterSearch.value = value;
    }

    function setFilterPrice(value: string) {
        filterPrice.value = value;
    }

    function setFilterMode(value: string) {
        filterMode.value = value;
    }

    function setFilterType(value: string) {
        filterType.value = value;
    }

    function setFilterLevel(value: number) {
        filterLevel.value = value;
    }

    function setFilterFunding(value: number) {
        filterFunding.value = value;
    }

    function setFilterPrivate(value: boolean) {
        filterPrivate.value = value;
    }

    function setFilterAffiliate(value: boolean) {
        filterAffiliate.value = value;
    }

    function setFilterCursed(value: boolean) {
        filterCursed.value = value;
    }

    function setFilterTerminal(value: boolean) {
        filterTerminal.value = value;
    }

    function resetFilter() {
        setFilterMode('1v1');
        setFilterType('standard');
        setFilterLevel(0);
        setFilterFunding(0);
        setFilterPrivate(false);
        setFilterAffiliate(false);
        setFilterCursed(false);
        setFilterTerminal(false);
        emptySelected();
    }

    function addSelected(item: any) {
        selected.value.push(item);
    }

    function removeSelected(box: any) {
        const index = selected.value.findIndex((element) => element._id === box._id);
        if (index !== -1) {
            selected.value.splice(index, 1);
        }
    }

    function emptySelected() {
        selected.value = [];
    }

    function setGameData(game: any) {
        gameData.game = game;
    }

    function socketInit(data: { boxes: any[], history: any[], games: any[] }) {
        boxes.value = data.boxes;
        history.value = data.history;
        games.value = data.games;
    }

    function socketGame(data: { game: any }) {
        if (!data.game.options.private) {
            if (data.game.state !== 'completed') {
                if (games.value.some((g) => g._id === data.game._id)) {
                    const index = games.value.findIndex((g) => g._id === data.game._id);
                    games.value.splice(index, 1, data.game);
                } else {
                    games.value.push(data.game);
                }
            } else {
                const index = games.value.findIndex((g) => g._id === data.game._id);
                if (index !== -1) {
                    games.value.splice(index, 1);
                }
                history.value.unshift(data.game);
                if (history.value.length > 4) {
                    history.value.pop();
                }
            }
        }

        if (gameData.game && gameData.game._id === data.game._id) {
            gameData.game = { ...data.game, boxes: gameData.game.boxes };
        }
    }

    function getGameData(data: any) {
        if (!socketStore.battles || gameData.loading) return;
        gameData.loading = true;
        socketStore.battles.emit('getGameData', data, (res: any) => {
            if (res.success) {
                gameData.game = res.game;
            } else {
                notificationsStore.show(res.error);
            }
            gameData.loading = false;
        });
    }

    function sendCreate(data: any) {
        if (!socketStore.battles || socketStore.sendLoading) return;
        socketStore.setSendLoading('BattlesCreate');
        socketStore.battles.emit('sendCreate', data, (res: any) => {
            if (res.success) {
                modalsStore.setShow(null);
                router.push({ path: '/battles/' + res.game._id });
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendBot(data: any) {
        if (!socketStore.battles || socketStore.sendLoading) return;
        socketStore.setSendLoading('BattlesBot');
        socketStore.battles.emit('sendBot', data, (res: any) => {
            if (!res.success) {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    function sendJoin(data: any) {
        if (!socketStore.battles || socketStore.sendLoading) return;
        socketStore.setSendLoading('BattlesJoin');
        socketStore.battles.emit('sendJoin', data, (res: any) => {
            if (res.success) {
                router.push({ path: '/battles/' + data.gameId });
            } else {
                notificationsStore.show(res.error);
            }
            socketStore.setSendLoading(null);
        });
    }

    return {
        filterSortGames,
        filterSortCases,
        filterSearch,
        filterPrice,
        filterMode,
        filterType,
        filterLevel,
        filterFunding,
        filterPrivate,
        filterAffiliate,
        filterCursed,
        filterTerminal,
        boxes,
        games,
        history,
        selected,
        gameData,
        setFilterSortGames,
        setFilterSortCases,
        setFilterSearch,
        setFilterPrice,
        setFilterMode,
        setFilterType,
        setFilterLevel,
        setFilterFunding,
        setFilterPrivate,
        setFilterAffiliate,
        setFilterCursed,
        setFilterTerminal,
        resetFilter,
        addSelected,
        removeSelected,
        emptySelected,
        setGameData,
        socketInit,
        socketGame,
        getGameData,
        sendCreate,
        sendBot,
        sendJoin
    };
}, {
    persist: true
});