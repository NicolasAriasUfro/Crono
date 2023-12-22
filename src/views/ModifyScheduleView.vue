<script>
import TimerInfo from "@/components/TimerInfo.vue";
import { useScheduleStore } from "@/stores/SheduleStore";

export default {
  name: "ModifyScheduleView",
  methods: { useScheduleStore },
  components: { TimerInfo },
};
</script>

<template>
  Mi Cronograma
  <div v-for="(timer, index) in useScheduleStore().schedules" :key="index">
    <TimerInfo
      :initial-second="timer.initialSecond"
      :initial-minute="timer.initialMinute"
      :initial-hour="timer.initialHour"
      :name="timer.name"
    >
    </TimerInfo>
  </div>
</template>

<style scoped></style>
