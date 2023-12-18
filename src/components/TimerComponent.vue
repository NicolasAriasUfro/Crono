<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "TimerComponent",
  components: { FontAwesomeIcon },
  mounted() {
    this.second = this.initialSecond;
    this.minute = this.initialMinute;
    this.hour = this.initialHour;
  },
  data() {
    return {
      second: 0,
      minute: 0,
      hour: 0,
      initialSecond: 5,
      initialMinute: 1,
      initialHour: 0,
      timeString: "00:00:00",
      paused: true,
      started: false,
      timerInterval: null,
      name: "Primer Evento",
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
  methods: {
    timer() {
      this.timerInterval = setInterval(() => {
        if (this.second === 0) {
          if (this.minute === 0) {
            if (this.hour === 0) {
              // Timer has reached 00:00:00, you might want to handle this case
              clearInterval(this.timerInterval);
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
      if (this.paused) {
        this.paused = false;
        this.timer();
      }
    },
    pauseTimer() {
      this.paused = true;
      clearInterval(this.timerInterval);
    },
    unpauseTimer() {
      this.paused = false;
      this.timer();
    },
    pauseManager() {
      if (this.paused) {
        this.unpauseTimer();
      } else {
        this.pauseTimer();
      }
    },
    resetTimer() {
      this.pauseTimer();
      this.second = this.initialSecond;
      this.minute = this.initialMinute;
      this.hour = this.initialHour;
    },
  },
};
</script>

<template>
  <div class="timer" draggable="true">
    <div class="right-info">
      <h5>{{ name }}</h5>
      <strong>{{ formattedTime }} / {{ formattedInitialTime }}</strong>
    </div>
    <div class="left-buttons">
      <button v-if="!started" @click="startTimer">Start</button>
      <button v-else @click="pauseManager">
        {{ paused ? "Continue" : "Pause" }}
      </button>
      <button @click="resetTimer">Reset</button>
      <font-awesome-icon icon="fa-solid fa-star" />
      <font-awesome-icon icon="fa-solid fa-lock" />
      <font-awesome-icon icon="fa-solid fa-trash" />
      <font-awesome-icon icon="fa-solid fa-moon" />
    </div>
  </div>
</template>

<style scoped>
.timer {
  padding: 0.2em;
  background-color: #42b983;
  border-radius: 10px;
  margin: 0.5em;
  width: fit-content;
  display: flex;
  flex-direction: row;
}
.right-info {
  text-align: left;
}
.p {
}
.left-buttons {
  text-align: right;
}
* {
  //border: orangered 1px solid;
}
</style>
