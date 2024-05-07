<script>
import { useScheduleStore } from "@/stores/SheduleStore";

export default {
  name: "ModifyScheduleView",
  methods: { useScheduleStore },
  data() {
    return {
      nameSchedule: "",
    };
  },
};
</script>

<template>
  <v-form>
    <v-text-field
      label="Nombre Cronograma"
      v-model="nameSchedule"
    ></v-text-field>
  </v-form>
  <v-btn @click.prevent="useScheduleStore().addSchedule(this.nameSchedule)">
    agregar Cronograma
  </v-btn>
</template>

<style scoped></style>
