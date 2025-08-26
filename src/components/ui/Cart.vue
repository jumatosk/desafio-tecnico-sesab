<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/views/cart/_store'
import { useUsersStore } from '@/views/users/_store'

const router = useRouter()
const stateCart = useCartStore().$state
const usersStore = useUsersStore()

const onClickCart = () => {
  router.push('/cart')
}

const getItemsQuantity = () => {
  if (stateCart.index.length > 0) {
    const cart = stateCart.index.find((cart) => cart.userId == usersStore.getUserId())

    const total = cart.products.reduce((acc, item) => acc + item.quantity, 0)
    return total > 99 ? '99+' : total
  }
}
</script>
<template>
  <v-badge
    location="top right"
    color="primary"
    class="cursor-pointer"
    @click="onClickCart"
    :content="getItemsQuantity()"
  >
    <v-icon density="default" :icon="'mdi-cart-plus'" />
  </v-badge>
</template>
