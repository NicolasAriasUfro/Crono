import { defineStore } from "pinia";

export const useSessionStore = defineStore('session', {
    state: () => {
        return {
            token: null,
            userName: null,
        };
    },
    persist: true,
})