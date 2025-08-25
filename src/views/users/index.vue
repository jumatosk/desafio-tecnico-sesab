<script setup>
import { onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from './_store'
import { constants } from './_constants'

const router = useRouter()
const usersStore = useUsersStore()
const stateUsers = usersStore.$state
const strings = inject('strings')

onMounted(async () => {
  await search()
})

const search = async () => {
  await usersStore.getIndex()
}
</script>
<template>
  <base-page-heading title="Usuários">
    <template #subtitle>
      <Breadcrumbs :items="constants.breadcrumbs"></Breadcrumbs>
    </template>
  </base-page-heading>
  <Datatable :data="stateUsers.index" :headers="constants.headers" />
</template>
