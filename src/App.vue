<template>
  <v-app>
    <v-tabs
      color="blue-grey-lighten-5"
      align-tabs="center"
      class="bg-blue-grey"
      center-active
    >
      <v-tab to="auth">login</v-tab>
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
import { useIntervalStore } from "@/stores/IntervalStore";
import { useScheduleStore } from "@/stores/SheduleStore";
import { onMounted, onUnmounted } from "vue";
useScheduleStore().loadFromLocalStorage();

onMounted(() => {
  useIntervalStore().startInterval(useScheduleStore().everySecond, 1000);
});
onUnmounted(() => {
  useIntervalStore().stopInterval();
  useScheduleStore().saveToLocalStorage();
});
</script>
