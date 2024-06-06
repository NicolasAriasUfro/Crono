<script>
import TimerComponent from "@/components/TimerComponent.vue";
import GeneralManager from "@/components/GeneralManager.vue";
import GeneralGroupManager from "@/components/GeneralGroupManager.vue";
import { useScheduleStore } from "@/stores/SheduleStore";
import { useGroupStore } from "@/stores/GroupStore";
import TimerGroupComponent from "@/components/TimerGroupComponent.vue";
import { useSessionStore } from "@/stores/SessionStore";

export default {
  components: { GeneralManager, TimerComponent, GeneralGroupManager, TimerGroupComponent },
  data() {
    return {
      groupStore: useGroupStore(),
      tab: "",
      currentTimerIndex: 0,
      selectedId: null,
      groupSelected: null,
      items: useSessionStore().groups,
      noGroups: useSessionStore().groups.length === 0,
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
  watch: {
    selectedId(newSelectedId, oldSelectedId) {
      console.log(newSelectedId);
      const currentGroup = useGroupStore().groups[newSelectedId.id];
      this.groupSelected = currentGroup;
    }
  },
  beforeMount() {
    if (!this.noGroups) {
      this.selectedId = useGroupStore().groups[useSessionStore().groups[0].id],
      this.groupSelected = useGroupStore().groups[useSessionStore().groups[0].id]
    }
  },
  beforeUpdate() {
    if (!this.noGroups) {
      this.selectedId = useGroupStore().groups[useSessionStore().groups[0].id],
      this.groupSelected = useGroupStore().groups[useSessionStore().groups[0].id]
    }
  }
};
</script>

<template>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="primary"
    >
    <div class="d-flex justify-center">
      <v-tab class="d-flex w-50" value="personal">personal</v-tab>
      <v-tab class="d-flex w-50" value="grupo">grupo</v-tab>
    </div>
    </v-tabs>
    
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="personal">
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
      </v-tabs-window-item>
      <v-tabs-window-item value="grupo">
          <div v-if="!noGroups" class="crono">
            <div>
              <GeneralGroupManager :groupId="groupSelected.index" />
              <v-select
                v-model="selectedId"
                :items="items"
                item-title="name"
                item-value="id"
                hint="Grupo seleccionado"
                label="Selecciona un grupo"
                density="compact"
                color="primary"
                item-color="primary"
                variant="underlined"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </div>
            <div v-if="groupSelected" class="d-flex">
              <div v-for="cronograma in groupSelected.cronograma" :key="cronograma.id" class=" d-flex flex-column align-items-center justify-center">
                <div v-for="timer in cronograma.timers" :key="timer.id" fluid class="ma-2 justify-center timer-container">
                  <TimerGroupComponent :idGroup="groupSelected.index" :id-timer="timer.id" />
                </div>
              </div>
            </div>
          </div>
          <div v-else class="crono mt-3">
            <h3 class="my-3">¡Aun no perteneces a ningún grupo!</h3>
            <v-btn to="/grupos" color="success">Grupos</v-btn>
          </div>
      </v-tabs-window-item>
    </v-tabs-window>
</template>

<style scoped>
.crono {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timer-container {
  width: 1000px;
}
</style>