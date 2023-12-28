import { defineStore } from "pinia";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    selectedSchedule: 0,
    selectedTimer: 0,
    schedules: [
      {
        id: 1,
        name: "Cronograma",
        timers: [
          { id: 1, name: "bienvenida", initialSeconds: 5, actualSeconds: 5 },
        ],
      },
    ],
    paused: true,
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
    decreaseTimer(idTimer, seconds) {
      const selectedSchedule =
        useScheduleStore().schedules[this.selectedSchedule];
      const timerIndex = selectedSchedule.timers.findIndex(
        (t) => t.id === idTimer
      );

      if (timerIndex !== -1) {
        selectedSchedule.timers[timerIndex].actualSeconds -= seconds;
        // Puedes agregar lógica adicional aquí, como manejar el caso en que actualSeconds sea menor que 0.
      }
    },
    resetTimer(idTimer) {
      const selectedSchedule =
        useScheduleStore().schedules[this.selectedSchedule];
      const timerIndex = selectedSchedule.timers.findIndex(
        (t) => t.id === idTimer
      );

      if (timerIndex !== -1) {
        const initialSeconds =
          selectedSchedule.timers[timerIndex].initialSeconds;
        selectedSchedule.timers[timerIndex].actualSeconds = initialSeconds;
      }
    },
  },
});
