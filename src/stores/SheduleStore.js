import { defineStore } from "pinia";
export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    schedules: [
      {
        initialSecond: 0,
        initialMinute: 15,
        initialHour: 0,
        name: "música previa",
      },
      {
        initialSecond: 0,
        initialMinute: 2,
        initialHour: 0,
        name: "bienvenida",
      },
      {
        initialSecond: 0,
        initialMinute: 7,
        initialHour: 0,
        name: "dinámica",
      },
    ],
  }),
  getters: {
    lengthSchedules() {
      return this.schedules.length;
    },
  },
  actions: {
    addTimer(name, initialHour, initialMinute, initialSecond) {
      this.schedules.push({
        initialSecond,
        initialMinute,
        initialHour,
        name,
      });
    },
  },
});
