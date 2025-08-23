<script setup>
import { onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from './_store'
import ProductCard from '@/components/products/ProductCard.vue'
import { constants } from './_constants'

const router = useRouter()
const productsStore = useProductsStore()
const stateProducts = productsStore.$state
const strings = inject('strings')

onMounted(async () => {
  await search()
})

const search = async () => {
  await productsStore.getIndex()
}

const editProduct = (id) => {
  router.push(`/products/edit/${id}`)
}

const deleteProduct = async (item) => {
  Swal.deleteMessage('Deseja excluir o item: ', `${item.title}`).then(async (result) => {
    if (result.isConfirmed) {
      const response = await productsStore.deleteItem(item.id)
      if (response.status != 200) return false
      await search()
      Swal.messageToast(strings.msg_excluir)
    }
  })
}
</script>
<template>
  <base-page-heading title="Lista de itens">
    <template #subtitle>
      <Breadcrumbs :items="constants.breadcrumbs"></Breadcrumbs>
    </template>
    <template #extra>
      <Button @click="router.push('/products/register')"> Adicionar </Button>
    </template>
  </base-page-heading>
  <v-row>
    <v-col v-for="product in stateProducts.index" :key="product.id" cols="12" sm="6" md="4">
      <ProductCard
        :name="product.title"
        :price="product.price"
        :image="product.image"
        @edit="() => editProduct(product.id)"
        @delete="() => deleteProduct(product)"
      />
    </v-col>
  </v-row>
</template>
