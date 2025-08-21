<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [{ title: 'Home' }, { title: 'About' }, { title: 'Contact' }],
  },
})
</script>
<template>
  <v-navigation-drawer app elevation="2" class="border-end" v-bind="props">
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        class="rounded-lg my-1 px-3 hover:bg-grey-lighten-3"
      >
        <v-list-item-title class="font-weight-medium text-grey-darken-2">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
