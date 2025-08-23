<script setup>
const props = defineProps({
  tooltip: {
    type: String,
    default: null,
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  type: {
    type: String,
    default: 'button',
  },
  color: {
    type: String,
    default: 'primary',
  },
})
</script>
<template>
  <v-btn @click="onClick" :type="type" :title="tooltip" :color="color">
    <slot />
  </v-btn>
</template>
