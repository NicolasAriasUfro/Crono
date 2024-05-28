<template>
  <v-app background-color="primary">
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
import { onMounted, onUnmounted, ref } from "vue";

useScheduleStore().loadFromLocalStorage();

onMounted(() => {
  useIntervalStore().startInterval(useScheduleStore().everySecond, 1000);
});
onUnmounted(() => {
  useIntervalStore().stopInterval();
  useScheduleStore().saveToLocalStorage();
});
</script>
