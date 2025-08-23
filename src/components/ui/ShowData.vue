<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number],
    default: null,
  },
})
</script>
<template>
  <div>
    <label class="font-weight-bold">{{ label }}</label> <br />
    <label>{{ value }}</label>
  </div>
</template>

<style scoped></style>
