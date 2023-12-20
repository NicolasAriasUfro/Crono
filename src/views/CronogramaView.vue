<script>
import { defineComponent } from "vue";
import TimerComponent from "@/components/TimerComponent.vue";
import GeneralManager from "@/components/GeneralManager.vue";

export default defineComponent({
  components: { GeneralManager, TimerComponent },
  data() {
    return {
      timers: [
        {
          initialSecond: 5,
          initialMinute: 0,
          initialHour: 0,
          name: "5 segundos",
        },
        {
          initialSecond: 3,
          initialMinute: 0,
          initialHour: 0,
          name: "cambio de actividad",
        },
        {
          initialSecond: 5,
          initialMinute: 1,
          initialHour: 0,
          name: "conclusión",
        },
      ],
      currentTimerIndex: 0,
    };
  },
  methods: {
    startNextTimer() {
      if (this.currentTimerIndex >= this.timers.length) {
        return;
      }
      this.$refs.timers[this.currentTimerIndex].startTimer();
      this.currentTimerIndex++;
    },
    pauseFocusedTimer() {
      this.$refs.timers[this.currentTimerIndex].pauseManager();
    },
    continueFocusedTimer() {
      this.$refs.timers[this.currentTimerIndex].pauseManager();
    },
    resetAllTimers() {
      //Todo: iterar sobre los TimerComponent para reiniciar sus contadores y reiniciar el contador de id timer
    },
  },
});
</script>

<template>
  <div class="crono">
    <GeneralManager
      @general-pause="pauseFocusedTimer"
      @general-play="continueFocusedTimer"
      @general-reset="resetAllTimers"
    />
    <button @click="startNextTimer">Iniciar Siguiente Temporizador</button>
    <div v-for="(timer, index) in timers" :key="index">
      <TimerComponent
        @timer-finished="startNextTimer"
        :initial-second="timer.initialSecond"
        :initial-minute="timer.initialMinute"
        :initial-hour="timer.initialHour"
        :id-timer="index"
        ref="timers"
      />
    </div>
  </div>
</template>

<style scoped>
.crono {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
