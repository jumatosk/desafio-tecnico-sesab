<script setup>
import items from '../../data/menu'

const canShowMenuItem = (item) => {
  const isLogged = localStorage.getItem('token') != undefined
  if (!isLogged && item.requiresAuth) return false
  return true
}
</script>

<template>
  <v-navigation-drawer
    app
    elevation="4"
    width="260"
    class="bg-grey-lighten-5 border-end d-flex flex-column"
    v-bind="$attrs"
  >
    <div class="pa-4 text-center border-b">
      <v-img src="/images/logo.png" class="" />
    </div>
    <v-list density="comfortable" nav class="pa-2">
      <v-list-item v-for="item in items.main" :key="item.name" class="rounded-lg mb-1">
        <router-link
          :to="item.to"
          class="d-flex align-center w-100 px-3 py-2 rounded-lg text-grey-darken-2 hover:bg-primary-lighten-5 transition-ease-in-out"
          v-if="canShowMenuItem(item)"
        >
          <v-icon v-if="item.icon" class="me-3 text-primary" :icon="item.icon" size="22" />
          <v-list-item-title class="font-weight-medium">
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
