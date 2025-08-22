<script setup>
import { formatCurrencyBR } from '../../functions/formatCurrency'

defineProps({
  name: {
    type: String,
    required: true,
  },
  price: { type: [String, Number], required: true },
  image: { type: String, required: true },
})
</script>
<template>
  <v-card class="mx-auto my-2" max-width="300" outlined>
    <v-img :src="image" height="180" class="rounded-t"></v-img>
    <v-card-title class="font-weight-bold text-body-1">{{ name }}</v-card-title>
    <v-card-subtitle class="font-weight-bold text-brown-darken-4 mb-2">{{
      formatCurrencyBR(price)
    }}</v-card-subtitle>
  </v-card>
</template>
