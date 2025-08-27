<script setup>
import { formatCurrencyBR } from '../../functions/formatCurrency'

const props = defineProps({
  name: { type: String, required: true },
  price: { type: [String, Number], required: true },
  image: { type: String, required: true },
  showActions: { type: Boolean, default: true },
})
const emit = defineEmits(['edit', 'view', 'delete'])

const isLogged = localStorage.getItem('token') != undefined
</script>

<template>
  <v-card
    class="mx-auto my-4 elevation-3 rounded-xl transition-ease-in-out cursor-pointer hover:elevation-6"
    max-width="300"
    outlined
  >
    <div @click="$emit('view')">
      <v-img :src="image" height="180" class="rounded-t-xl" />
      <v-card-title class="font-weight-medium text-body-1 text-grey-darken-3 px-4 pt-3">
        {{ name }}
      </v-card-title>
    </div>
    <v-row align="center" justify="space-between" class="px-4 pb-3">
      <v-card-subtitle class="text-h6 font-weight-bold text-primary">
        {{ formatCurrencyBR(price) }}
      </v-card-subtitle>
      <div v-if="isLogged && showActions" class="d-flex align-center">
        <v-btn
          icon
          size="small"
          color="primary"
          variant="tonal"
          class="me-2"
          @click="$emit('edit')"
          title="Editar"
        >
          <v-icon size="20">mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          size="small"
          color="red"
          variant="tonal"
          @click="$emit('delete')"
          title="Excluir"
        >
          <v-icon size="20">mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-row>
  </v-card>
</template>
