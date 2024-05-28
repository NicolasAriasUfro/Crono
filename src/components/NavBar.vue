<script setup>
import { useSessionStore } from '@/stores/SessionStore';
import router from '@/router';

const sessionStore = useSessionStore();
const userName = sessionStore.userName;

const logOut = () => {
    sessionStore.$reset();
    router.push({ name: "auth" });
};

</script>

<template>
    <v-toolbar class="px-5" color="primary">
        <template v-slot:prepend>
            <div class="text-h5">CronoCoso</div>
        </template>
        <v-divider class="ms-3" inset vertical></v-divider>
        <v-toolbar-title class="text-left"> {{ userName }} </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn variant="text">Themes</v-btn>

            <v-divider vertical></v-divider>

            <v-btn @click="logOut" variant="text">Logout</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>