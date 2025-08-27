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
  localStorage.clear()
  authStore.updateIsLogged(false)
  router.replace('/')
  window.location.reload()
}

const login = () => {
  router.push('/auth/login')
}

const getUsername = () => {
  return localStorage.getItem('username')
}
</script>
<template>
  <Drawer v-model="drawer" />
  <v-app-bar app class="bg-grey-lighten-5">
    <template v-slot:prepend>
      <IconButton density="default" :icon="'mdi-menu'" color="black" @click="drawer = !drawer" />
    </template>

    <div class="mr-4" v-if="stateAuth.isLogged"><Cart /></div>

    <v-menu>
      <template v-slot:activator="{ props }">
        <div class="mx-4 d-flex align-center cursor-pointer" v-bind="props">
          <IconButton
            icon="mdi-account-outline"
            density="default"
            color="primary"
            class="elevation-1"
          />
        </div>
      </template>
      <v-list class="cursor-pointer mx-4">
        <v-list-item class="border-b ml-2" v-if="stateAuth.isLogged">
          <v-list-item-title>
            <div>{{ getUsername() }}</div>
          </v-list-item-title>
        </v-list-item>
        <v-list-item class="cursor-pointer" v-if="stateAuth.isLogged" @click="logout">
          <v-list-item-title
            ><v-icon size="md" class="mx-2">mdi-logout</v-icon>Sair</v-list-item-title
          >
        </v-list-item>
        <v-list-item v-if="!stateAuth.isLogged" @click="login">
          <v-list-item-title
            ><v-icon size="md" class="mx-2">mdi-login</v-icon>Entrar</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
