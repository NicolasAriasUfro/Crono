<script>
import TimerComponent from "@/components/TimerComponent.vue";
import GeneralManager from "@/components/GeneralManager.vue";
import { useScheduleStore } from "@/stores/SheduleStore";
export default {
  components: { GeneralManager, TimerComponent },
  data() {
    return {
      currentTimerIndex: 0,
    };
  },
  methods: {
    useScheduleStore,
    startNextTimer() {
      if (this.currentTimerIndex >= useScheduleStore().lengthSchedules - 1) {
        alert("Todos Los temporizadores finalizados");
        this.resetAllTimers();
        return;
      }
      this.currentTimerIndex++;
      this.$refs.timers[this.currentTimerIndex].pauseManager();
    },
    pauseFocusedTimer() {
      if (this.currentTimerIndex < useScheduleStore().lengthSchedules) {
        this.$refs.timers[this.currentTimerIndex].pauseManager();
      }
    },
    continueFocusedTimer() {
      if (this.currentTimerIndex < useScheduleStore().lengthSchedules) {
        this.$refs.timers[this.currentTimerIndex].pauseManager();
      }
    },
    resetAllTimers() {
      this.currentTimerIndex = 0;
      const timersRefs = this.$refs.timers;

      timersRefs.forEach((timer) => {
        timer.resetTimer();
      });
    },
  },
};
</script>

<template>
  <div class="crono">
    <GeneralManager
      @general-pause="pauseFocusedTimer"
      @general-play="continueFocusedTimer"
      @general-reset="resetAllTimers"
    />
    <div
      v-for="(timer, index) in useScheduleStore().schedules"
      :key="index"
      class="ma-2 w-75"
    >
      <TimerComponent
        @timer-finished="startNextTimer"
        :name="timer.name"
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
