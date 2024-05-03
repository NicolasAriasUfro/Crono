<template>
  <v-app>
    <v-tabs
      color="blue-grey-lighten-5"
      align-tabs="center"
      class="bg-blue-grey"
      center-active
    >
      <v-tab to="cronograma">Cronograma</v-tab>
      <v-tab to="mis-temporizadores">Mis Temporizadores</v-tab>
      <v-tab to="mis-cronogramas">Mis Cronogramas</v-tab>
      <v-tab to="configuracion">Configuración</v-tab>
    </v-tabs>
    <router-view />
    <v-footer>
      <span class="white--text">Made with ❤️ by @Nico</span>
    </v-footer>
  </v-app>
</template>

<style>
#app {
  text-align: center;
}
</style>
<script setup>
import { useScheduleStore } from "@/stores/SheduleStore";
useScheduleStore().loadFromLocalStorage();
</script>
