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

const editUser = (id) => {
  router.push(`/users/edit/${id}`)
}
</script>
<template>
  <base-page-heading title="Usuários">
    <template #subtitle>
      <Breadcrumbs :items="constants.breadcrumbs"></Breadcrumbs>
    </template>
    <template #extra>
      <Button @click="router.push('/users/create')"> Adicionar </Button>
    </template>
  </base-page-heading>
  <Datatable
    :data="stateUsers.index"
    :headers="constants.headers"
    :showPaginate="false"
    :customColumn="['actions']"
  >
    <template #actions="{ item }">
      <IconButton
        icon="mdi-pencil"
        color="green-lighten-1"
        variant="text"
        :onClick="() => editUser(item.id)"
        title="Editar"
      />
    </template>
  </Datatable>
</template>
