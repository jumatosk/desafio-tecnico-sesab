<script setup>
import { ref } from 'vue'
import Drawer from './Drawer.vue'

const drawer = ref(true)
</script>
<template>
  <Drawer v-model="drawer" />
  <v-app-bar app>
    <v-btn icon @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>
