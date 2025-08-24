<script setup>
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { formatCurrencyBR } from '@/functions/formatCurrency'
import { useCartStore } from './_store'
import { constants } from './_constants'

const router = useRouter()
const strings = inject('strings')
const cartStore = useCartStore()
const stateCart = cartStore.$state
const headers = [...constants.headers]

const cartItems = computed(() => {
  const uniqueItems = []
  const seenIds = new Set()
  for (const item of stateCart.index) {
    if (!seenIds.has(item.id)) {
      uniqueItems.push(item)
      seenIds.add(item.id)
    }
  }
  return uniqueItems
})

const getItemQuantity = (id) => stateCart.index.filter((item) => item.id === id).length

const totalPrice = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price * getItemQuantity(item.id), 0),
)

const addItemToCart = (item) => {
  cartStore.addItem(item)
}

const decreaseItemFromCart = (item) => {
  if (getItemQuantity(item.id) > 1) {
    cartStore.decreaseItem(item)
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="font-weight-medium"
            >Carrinho de Compras <v-icon class="mx-2">mdi-cart-plus</v-icon></v-card-title
          >
          <v-card-text>
            <Datatable
              :headers="headers"
              :data="cartItems"
              :customColumn="['title', 'price', 'quantity']"
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
                <div class="d-flex justify-space-evenly">
                  <IconButton
                    icon="mdi-minus"
                    color="black"
                    :onClick="() => decreaseItemFromCart(item)"
                  />
                  <div>{{ getItemQuantity(item.id) }}</div>
                  <IconButton icon="mdi-plus" color="black" :onClick="() => addItemToCart(item)" />
                </div>
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
