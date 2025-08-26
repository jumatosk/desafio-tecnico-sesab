<script setup>
const props = defineProps({
  onClick: {
    type: Function,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'primary',
  },
  tooltip: {
    type: String,
    default: '',
  },
  density: {
    type: String,
    default: 'compact',
  },
})
</script>
<template>
  <v-btn :icon="icon" @click="onClick" :density="density" :color="color" :title="tooltip"> </v-btn>
</template>
