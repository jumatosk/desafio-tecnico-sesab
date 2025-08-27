<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  onClick: {
    type: Function,
    default: () => {},
  },
})
</script>
<template>
  <nav aria-label="breadcrumb">
    <v-breadcrumbs class="px-0" :items="items">
      <template #divider><v-icon icon="mdi-chevron-right"></v-icon></template>
    </v-breadcrumbs>
  </nav>
</template>
<style scoped>
:deep(.v-breadcrumbs-item) {
  padding-left: 0px;
}
</style>
