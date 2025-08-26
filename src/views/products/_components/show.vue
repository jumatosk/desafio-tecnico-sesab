<script setup>
import { onMounted, inject, ref, reactive, watch } from 'vue'
import { useProductsStore } from '../_store'
import { useCartStore } from '../../cart/_store'
import { useRouter, useRoute } from 'vue-router'
import { constants } from '../_constants'
import ShowData from '@/components/ui/ShowData.vue'
import ProductCard from '@/components/products/ProductCard.vue'

const productsStore = useProductsStore()
const stateProducts = productsStore.$state
const cartStore = useCartStore()
const breadcrumbs = ref(constants.breadcrumbsForm)
const form = reactive({ ...constants.form })
const route = useRoute()
const router = useRouter()
const strings = inject('strings')
const userId = localStorage.getItem('userId')
const cartId = localStorage.getItem('cartId')

onMounted(async () => {
  if (route.params.id) {
    breadcrumbs.value[1].title = 'Detalhar'
    await productsStore.getItemById(route.params.id)
  }
})

const addItemToCart = async () => {
  if (!userId || !cartId) {
    Swal.message(
      strings.msg_atencao,
      strings.msg_usuario_nao_autenticado_carrinho,
      'warning',
      '',
      'Entrar',
    ).then(() => {
      router.push({ name: 'auth' })
    })
    return
  }
  const response = await cartStore.updateItem({ products: [form], userId, id: cartId })

  if (!response.status == 200) return false
  Swal.messageToast(strings.msg_adicionar)
}

watch(
  () => stateProducts.productById,
  async (itemById) => {
    let keys = Object.keys(form)
    keys.forEach((i) => {
      if (itemById[i] != null) {
        form[i] = itemById[i]
      }
    })
  },
)
</script>
<template>
  <base-page-heading title="Detalhar Produto">
    <template #subtitle>
      <Breadcrumbs :items="breadcrumbs"></Breadcrumbs>
    </template>
  </base-page-heading>
  <v-card class="pa-4 mb-4 bg-grey-lighten-5 elevation-0">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <ProductCard
          :name="form.title"
          :price="form.price"
          :image="form.image"
          :show-actions="false"
        />
        <div class="d-flex justify-center align-center mt-4">
          <Button color="green" :onClick="addItemToCart">
            <v-icon class="mr-2">mdi-cart-outline</v-icon> Adicionar ao carrinho
          </Button>
        </div>
      </v-col>
      <v-col>
        <v-col cols="12" sm="12" md="9">
          <p class="text-h6 font-weight-bold text-center">
            {{ form.title }}
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <ShowData label="Descrição" :value="form.description" />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <ShowData label="Categoria" :value="form.category" />
        </v-col>
        <v-col cols="12" sm="12" md="12">
          {{ form.rating.rate }} <v-icon color="yellow darken-3" class="me-1">mdi-star</v-icon>
          Avaliações do produto
          <span> ({{ form.rating.count }})</span>
        </v-col>
      </v-col>
    </v-row>
    <div class="d-flex justify-end mt-4">
      <Button type="button" variant="outlined" @click="() => router.go(-1)">
        {{ strings.btn_voltar }}
      </Button>
    </div>
  </v-card>
</template>
