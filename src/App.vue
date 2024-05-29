<template>
  <v-app>
      <router-view />
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
import { useSessionStore } from "./stores/SessionStore";
import { onMounted, onUnmounted } from "vue";
import { useTheme } from "vuetify/lib/framework.mjs";

const theme = useTheme();
const sessionStore = useSessionStore();
useScheduleStore().loadFromLocalStorage();

const setTheme = () => {
  theme.global.name.value = sessionStore.theme;
}


onMounted(() => {
  useIntervalStore().startInterval(useScheduleStore().everySecond, 1000);
  setTheme();
});
onUnmounted(() => {
  useIntervalStore().stopInterval();
  useScheduleStore().saveToLocalStorage();
});
</script>
