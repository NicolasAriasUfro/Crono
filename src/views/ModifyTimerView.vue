<script>
import { useScheduleStore } from "@/stores/SheduleStore";
import TimerComponent from "@/components/TimerComponent.vue";

export default {
  name: "ModifyTimerView",
  methods: {
    useScheduleStore,
    addNewTimer() {
      useScheduleStore().addTimer(this.nameTimer, this.totalSeconds);
      this.nameTimer = "";
      this.hh = "";
      this.mm = "";
      this.ss = "";
    },
  },
  components: { TimerComponent },
  data() {
    return {
      nameTimer: "",
      hh: "",
      mm: "",
      ss: "",
      rules: [
        (v) => v >= 0 || "No puede ser negativo",
        (v) => v <= 59 || "No puede ser mayor a 59",
      ],
      nameSchedule: "",
    };
  },
  computed: {
    selectedSchedule() {
      return useScheduleStore().selectedSchedule;
    },
    totalSeconds() {
      return this.hh * 3600 + this.mm * 60 + this.ss;
    },
  },
};
</script>

<template>
  Mi Cronograma

  <div
    class="ma-5"
    v-for="timer in useScheduleStore().schedules[selectedSchedule].timers"
    :key="timer.id"
  >
    <TimerComponent class="selected" :id-timer="timer.id" :is-editable="true">
    </TimerComponent>
  </div>
  <v-divider class="ma-4"></v-divider>

  <v-form @submit.prevent="">
    <v-text-field v-model="nameTimer" label="Nombre" type="text">
    </v-text-field>
    <v-row color="red">
      <v-col>
        <v-text-field
          type="number"
          v-model="hh"
          :rules="rules"
          label="horas"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          class="w-30"
          min="0"
          max="59"
          type="number"
          v-model="mm"
          :rules="rules"
          label="Minutos"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          type="number"
          v-model="ss"
          :rules="rules"
          label="Segundos"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn type="submit" @click="addNewTimer">Agregar</v-btn>
  </v-form>
</template>

<style scoped></style>
