import { defineStore } from "pinia";
export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    schedules: [
      {
        initialSeconds: 2,
        actualSeconds: 2,
        name: "intro",
      },
      {
        initialSeconds: 5,
        actualSeconds: 5,
        name: "interludio",
      },
      {
        initialSeconds: 3,
        actualSeconds: 3,
        name: "final",
      },
    ],
  }),
  getters: {
    lengthSchedules() {
      return this.schedules.length;
    },
  },
  actions: {
    addTimer(name, initialSeconds) {
      this.schedules.push({
        name,
        initialSeconds: initialSeconds,
        actualSeconds: initialSeconds,
      });
    },
    decreaseTimer(id, seconds) {
      this.schedules[id].actualSeconds -= seconds;
    },
    resetTimer(id) {
      this.schedules[id].actualSeconds = this.schedules[id].initialSeconds;
    },
  },
});
