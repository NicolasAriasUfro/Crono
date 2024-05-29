<script>
import { useScheduleStore } from "@/stores/SheduleStore";
import { useTheme } from "vuetify/lib/framework.mjs";

export default {
  data: () => ({
    theme: useTheme(),
  }),
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
    test() {
      this.theme.global.current.colors.primary;
    }
  },
};
</script>

<template>
  <div class="general-bar">
    <button v-if="useScheduleStore().paused" @click.prevent="generalPlay">
      <font-awesome-icon class="icon" icon="fa-solid fa-play" />
    </button>
    <button v-else @click.prevent="generalPause">
      <font-awesome-icon class="icon" icon="fa-solid fa-pause" />
    </button>
    <button @click.prevent="generalReset">
      <font-awesome-icon class="icon" icon="fa-solid fa-stop" />
    </button>
  </div>
</template>

<style scoped>
.general-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: v-bind("theme.current.colors.background");
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

.icon {
  color: var(--primary) !important;
}
</style>
