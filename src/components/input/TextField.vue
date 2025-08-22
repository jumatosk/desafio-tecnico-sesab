<script setup>
import { computed, ref, watch } from 'vue'
const props = defineProps({
  value: {
    type: String,
    default: null,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: String,
    default: null,
  },
  blur: {
    type: Function,
    default: () => {},
  },
  required: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: null,
  },
  clickAppend: {
    type: Function,
    default: () => {},
  },
  enterPressed: {
    type: Function,
    default: () => {},
  },
  clickClear: {
    type: Function,
    default: () => {},
  },
  onInput: {
    type: Function,
    default: () => {},
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: 'text',
  },
  prependInnerIcon: {
    type: String,
    default: undefined,
  },
  appendInnerIcon: {
    type: String,
    default: undefined,
  },
  onKeydown: {
    type: Function,
    default: () => {},
  },
  onFocus: {
    type: Function,
    default: () => {},
  },
  ref: null,
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.value)

const localValue = computed({
  get() {
    return internalValue.value
  },
  set(value) {
    internalValue.value = value
    emit('update:modelValue', value)
  },
})

watch(
  () => props.value,
  (newValue) => {
    if (!internalValue.value) internalValue.value = newValue
  },
)

const clearValue = () => {
  emit('update:modelValue', null)
  props.enterPressed()
}
</script>
<template>
  <label v-if="label" class="form-label"
    >{{ label }} <span v-if="required" class="text-red">*</span></label
  >
  <v-text-field
    v-model="localValue"
    :append-inner-icon="appendInnerIcon"
    :prepend-inner-icon="prependInnerIcon"
    @click:append-inner="clickAppend"
    @keypress.enter="enterPressed"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    @click:clear="clearValue"
    :error="error"
    @blur="blur"
    :type="type"
    :error-messages="errorMessages"
    density="compact"
    variant="outlined"
    @input="onInput"
    v-bind="$attrs"
    @keydown="onKeydown"
    :ref="ref"
    @focus="onFocus"
  ></v-text-field>
</template>
