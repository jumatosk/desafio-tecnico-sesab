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
})
</script>
<template>
  <v-btn :icon="icon" @click="onClick" density="compact" :color="color" :title="tooltip"> </v-btn>
</template>
