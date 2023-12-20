<script>
export default {
  emits: ["general-pause", "general-play", "general-reset"],
  methods: {
    generalPause() {
      this.$emit("general-pause");
    },
    generalPlay() {
      this.$emit("general-play");
    },
    generalReset() {
      this.$emit("general-reset");
    },
  },
};
</script>

<template>
  <div class="general-bar">
    <button @click.prevent="generalPause">
      <font-awesome-icon icon="fa-solid fa-pause" />
    </button>
    <button @click.prevent="generalPlay">
      <font-awesome-icon icon="fa-solid fa-play" />
    </button>
    <button @click.prevent="generalReset">
      <font-awesome-icon icon="fa-solid fa-stop" />
    </button>
  </div>
</template>

<style scoped>
.general-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
}
</style>
