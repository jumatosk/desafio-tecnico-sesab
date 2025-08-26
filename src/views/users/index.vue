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

const viewUser = (id) => {
  router.push(`/users/view/${id}`)
}

const deleteUser = async (item) => {
  Swal.deleteMessage(
    'Deseja excluir o usuário: ',
    `${item.name.firstname} ${item.name.lastname}`,
  ).then(async (result) => {
    if (result.isConfirmed) {
      const response = await usersStore.deleteItem(item.id)
      if (response.status != 200) return false
      await search()
      Swal.messageToast(strings.msg_excluir)
    }
  })
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
        color="success"
        variant="tonal"
        :onClick="() => editUser(item.id)"
        title="Editar"
        density="default"
        class="mx-1"
      />
      <IconButton
        icon="mdi-eye"
        color="primary"
        variant="tonal"
        :onClick="() => viewUser(item.id)"
        title="Detalhar"
        density="default"
        class="mx-1"
      />
      <IconButton
        icon="mdi-delete"
        color="red"
        variant="tonal"
        :onClick="() => deleteUser(item)"
        title="Excluir"
        density="default"
        class="mx-1"
      />
    </template>
  </Datatable>
</template>
