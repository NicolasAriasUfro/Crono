<script>
import { defineComponent } from "vue";
import TimerComponent from "@/components/TimerComponent.vue";
import GeneralManager from "@/components/GeneralManager.vue";

export default defineComponent({
  components: { GeneralManager, TimerComponent },
  data() {
    return {
      timers: [
        { initialSecond: 5, initialMinute: 0, initialHour: 0 },
        { initialSecond: 3, initialMinute: 0, initialHour: 0 },
        { initialSecond: 5, initialMinute: 1, initialHour: 0 },
      ],
      currentTimerIndex: 0,
    };
  },
  methods: {
    startNextTimer() {
      if (this.currentTimerIndex >= this.timers.length) {
        return;
      }
      this.currentTimerIndex++;
      this.$refs.timer[this.currentTimerIndex].startTimer();
    },
  },
});
</script>

<template>
  <div>
    <GeneralManager />
    <button @click="startNextTimer">Iniciar Siguiente Temporizador</button>
    <div v-for="(timer, index) in timers" :key="index">
      <TimerComponent
        @timer-finished="startNextTimer"
        :initial-second="timer.initialSecond"
        :initial-minute="timer.initialMinute"
        :initial-hour="timer.initialHour"
        :id-timer="index"
        :ref="timer"
      />
    </div>
  </div>
</template>

<style scoped></style>
