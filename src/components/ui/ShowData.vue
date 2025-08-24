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
    <label class="font-weight-bold text-grey-darken-1">{{ label }}</label> <br />
    <label class="text-grey-darken-4">{{ value }}</label>
  </div>
</template>

<style scoped></style>
