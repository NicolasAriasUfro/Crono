<script>
export default {
  name: "TimerInfo",
  props: {
    idTimer: {
      type: Number,
      default: null,
    },
    initialSecond: {
      type: Number,
      default: 3,
    },
    initialMinute: {
      type: Number,
      default: 0,
    },
    initialHour: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "Timer",
    },
  },
};
</script>

<template>
  {{ name }}
  {{ initialSecond }}
  {{ initialMinute }}
  {{ initialHour }}
  {{ idTimer }}
</template>

<style scoped></style>
