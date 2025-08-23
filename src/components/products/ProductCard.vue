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
const emit = defineEmits(['edit', 'delete'])
</script>
<template>
  <v-card class="mx-auto my-2 elevation-1" max-width="300" outlined>
    <v-img :src="image" height="180" class="rounded-t"></v-img>
    <v-card-title class="font-weight-bold text-body-1">{{ name }}</v-card-title>
    <v-row align="center" justify="space-between" class="px-4 mb-2">
      <v-card-subtitle class="font-weight-bold text-brown-darken-4">
        {{ formatCurrencyBR(price) }}
      </v-card-subtitle>
      <div class="d-flex align-center">
        <v-btn
          icon
          size="small"
          color="green-lighten-1"
          variant="text"
          @click="$emit('edit')"
          title="Editar"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          size="small"
          color="red-lighten-1
"
          variant="text"
          @click="$emit('delete')"
          title="Excluir"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-row>
  </v-card>
</template>
