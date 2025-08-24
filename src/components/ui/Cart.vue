<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/views/cart/_store'

const router = useRouter()
const stateCart = useCartStore().$state

const onClickCart = () => {
  router.push('/cart')
}

const getItemsQuantity = () => {
  const total = stateCart.index.length
  return total > 99 ? '99+' : total
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
