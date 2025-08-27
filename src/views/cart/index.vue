<script setup>
import { onMounted, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { formatCurrencyBR } from '@/functions/formatCurrency'
import { useCartStore } from './_store'
import { useUsersStore } from '../users/_store'
import { useProductsStore } from '../products/_store'
import { constants } from './_constants'

const router = useRouter()
const strings = inject('strings')
const cartStore = useCartStore()
const stateCart = cartStore.$state
const usersStore = useUsersStore()
const productsStore = useProductsStore()
const stateProducts = productsStore.$state
const headers = [...constants.headers]
const cartId = localStorage.getItem('cartId')

onMounted(async () => {
  await cartStore.getIndex()
  await productsStore.getIndex()
})

const cartItems = computed(() => {
  if (stateCart.index.length > 0) {
    const cart = stateCart.index.find((cart) => cart.userId == usersStore.getUserId())
    let products = []

    for (const _product in cart.products) {
      const productObject = stateProducts.index.find(
        (item) => item.id == cart.products[_product].productId,
      )
      if (productObject) {
        products.push({
          ...productObject,
          quantity: cart.products[_product].quantity,
        })
      }
    }
    return products
  }
})

const totalPrice = computed(() => {
  if (cartItems.value) {
    return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }
})

const increaseItem = async (item) => {
  updateItemQuantity(item, item.quantity + 1)
}

const decreaseItem = async (item) => {
  if (item.quantity > 1) {
    updateItemQuantity(item, item.quantity - 1)
  }
}
const updateItemQuantity = async (item, quantity) => {
  const productWithQuantityUpdated = cartItems.value.find((product) => product.id == item.id)
  productWithQuantityUpdated.quantity = quantity

  const index = cartItems.value.indexOf(productWithQuantityUpdated)
  cartItems.value.splice(index, 1, { ...productWithQuantityUpdated })

  const payload = {
    id: cartId,
    userId: usersStore.getUserId(),
    products: cartItems.value,
  }

  const response = await cartStore.updateItem(payload)
  if (response.status != 200) return false
  await cartStore.getIndex()
  Swal.messageToast(strings.msg_qtd)
}

const deleteItem = async (item) => {
  Swal.deleteMessage('Deseja excluir o item: ', `${item.title}`).then(async (result) => {
    if (result.isConfirmed) {
      const payload = {
        id: cartId,
        userId: usersStore.getUserId(),
        products: [],
      }
      const response = await cartStore.updateItem(payload)
      if (response.status != 200) return false
      await cartStore.getIndex()
      Swal.messageToast(strings.msg_excluir)
    }
  })
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="font-weight-medium text-body-1 text-grey-darken-3 px-4 pt-3"
            >Meu Carrinho <v-icon class="mx-2">mdi-cart-plus</v-icon></v-card-title
          >
          <v-card-text>
            <Datatable
              :headers="headers"
              :data="cartItems"
              :customColumn="['title', 'price', 'quantity', 'actions']"
              :showPaginate="false"
            >
              <template #title="{ item }">
                <v-row align="center" no-gutters>
                  <v-col cols="auto">
                    <v-img :src="item.image" width="40" class="my-2 mr-2" />
                  </v-col>
                  <v-col>
                    {{ item.title }}
                  </v-col>
                </v-row>
              </template>
              <template #price="{ item }">
                {{ formatCurrencyBR(item.price) }}
              </template>
              <template #quantity="{ item }">
                <div class="d-flex justify-space-between">
                  <IconButton
                    icon="mdi-minus"
                    color="white"
                    :onClick="() => decreaseItem(item)"
                    :disabled="item.quantity == 1"
                  />
                  <div>{{ item.quantity }}</div>
                  <IconButton icon="mdi-plus" color="white" :onClick="() => increaseItem(item)" />
                </div>
              </template>
              <template #actions="{ item }">
                <IconButton
                  icon="mdi-delete-outline"
                  color="white"
                  :onClick="() => deleteItem(item)"
                />
              </template>
              <template #no-data>
                <div class="font-italic text-center">Seu carrinho está vazio.</div>
              </template>
            </Datatable>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div><strong>Total:</strong> {{ formatCurrencyBR(totalPrice) }}</div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="d-flex justify-end mt-4">
      <Button type="button" variant="outlined" @click="() => router.go(-1)">
        {{ strings.btn_voltar }}
      </Button>
    </div>
  </v-container>
</template>
