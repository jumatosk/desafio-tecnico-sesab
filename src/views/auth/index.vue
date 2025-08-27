<script setup>
import { reactive, computed, ref, watch } from 'vue'
import { useAuthStore } from './_store'
import { useUsersStore } from '../users/_store'
import { useRouter, useRoute } from 'vue-router'
import { useTemplateStore } from '@/stores/template'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'
import { errorMessages } from '@/utils/errorMessages.js'
import { useApiStore } from '@/services/api'

const store = useTemplateStore()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const authState = authStore
const apiStore = useApiStore()
const showPassword = ref(false)
const usersStore = useUsersStore()

const form = reactive({
  username: '',
  password: '',
})

const rules = computed(() => {
  return {
    username: {
      required,
      maxLength: maxLength(100),
    },
    password: {
      required,
      maxLength: maxLength(255),
    },
  }
})

const v$ = useVuelidate(rules, form)

async function onSubmit() {
  const result = await v$.value.$validate()

  if (!result) {
    return
  } else {
    const response = await authStore.login(form)

    if (response.status === 201) {
      authStore.updateIsLogged(true)
      saveToken(response.data.token)
      saveUsername()
      saveUserId()
      router.push('/')
    }
  }
}

const saveToken = (token) => {
  localStorage.setItem('token', token)
}

const saveUsername = () => {
  localStorage.setItem('username', form.username)
}

const saveUserId = () => {
  localStorage.setItem('userId', usersStore.getUserId())
}

watch(v$, (newVal) => {
  if (newVal.username.$error) {
    const errorType = newVal.username.$errors[0].$params.type
    const message = errorMessages[errorType]
    newVal.username.$errors[0].$params.message = message
  }
  if (newVal.password.$error) {
    const errorType = newVal.password.$errors[0].$params.type
    const message = errorMessages[errorType]
    newVal.password.$errors[0].$params.message = message
  }
})
</script>

<template>
  <v-container fluid class="d-flex align-center justify-center bg-grey-lighten-5 login-container">
    <v-row justify="center" class="w-100">
      <v-col cols="12" sm="10" md="8" lg="5" xl="4">
        <v-card class="elevation-10 rounded-xl">
          <v-card-text class="pa-8">
            <div class="d-flex justify-center mb-6">
              <v-img src="/images/logo.png" max-width="180" contain />
            </div>
            <div class="text-center mb-6">
              <h2 class="text-h5 font-weight-bold mb-2">Bem-vindo(a)</h2>
              <p class="text-body-2 text-medium-emphasis">
                Informe suas credenciais para acessar o sistema
              </p>
            </div>
            <v-form @submit.prevent="onSubmit" class="d-flex flex-column gap-4">
              <TextField
                v-model="form.username"
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
                density="comfortable"
                variant="outlined"
                hide-details="auto"
                required
              />
              <br />
              <TextField
                v-model="form.password"
                :error="v$.password.$errors.length > 0"
                :onInput="v$.password.$touch"
                :blur="v$.password.$touch"
                :errorMessages="
                  v$.password.$errors.length ? v$.password.$errors[0].$params.message : ''
                "
                :type="showPassword ? 'text' : 'password'"
                label="Senha"
                density="comfortable"
                variant="outlined"
                hide-details="auto"
                required
                :appendInnerIcon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                :clickAppend="() => (showPassword = !showPassword)"
              />
              <v-btn
                type="submit"
                color="primary"
                size="large"
                class="mt-4"
                block
                :disabled="apiStore.numberOfAjaxCallsPending > 0"
              >
                <template v-if="apiStore.numberOfAjaxCallsPending === 0">
                  <v-icon start>mdi-login</v-icon>
                  Acessar
                </template>
                <template v-else>
                  <v-icon start class="spinner-rotate">mdi-loading</v-icon>
                  Processando...
                </template>
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <div class="text-caption text-center mt-6 text-medium-emphasis">
          <strong>{{ store.app.name + ' ' + store.app.version }}</strong> &copy;
          {{ store.app.copyright }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  width: 100vw;
}

.spinner-rotate {
  animation: spin 1.5s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
