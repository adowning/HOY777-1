
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Notification {
    id: string;
    type?: string;
    message: string;
}

export const useNotificationStore = defineStore('notifications', () => {
    const notifications = ref<Notification[]>([]);

    function show(data: { type?: string; message: string }) {
        const notification: Notification = {
            id: Math.random().toString(36).substr(2, 9),
            ...data
        };

        if (notifications.value.length >= 4) {
            notifications.value.shift();
        }
        notifications.value.push(notification);
    }

    function remove(notification: Notification) {
        const index = notifications.value.findIndex((n) => n.id === notification.id);
        if (index !== -1) {
            notifications.value.splice(index, 1);
        }
    }

    return {
        notifications,
        show,
        remove
    };
});
