<script setup>
defineProps({
  title: {
    type: String,
    description: '',
  },
  subtitle: {
    type: String,
    description: '',
  },
})
</script>

<template>
  <v-sheet class="pb-4">
    <v-container class="py-2">
      <slot>
        <v-row
          v-if="title || $slots.extra"
          align="center"
          justify="space-between"
          class="flex-column flex-sm-row"
        >
          <v-col class="pa-0" cols="12" sm="auto">
            <h1 v-if="title" class="text-h5 font-weight-bold">
              {{ title }}
            </h1>
            <div v-if="$slots.subtitle">
              <slot name="subtitle"></slot>
            </div>
          </v-col>
          <v-col v-if="$slots.extra" class="pa-0" cols="12" sm="auto">
            <slot name="extra"></slot>
          </v-col>
        </v-row>
      </slot>
    </v-container>
  </v-sheet>
</template>
