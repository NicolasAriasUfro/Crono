import { defineStore } from "pinia";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    selectedSchedule: 0,
    schedules: [
      {
        id: 1,
        name: "Cronograma",
        timers: [
          { id: 1, name: "bienvenida", initialSeconds: 90, actualSeconds: 90 },
        ],
      },
    ],
    /*
    schedules: {
      id: Number,
      name: String,
      schedule: {
        timer: {
          id: Number,
          name: String,
          initialSeconds: Number,
          actualSeconds: Number,
        },
      },
    },
     */
  }),
  getters: {
    lengthSchedules() {
      return this.schedules.length;
    },
  },
  actions: {
    addSchedule(name) {
      const newSchedule = {
        id: this.schedules.length + 1,
        name,
        timers: [],
      };
      this.schedules.push(newSchedule);
      return newSchedule;
    },
    removeSchedule(idSchedule) {
      const index = this.schedules.findIndex(
        (schedule) => schedule.id === idSchedule
      );
      if (index !== -1) {
        this.schedules.splice(index, 1);
      }
    },
    addTimer(timerName, initialSeconds) {
      console.log(timerName + initialSeconds);
      const newTimer = {
        id: this.schedules[this.selectedSchedule].timers.length + 1,
        name: timerName,
        initialSeconds,
        actualSeconds: initialSeconds,
      };
      this.schedules[0].timers.push(newTimer);
      return newTimer;
    },
    removeTimer(idSchedule, idTimer) {
      const schedule = this.schedules.find((s) => s.id === idSchedule);
      if (schedule) {
        const index = schedule.timers.findIndex(
          (timer) => timer.id === idTimer
        );
        if (index !== -1) {
          schedule.timers.splice(index, 1);
        }
      }
    },
    decreaseTimer(id, seconds) {
      this.schedules[id].actualSeconds -= seconds;
    },
    resetTimer(id) {
      this.schedules[id].actualSeconds = this.schedules[id].initialSeconds;
    },
  },
});
