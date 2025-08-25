<script setup>
import { onMounted, inject, ref, reactive, computed, watch } from 'vue'
import { useUsersStore } from '../_store'
import { useRouter, useRoute } from 'vue-router'
import { required, maxLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { validateEmail } from '@/functions/validateEmail'
import { errorMessages } from '@/utils/errorMessages.js'
import { constants } from '../_constants'

const usersStore = useUsersStore()
const stateUsers = usersStore.$state
const breadcrumbs = ref(constants.breadcrumbsForm)
const form = reactive({ ...constants.form })
const route = useRoute()
const router = useRouter()
const strings = inject('strings')

const rules = computed(() => {
  return {
    username: {
      required,
      maxLength: maxLength(100),
    },
    email: {
      required,
      maxLength: maxLength(255),
      email: (email) => validateEmail.test(email),
    },
    password: {
      required,
      maxLength: maxLength(255),
    },
  }
})

const v$ = useVuelidate(rules, form)

const onSubmit = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    return
  }

  const response = await usersStore.createItem(form)

  if (response.status == 201) {
    Swal.messageToast(strings.msg_adicionar)
    router.go(-1)
  }
}

watch(v$, (newVal) => {
  if (newVal.username.$error) {
    const errorType = newVal.username.$errors[0].$params.type
    const message = errorMessages[errorType]
    newVal.username.$errors[0].$params.message = message
  }
  if (newVal.email.$error) {
    const errorType = newVal.email.$errors[0].$property
    const message = errorMessages[errorType]
    newVal.email.$errors[0].$params.message = message
  }
  if (newVal.password.$error) {
    const errorType = newVal.password.$errors[0].$params.type
    const message = errorMessages[errorType]
    newVal.password.$errors[0].$params.message = message
  }
})
</script>
<template>
  <base-page-heading :title="'Novo Usuário'">
    <template #subtitle>
      <Breadcrumbs :items="breadcrumbs"></Breadcrumbs>
    </template>
  </base-page-heading>
  <form @submit.prevent="onSubmit">
    <v-card class="pa-4 mb-4 bg-grey-lighten-5 elevation-0">
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <TextField
            v-model="form.username"
            :value="form.username"
            :error="v$.username.$errors.length > 0"
            :onInput="
              (e) => {
                v$.username.$touch()
                form.username = e.target.value.replace(/\s/g, '')
              }
            "
            :blur="v$.username.$touch"
            :errorMessages="
              v$.username.$errors.length ? v$.username.$errors[0].$params.message : ''
            "
            label="Nome de Usuário"
            required
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <TextField
            v-model="form.email"
            :value="form.email"
            label="E-mail"
            :onInput="
              (e) => {
                v$.email.$touch()
                form.email = e.target.value.replace(/\s/g, '')
              }
            "
            :error="v$.email.$errors.length > 0"
            :blur="v$.email.$touch"
            :errorMessages="v$.email.$errors.length ? v$.email.$errors[0].$params.message : ''"
            required
            @keydown.space.prevent
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <TextField
            v-model="form.password"
            :value="form.password"
            :error="v$.password.$errors.length > 0"
            :onInput="v$.password.$touch"
            :blur="v$.password.$touch"
            :errorMessages="
              v$.password.$errors.length ? v$.password.$errors[0].$params.message : ''
            "
            type="password"
            label="Senha"
            required
          />
        </v-col>
      </v-row>
      <div class="d-flex justify-end mt-4">
        <Button type="button" variant="outlined" @click="() => router.go(-1)">
          {{ strings.btn_voltar }}
        </Button>
        <Button class="ml-3" type="submit">
          {{ strings.btn_salvar }}
        </Button>
      </div>
    </v-card>
  </form>
</template>

<style scoped></style>
