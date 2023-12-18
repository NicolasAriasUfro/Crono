<script>
import { defineComponent } from "vue";
import TimerComponent from "@/components/TimerComponent.vue";
import ChronometerComponent from "@/components/ChronometerComponent.vue";
import GeneralManager from "@/components/GeneralManager.vue";
export default defineComponent({
  components: { GeneralManager, ChronometerComponent, TimerComponent },
});
</script>

<template>
  <GeneralManager />
  <h1>Cronograma</h1>
  <TimerComponent />
  <TimerComponent />
  <ChronometerComponent />
</template>

<style scoped></style>
