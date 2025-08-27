<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './views/auth/_store'
import { useUsersStore } from './views/users/_store'
import { useCartStore } from './views/cart/_store'

const authStore = useAuthStore()
const usersStore = useUsersStore()
const cartStore = useCartStore()
onMounted(async () => {
  await usersStore.getIndex()
  await cartStore.getIndex()

  if (localStorage.getItem('token')) {
    authStore.updateIsLogged(true)
    localStorage.setItem('userId', usersStore.getUserId())
  }
})
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style scoped></style>
