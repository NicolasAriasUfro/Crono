<script>
import { useScheduleStore } from "@/stores/SheduleStore";

export default {
  props: {
    isEditable: {
      type: Boolean,
      default: false,
    },
    idTimer: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      timerOptions: ["priorizada", "normal", "baja"],
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
  mounted() {
    if (this.actualSeconds < 0) {
      this.started = false;
      this.paused = true;
    }
  },
  methods: {
    deleteTimer() {
      useScheduleStore().removeTimerFromActiveSchedule(this.idTimer);
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
        <div v-if="isEditable">time interval = {{ timerInterval }}</div>
      </v-col>
      <v-col>
        <v-select :items="timerOptions"></v-select>
      </v-col>
      <v-col>
        <v-btn v-if="isEditable" @click="deleteTimer">eliminar</v-btn>
      </v-col>
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
