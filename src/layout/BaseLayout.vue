<script setup>
import Header from '@/components/ui/Header.vue'
import GlobalLayout from '@/components/ui/GlobalLayout.vue'
import Footer from '@/components/ui/Footer.vue'
</script>

<template>
  <v-app>
    <Header />
    <GlobalLayout>
      <router-view />
    </GlobalLayout>
    <Footer />
  </v-app>
</template>

<style scoped></style>
