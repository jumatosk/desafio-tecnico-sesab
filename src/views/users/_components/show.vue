<script setup>
import { onMounted, inject, ref, reactive, watch, computed } from 'vue'
import { useUsersStore } from '../_store'
import { useRouter, useRoute } from 'vue-router'
import { constants } from '../_constants'
import ShowData from '@/components/ui/ShowData.vue'
const usersStore = useUsersStore()
const stateUsers = usersStore.$state
const breadcrumbs = ref(constants.breadcrumbsForm)
const form = reactive({ ...constants.form })
const route = useRoute()
const router = useRouter()
const strings = inject('strings')

onMounted(async () => {
  if (route.params.id) {
    breadcrumbs.value[1].title = 'Detalhar'
    await usersStore.getItemById(route.params.id)
  }
})

const mapUrl = computed(() => {
  if (form.id) {
    const lat = form.address.geolocation.lat
    const lng = form.address.geolocation.long
    const zoom = 1
    const width = 500
    const height = 300
    return `https://tiles.stadiamaps.com/static/osm_bright.png?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&markers=${lat},${lng}`
  }
})

watch(
  () => stateUsers.userById,
  async (itemById) => {
    let keys = Object.keys(form)
    keys.forEach((i) => {
      if (itemById[i] != null) {
        form[i] = itemById[i]
      }
    })
  },
)
</script>
<template>
  <base-page-heading title="Detalhar Usuário">
    <template #subtitle>
      <Breadcrumbs :items="breadcrumbs"></Breadcrumbs>
    </template>
  </base-page-heading>
  <v-card class="pa-4 mb-4 bg-grey-lighten-5 elevation-0">
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <ShowData label="Nome" :value="form.name?.firstname + ' ' + form.name?.lastname" />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <ShowData label="Usuário" :value="form.username" />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <ShowData label="E-mail" :value="form.email" />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <ShowData label="Telefone" :value="form.phone" />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <ShowData
          label="Endereço"
          :value="
            form.address?.street +
            ', ' +
            form.address?.number +
            ' - ' +
            form.address?.city +
            ' - ' +
            form.address?.zipcode
          "
        />
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <ShowData label="Geolocalização" />
        <img :src="mapUrl" alt="Mapa estático" v-if="mapUrl" />
      </v-col>
    </v-row>
    <div class="d-flex justify-end mt-4">
      <Button type="button" variant="outlined" @click="() => router.go(-1)">
        {{ strings.btn_voltar }}
      </Button>
    </div>
  </v-card>
</template>
