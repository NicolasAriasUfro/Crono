<script>
import TimerComponent from "@/components/TimerComponent.vue";
import GeneralManager from "@/components/GeneralManager.vue";
import { useScheduleStore } from "@/stores/SheduleStore";
import draggable from 'vuedraggable';
import { ref } from 'vue';
export default {
  components: { GeneralManager, TimerComponent, draggable},
  setup(){
    var scheduleStore = useScheduleStore();
    const store = useScheduleStore();
    const timers = ref(store.schedules[store.selectedSchedule].timers);

    const onDragEnd = () => {
      store.schedules[store.selectedSchedule].timers = timers.value;
    };

    return {
      timers,
      onDragEnd
    };
  },
  data() {
    return {
      currentTimerIndex: 0,
      drag: false,
      myArray:
        [
          {name:"hola",
          id:1},
          {name:"bom dia",
          id:2}
      ]
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
    <draggable
      v-model="myArray"
      group="people"
      @start="drag=true"
      @end="drag=false"
      item-key="id">
      <template #item="{element}">
        <div>{{element.name}}</div>
      </template>
    </draggable>
    ---
    <draggable
      v-model="timers"
      @start="drag=true"
      @end="onDragEnd"

    >
      <template #item="element" tag="TimerComponent">
        <TimerComponent :id-timer="element.element.id"></TimerComponent>
      </template>
    </draggable>
    <GeneralManager />

  </div>
</template>

<style scoped>
.crono {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
