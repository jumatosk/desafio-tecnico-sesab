<script setup>
import { ref } from 'vue'
import Drawer from './Drawer.vue'
import Cart from './Cart.vue'

const drawer = ref(true)
</script>
<template>
  <Drawer v-model="drawer" />
  <v-app-bar app>
    <template v-slot:prepend>
      <IconButton density="default" :icon="'mdi-menu'" color="black" @click="drawer = !drawer" />
    </template>

    <div class="mr-4"><Cart /></div>
  </v-app-bar>
</template>
