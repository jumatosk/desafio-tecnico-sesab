<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/views/auth/_store'
import Drawer from './Drawer.vue'
import Cart from './Cart.vue'

const drawer = ref(true)
const authStore = useAuthStore()
const stateAuth = authStore.$state
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  authStore.updateIsLogged(false)
}

const login = () => {
  router.push('/auth/login')
}
</script>
<template>
  <Drawer v-model="drawer" />
  <v-app-bar app>
    <template v-slot:prepend>
      <IconButton density="default" :icon="'mdi-menu'" color="black" @click="drawer = !drawer" />
    </template>

    <div class="mr-4"><Cart /></div>

    <v-menu>
      <template v-slot:activator="{ props }">
        <IconButton icon="mdi-account-circle" density="default" color="black" v-bind="props" />
      </template>
      <v-list class="cursor-pointer mx-2">
        <v-list-item class="cursor-pointer" v-if="stateAuth.isLogged" @click="logout">
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!stateAuth.isLogged" @click="login">
          <v-list-item-title>Entrar</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
