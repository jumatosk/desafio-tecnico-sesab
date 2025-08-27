<script setup>
import { useTemplateStore } from '../../stores/template'
const store = useTemplateStore()
</script>
<template>
  <v-footer app class="pa-0" elevation="2">
    <v-container fluid>
      <v-row class="text-caption">
        <v-col cols="12" sm="6" class="d-flex align-center justify-center justify-sm-end">
          <slot name="content-right">
            Desenvolvido por &nbsp;
            <a
              class="font-weight-semibold"
              href="https://github.com/jumatosk"
              target="_blank"
              rel="noopener"
              >Juliana Matos</a
            >
          </slot>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex align-center justify-center justify-sm-start">
          <slot name="content-left">
            <span
              class="font-weight-semibold text-caption"
              style="color: #5e5873; letter-spacing: 0.5px"
            >
              {{ store.app.name + ' ' + store.app.version }}
            </span>
            <span style="margin-left: 8px; color: #8e99a2"> &copy; {{ store.app.copyright }} </span>
          </slot>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<style scoped>
a {
  color: #5e5873;
  text-decoration: none;
}
</style>
