<script>
import { useScheduleStore } from "@/stores/SheduleStore";

export default {
  name: "ModifyScheduleView",
  methods: {
    useScheduleStore,
    deleteSchedule() {
      const idSelectedSchedule = this.selectedSchedule;
      useScheduleStore().removeSchedule(idSelectedSchedule);
      this.nameSchedule = "";
    },
  },
  data() {
    return {
      nameSchedule: "",
      tab: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  computed: {
    items() {
      //get name of every schedule
      const schedules = [];
      useScheduleStore().schedules.forEach((schedule) => {
        schedules.push({ id: schedule.id, name: schedule.name });
      });
      return schedules;
    },
    timersOfSelectedSchedule() {
      return useScheduleStore().schedules[useScheduleStore().selectedSchedule]
        .timers;
    },
    selectedSchedule: {
      get() {
        return useScheduleStore().selectedSchedule;
      },
      set(value) {
        console.log(value);
        useScheduleStore().selectedSchedule = value.id;
      },
    },
  },
};
</script>

<template>
  <v-card>
    <v-toolbar color="primary">
      <v-tabs v-model="selectedSchedule" align-tabs="title">
        <v-tab
          v-for="item in items"
          :key="item.id"
          :text="item.name"
          :value="item"
        ></v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-window v-model="selectedSchedule">
      <v-tabs-window-item v-for="item in items" :key="item" :value="item">
        <v-card flat>
          tab:{{}}.
          <br />
          selected Schedule:{{ selectedSchedule }}. hola
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>

  <v-form>
    <v-text-field
      label="Nombre Cronograma"
      v-model="nameSchedule"
    ></v-text-field>
  </v-form>
  <v-container>
    <v-btn @click.prevent="useScheduleStore().addSchedule(this.nameSchedule)">
      Agregar Cronograma
    </v-btn>
    <v-btn @click.prevent="deleteSchedule(this.nameSchedule)">
      Eliminar Cronograma
    </v-btn>
  </v-container>
  <v-divider class="ma-4"></v-divider>
</template>

<style scoped></style>
