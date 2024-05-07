<script>
import { useScheduleStore } from "@/stores/SheduleStore";

export default {
  methods: {
    useScheduleStore,
    generalPause() {
      useScheduleStore().paused = true;
    },
    generalPlay() {
      useScheduleStore().paused = false;
    },
    generalReset() {
      this.generalPause();
      useScheduleStore().resetSchedule();
    },
  },
};
</script>

<template>
  <div class="general-bar">
    <button v-if="useScheduleStore().paused" @click.prevent="generalPlay">
      <font-awesome-icon icon="fa-solid fa-play" />
    </button>
    <button v-else @click.prevent="generalPause">
      <font-awesome-icon icon="fa-solid fa-pause" />
    </button>
    <button @click.prevent="generalReset">
      <font-awesome-icon icon="fa-solid fa-stop" />
    </button>
  </div>
</template>

<style scoped>
.general-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
}
button {
  background-color: transparent;
  border: none;
  font-size: larger;
  margin: 0 10px;
}
</style>
