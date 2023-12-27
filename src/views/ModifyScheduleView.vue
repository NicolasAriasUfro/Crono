<script>
import { useScheduleStore } from "@/stores/SheduleStore";
import TimerComponent from "@/components/TimerComponent.vue";

export default {
  name: "ModifyScheduleView",
  methods: {
    useScheduleStore,
    addNewTimer() {
      const seconds = this.hh * 3600 + this.mm * 60 + this.ss;
      useScheduleStore().addTimer(this.name, seconds);
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
    };
  },
};
</script>

<template>
  Mi Cronograma
  <div
    class="ma-5"
    v-for="(timer, index) in useScheduleStore().schedules"
    :key="index"
  >
    <TimerComponent class="selected" :id-timer="index" :name="timer.name">
    </TimerComponent>
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
