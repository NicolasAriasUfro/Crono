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
    resetAllTimers() {
      this.currentTimerIndex = 0;
      const timersRefs = this.$refs.timers;
      useScheduleStore().paused = true;

      timersRefs.forEach((timer) => {
        timer.resetTimer();
      });
    },
  },
};
</script>

<template>
  <div class="crono">
    <GeneralManager />
    <div
      v-for="timer in useScheduleStore().schedules[
        useScheduleStore().selectedSchedule
      ].timers"
      :key="timer.id"
      class="ma-2 w-75"
    >
      <TimerComponent :id-timer="timer.id" ref="timers" />
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
