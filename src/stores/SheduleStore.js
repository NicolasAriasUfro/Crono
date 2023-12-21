import { defineStore } from "pinia";
export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    schedules: [
      {
        initialSecond: 5,
        initialMinute: 0,
        initialHour: 0,
        name: "5 segundos",
      },
      {
        initialSecond: 3,
        initialMinute: 0,
        initialHour: 0,
        name: "cambio de actividad",
      },
    ],
  }),
  getters: {
    lengthSchedules() {
      return this.schedules.length;
    },
  },
  actions: {},
});
