<script setup>
import items from '../../data/menu'
</script>
<template>
  <v-navigation-drawer app elevation="2" class="border-end" v-bind="$attrs">
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in items.main"
        :key="item.name"
        class="rounded-lg my-1 px-3 hover:bg-grey-lighten-3"
      >
        <router-link :to="item.to" class="d-flex align-center w-100">
          <v-icon v-if="item.icon" class="me-2" :icon="item.icon" size="20" />
          <v-list-item-title class="font-weight-medium text-grey-darken-2">
            {{ item.name }}
          </v-list-item-title>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<style scoped>
:deep(a) {
  text-decoration: none;
}
</style>
