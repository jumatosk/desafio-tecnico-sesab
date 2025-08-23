<script setup>
import { formatCurrencyBR } from '../../functions/formatCurrency'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: [String, Number],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['edit'])
</script>
<template>
  <v-card class="mx-auto my-2" max-width="300" outlined>
    <v-img :src="image" height="180" class="rounded-t"></v-img>
    <v-card-title class="font-weight-bold text-body-1">{{ name }}</v-card-title>
    <v-row align="center" justify="space-between" class="px-4 mb-2">
      <v-card-subtitle class="font-weight-bold text-brown-darken-4">
        {{ formatCurrencyBR(price) }}
      </v-card-subtitle>
      <v-btn
        icon
        size="small"
        color="success"
        variant="text"
        @click="$emit('edit')"
        title="Editar produto"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>
