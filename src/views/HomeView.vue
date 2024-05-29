<script setup>
import { useSessionStore } from "../stores/SessionStore";
import navBar from "../components/NavBar.vue";
import { ref } from "vue";
import router from '@/router';

const sessionStore = useSessionStore();
const userName = sessionStore.userName;
let login = ref(sessionStore.token != null);

const logIn = () => {
  router.push({ name: "auth" });
}
</script>

<template>
  <navBar />
  <div class="tabs-container">
    <v-tabs bg-color="primary_light_1" color="blue-grey-lighten-5" align-tabs="center" class="bg-blue-grey tabs"
      show-arrows center-active>
      <v-tab to="cronograma">Cronograma</v-tab>
      <v-tab to="mis-temporizadores">Mis Temporizadores</v-tab>
      <v-tab to="mis-cronogramas">Mis Cronogramas</v-tab>
      <v-tab to="configuracion">Configuración</v-tab>
    </v-tabs>
  </div>
  <div id="router-container">
    <RouterView />
  </div>
  <v-footer>
    <span class="white--text">Made with ❤️ by @Nico</span>
  </v-footer>
</template>

<style>
#router-container {
  min-height: 80%;
}

.tabs {
  min-height: 100%;
}
</style>
