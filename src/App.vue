<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './views/auth/_store'

const authStore = useAuthStore()

onMounted(() => {
  if (localStorage.getItem('token')) {
    authStore.updateIsLogged(true)
  }
})
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style scoped></style>
