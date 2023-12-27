<script>
import { ref } from "@vue/reactivity";

export default {
  props: {
    idTimer: {
      type: Number,
      default: null,
    },
    initialSecond: {
      type: Number,
      default: 3,
    },
    initialMinute: {
      type: Number,
      default: 0,
    },
    initialHour: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "Timer",
    },
  },
  expose: ["startTimer", "pauseManager", "resetTimer"],
  data() {
    return {
      timerOptions: ["priorizada", "normal", "baja"],
      second: 0,
      minute: 0,
      hour: 0,
      timeString: "00:00:00",
      paused: true,
      started: false,
      timerInterval: null,
      esPrioritaria: false,
      isDeleted: false,
    };
  },
  computed: {
    formattedTime() {
      let timeString = "";
      timeString += this.hour < 10 ? `0${this.hour}` : this.hour + ":";
      timeString += ":";
      timeString += this.minute < 10 ? `0${this.minute}` : this.minute;
      timeString += ":";
      timeString += this.second < 10 ? `0${this.second}` : this.second;
      return timeString;
    },
    formattedInitialTime() {
      let timeString = "";
      timeString +=
        this.initialHour < 10 ? `0${this.initialHour}` : this.initialHour + ":";
      timeString += ":";
      timeString +=
        this.initialMinute < 10 ? `0${this.initialMinute}` : this.initialMinute;
      timeString += ":";
      timeString +=
        this.initialSecond < 10 ? `0${this.initialSecond}` : this.initialSecond;
      return timeString;
    },
  },
  mounted() {
    this.second = this.initialSecond;
    this.minute = this.initialMinute;
    this.hour = this.initialHour;
  },
  unmounted() {
    console.log("unmounted");
  },
  methods: {
    ref,
    timer() {
      this.timerInterval = setInterval(() => {
        if (this.second === 0) {
          if (this.minute === 0) {
            if (this.hour === 0) {
              // Timer has reached 00:00:00
              this.started = false;
              this.paused = true;
              clearInterval(this.timerInterval);
              this.$emit("timer-finished", this.idTimer);
              return;
            }
            this.hour = (this.hour - 1) % 24; // Decrease the hour and reset to 23 if necessary
            this.minute = 59;
          } else {
            this.minute--;
          }
          this.second = 59;
        } else {
          this.second--;
        }
      }, 1000);
    },
    startTimer() {
      this.second = this.initialSecond;
      this.minute = this.initialMinute;
      this.hour = this.initialHour;
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
      this.second = this.initialSecond;
      this.minute = this.initialMinute;
      this.hour = this.initialHour;
    },
    mensaje() {
      this.esPrioritaria = !this.esPrioritaria;
    },
    marcarComoEliminado() {
      this.isDeleted = !this.isDeleted;
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
        <strong> {{ formattedTime }} / {{ formattedInitialTime }}</strong>
      </v-col>
      <v-col><v-select :items="timerOptions"> </v-select></v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.left-buttons {
  text-align: right;
}
* {
  //border: orangered 1px solid;
}
.priorizada {
  background-color: orange;
}
.eliminada {
  background-color: red;
}
.startedTimer {
  -webkit-box-shadow: 0px 0px 27px 12px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 27px 12px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 27px 12px rgba(0, 0, 0, 1);
}
</style>
