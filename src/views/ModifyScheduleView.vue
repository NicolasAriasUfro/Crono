<script>
import { useScheduleStore } from "@/stores/SheduleStore";
import TimerComponent from "@/components/TimerComponent.vue";

export default {
  name: "ModifyScheduleView",
  methods: {
    useScheduleStore,
    addNewTimer() {
      useScheduleStore().addTimer(this.name, this.totalSeconds);
    },
  },
  components: { TimerComponent },
  data() {
    return {
      name: "",
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
  <v-form>
    <v-text-field
      label="Nombre Cronograma"
      v-model="nameSchedule"
    ></v-text-field>
  </v-form>
  <v-btn @click.prevent="useScheduleStore().addSchedule(this.nameSchedule)">
    agregar Cronograma
  </v-btn>

  <div
    class="ma-5"
    v-for="timer in useScheduleStore().schedules[selectedSchedule].timers"
    :key="timer.id"
  >
    <TimerComponent class="selected" :id-timer="timer.id"> </TimerComponent>
  </div>
  <v-divider class="ma-4"></v-divider>

  <v-form @submit.prevent="">
    <v-text-field v-model="name" label="Nombre" type="text"> </v-text-field>
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
