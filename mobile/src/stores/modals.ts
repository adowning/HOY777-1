
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalsStore = defineStore('modals', () => {
    const show = ref<string | null>(null);
    const data = ref<any | null>(null);

    function setShow(newShow: string | null) {
        show.value = newShow;
    }

    function setData(newData: any) {
        data.value = newData;
    }

    return {
        show,
        data,
        setShow,
        setData
    };
}, {
    persist: true
});
