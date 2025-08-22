<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from './_store'
import ProductCard from '@/components/products/ProductCard.vue'
import { constants } from './_constants'

const productsStore = useProductsStore()
const stateProducts = productsStore.$state

onMounted(async () => {
  await productsStore.getIndex()
})
</script>
<template>
  <base-page-heading title="Lista de itens">
    <template #subtitle> <breadcrumbs :items="constants.breadcrumbs"></breadcrumbs> </template
  ></base-page-heading>
  <v-row>
    <v-col v-for="product in stateProducts.index" :key="product.id" cols="12" sm="6" md="4">
      <ProductCard :name="product.title" :price="product.price" :image="product.image" />
    </v-col>
  </v-row>
</template>
