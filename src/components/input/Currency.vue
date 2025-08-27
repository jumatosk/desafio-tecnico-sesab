<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [Number, String],
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const displayValue = ref('')

function formatToBRL(value) {
  const numeric = value.replace(/\D/g, '')
  const number = Number(numeric) / 100
  if (!numeric) return ''
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal === null || newVal === '') {
      displayValue.value = ''
    } else {
      const number =
        typeof newVal === 'number' ? newVal : Number(String(newVal).replace(/\D/g, '')) / 100
      displayValue.value = number.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    }
  },
  { immediate: true },
)

function onInput(event) {
  const raw = event.target.value
  const numericOnly = raw.replace(/\D/g, '')
  const number = Number(numericOnly) / 100

  displayValue.value = formatToBRL(raw)
  emit('update:modelValue', number)
}
</script>

<template>
  <label v-if="label" class="form-label"
    >{{ label }} <span v-if="required" class="text-red">*</span></label
  >
  <v-text-field
    v-model="displayValue"
    variant="outlined"
    density="compact"
    @input="onInput"
    :error="error"
    :error-messages="errorMessages"
  />
</template>
