<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "@vue/reactivity";

export default {
  components: { FontAwesomeIcon },
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
  <div
    class="timer"
    :class="{
      priorizada: esPrioritaria,
      eliminada: isDeleted,
      startedTimer: started,
    }"
  >
    <div class="right-info">
      <h4>{{ name }}</h4>
      id: {{ idTimer }}

      <hr />
      <strong>{{ formattedTime }} / {{ formattedInitialTime }}</strong>
    </div>
    <div class="left-buttons">
      <font-awesome-icon icon="fa-solid fa-star" @click="mensaje" />
      <font-awesome-icon icon="fa-solid fa-lock" />
      <font-awesome-icon
        icon="fa-solid fa-trash"
        @click="marcarComoEliminado"
      />
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
