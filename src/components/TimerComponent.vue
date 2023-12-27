<script>
import { ref } from "@vue/reactivity";
import { useScheduleStore } from "@/stores/SheduleStore";

export default {
  props: {
    idTimer: {
      type: Number,
      default: null,
    },
  },
  expose: ["startTimer", "pauseManager", "resetTimer"],
  data() {
    return {
      timerOptions: ["priorizada", "normal", "baja"],
      paused: true,
      started: false,
      timerInterval: null,
      esPrioritaria: false,
      isDeleted: false,
    };
  },
  computed: {
    formattedActualTime() {
      const seconds = this.actualSeconds;
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formattedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    },
    formattedInitialTime() {
      const seconds = this.initialSeconds;
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formattedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    },
    name() {
      const selectedSchedule =
        useScheduleStore().schedules[useScheduleStore().selectedSchedule];
      const timer = selectedSchedule.timers.find((t) => t.id === this.idTimer);

      return timer ? timer.name : 0;
    },
    actualSeconds() {
      const selectedSchedule =
        useScheduleStore().schedules[useScheduleStore().selectedSchedule];
      const timer = selectedSchedule.timers.find((t) => t.id === this.idTimer);

      return timer ? timer.actualSeconds : 0;
    },
    initialSeconds() {
      const selectedSchedule =
        useScheduleStore().schedules[useScheduleStore().selectedSchedule];
      const timer = selectedSchedule.timers.find((t) => t.id === this.idTimer);

      return timer ? timer.initialSeconds : 0;
    },
  },
  methods: {
    ref,
    timer() {
      this.timerInterval = setInterval(() => {
        if (this.actualSeconds <= 0) {
          this.started = false;
          this.paused = true;
          clearInterval(this.timerInterval);
          this.$emit("timer-finished", this.idTimer);
        } else {
          const store = useScheduleStore();
          store.decreaseTimer(this.idTimer, 1);
        }
      }, 1000);
    },
    startTimer() {
      this.second = this.initialSecond;
      this.started = true;

      this.paused = false;
      this.timer();
    },
    pauseManager() {
      if (this.paused) {
        this.paused = false;
        this.started = true;
        this.timer();
      } else {
        this.paused = true;
        clearInterval(this.timerInterval);
      }
    },
    resetTimer() {
      clearInterval(this.timerInterval);
      this.paused = true;
      this.started = false;
      useScheduleStore().resetTimer(this.idTimer);
    },
  },
};
</script>

<template>
  <v-card
    elevated
    ma-2
    class="timer rounded"
    :class="{
      priorizada: esPrioritaria,
      eliminada: isDeleted,
      startedTimer: started,
      'bg-green': started,
      'elevation-20': started,
    }"
  >
    <v-row>
      <v-col>
        <h3>{{ name }}</h3>
        <strong> {{ formattedActualTime }} / {{ formattedInitialTime }}</strong>
      </v-col>
      <v-col><v-select :items="timerOptions"> </v-select></v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
* {
  //border: orangered 1px solid;
}
.priorizada {
  background-color: orange;
}
.eliminada {
  background-color: red;
}
</style>
