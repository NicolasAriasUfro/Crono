<script setup>
import { useSessionStore } from '@/stores/SessionStore';
import router from '@/router';
import ThemesSelector from "@/components/ThemesSelector.vue";

const sessionStore = useSessionStore();
const userName = sessionStore.userName;
const showThemes = false;


const logOut = () => {
    sessionStore.$reset();
    router.push({ name: "auth" });
};

const changeTheme = () => {

};

</script>

<template>
    <v-toolbar class="px-5" color="primary">
        <template v-slot:prepend>
            <div class="text-h5">CronoCoso</div>
        </template>
        <v-divider class="ms-3" color="background" inset vertical ></v-divider>
        <v-toolbar-title class="d-flex text-left align-center"> {{ userName }} </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <ThemesSelector />

            <v-divider vertical></v-divider>

            <v-btn @click="logOut" variant="text">Logout</v-btn>
        </v-toolbar-items>
        
    </v-toolbar>
</template>