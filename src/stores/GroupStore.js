import { defineStore } from "pinia";

export const useGroupStore = defineStore("group", {
    state: () => ({
        groups: [
            {
                index: 0,
                name: "ESP1",
                cronograma: [
                    {
                        id: 1,
                        name: "Cronograma",
                        lastTimerId: 0,
                        timers: [
                            {
                                id: 1,
                                name: "Inicio",
                                initialSeconds: "005",
                                actualSeconds: "005",
                            },
                            {
                                id: 2,
                                name: "Introducción",
                                initialSeconds: "180",
                                actualSeconds: "180",
                            },
                            {
                                id: 3,
                                name: "Objetivo",
                                initialSeconds: "180",
                                actualSeconds: "180",
                            },
                            {
                                id: 4,
                                name: "Motivación",
                                initialSeconds: "180",
                                actualSeconds: "180",
                            },
                            {
                                id: 5,
                                name: "Desarrollo",
                                initialSeconds: "60",
                                actualSeconds: "60",
                            },
                            {
                                id: 6,
                                name: "Tema 1",
                                initialSeconds: "300",
                                actualSeconds: "300",
                            },
                            {
                                id: 7,
                                name: "Tema 2",
                                initialSeconds: "300",
                                actualSeconds: "300",
                            },
                            {
                                id: 8,
                                name: "Interludio",
                                initialSeconds: "120",
                                actualSeconds: "120",
                            },
                            {
                                id: 10,
                                name: "Tema 3",
                                initialSeconds: "300",
                                actualSeconds: "300",
                            },
                            {
                                id: 11,
                                name: "Conclusión",
                                initialSeconds: "300",
                                actualSeconds: "300",
                            },
                            {
                                id: 12,
                                name: "Preguntas",
                                initialSeconds: "300",
                                actualSeconds: "300",
                            },
                        ],
                    },
                ],
            },
            {
                index: 1,
                name: "ISOFT ENTREGA FINAL",
                cronograma: [
                    {
                        id: 2,
                        name: "Cronograma",
                        lastTimerId: 0,
                        timers: [
                            {
                                id: 1,
                                name: "Inicio",
                                initialSeconds: "005",
                                actualSeconds: "005",
                            },
                        ],
                    },
                ],
            },
        ],
        paused: true,
        selectedSchedule: 0,
        selectedTimer: 0,
        lastScheduleId: 0,
        selectedGroup: 0
    }),
    actions: {
        getTimeOfSelectedTimer() {
            return this.groups[this.selectedGroup].cronograma[0].timers[
                this.selectedTimer
            ].actualSeconds;
        },
        everySecond() {
            if (!this.paused) {
                if (
                    this.groups[this.selectedGroup].cronograma[0].timers[
                        this.selectedTimer
                    ].actualSeconds <= 0
                ) {
                    this.selectNextTimer();
                } else {
                    this.groups[this.selectedGroup].cronograma[0].timers[
                        this.selectedTimer
                    ].actualSeconds--;
                }
            }
        },
        selectNextTimer() {
            //revisar si ya terminó
            if (
                this.selectedTimer >=
                this.groups[this.selectedGroup].cronograma[0].timers.length - 1
            ) {
                this.paused = true;
                console.log("terminó");
                this.selectedTimer = 0;
            } else {
                this.selectedTimer++;
            }
        },
        addTimer(nameTimer, initialSeconds) {
            this.schedules[this.selectedSchedule].lastTimerId++;
            //create the timer
            const newTimer = {
                id: this.schedules[this.selectedSchedule].lastTimerId,
                name: nameTimer,
                initialSeconds,
                actualSeconds: initialSeconds,
            };
            //add the timer
            this.schedules[this.selectedSchedule].timers.push(newTimer);
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
        removeTimerFromActiveSchedule(idTimer) {
            // Remove the timer from the default schedule
            console.log(idTimer);
            const schedule = this.schedules[this.selectedSchedule];
            const index = schedule.timers.findIndex(
                (timer) => timer.id === idTimer
            );
            if (index !== -1) {
                this.schedules[this.selectedSchedule].timers.splice(index, 1);
            }
        },
        decreaseTimer(idTimer, seconds) {
            const selectedSchedule =
                useGroupStore().schedules[this.selectedSchedule];
            const timerIndex = selectedSchedule.timers.findIndex(
                (t) => t.id === idTimer
            );

            if (timerIndex !== -1) {
                selectedSchedule.timers[timerIndex].actualSeconds -= seconds;
                // Puedes agregar lógica adicional aquí, como manejar el caso en que actualSeconds sea menor que 0.
            }
        },
        resetSchedule() {
            this.selectedTimer = 0;
            this.resetAllTimers();
        },
        resetTimer(idTimer) {
            const selectedSchedule = this.groups[this.selectedGroup].cronograma[0].timers[this.selectedSchedule];
            const timerIndex = selectedSchedule.timers.findIndex(
                (t) => t.id === idTimer
            );
            if (timerIndex !== -1) {
                selectedSchedule.timers[timerIndex].actualSeconds =
                    selectedSchedule.timers[timerIndex].initialSeconds;
            }
        },
        resetAllTimers() {
            //resetear todos los timer, igualar actualseconds a initialSecondos
            const timers = this.schedules[this.selectedSchedule].timers;
            for (let i = 0; i < timers.length; i++) {
                timers[i].actualSeconds = timers[i].initialSeconds;
            }
        },
        changeTimerName(idTimer, newName) {
            const selectedSchedule = this.schedules[this.selectedSchedule];
            const timerIndex = selectedSchedule.timers.findIndex(
                (t) => t.id === idTimer
            );
            if (timerIndex !== -1) {
                selectedSchedule.timers[timerIndex].name = newName;
            }
        },
    },
    persist: true,
});
