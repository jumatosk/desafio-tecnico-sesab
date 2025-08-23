<script setup>
import { onMounted, inject, ref, reactive, computed, watch } from 'vue'
import { useProductsStore } from '../_store'
import { useRouter, useRoute } from 'vue-router'
import { required, maxLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { errorMessages } from '@/utils/errorMessages.js'
import { constants } from '../_constants'

const productsStore = useProductsStore()
const stateProducts = productsStore.$state
const breadcrumbs = ref(constants.breadcrumbsForm)
const form = reactive({ ...constants.form })
const route = useRoute()
const router = useRouter()
const strings = inject('strings')

onMounted(async () => {
  breadcrumbs.value[1].title = 'Cadastrar'
  if (route.params.id) {
    breadcrumbs.value[1].title = 'Editar'
    await productsStore.getItemById(route.params.id)
  }
})

const rules = computed(() => {
  return {
    title: {
      required,
      maxLength: maxLength(400),
    },
    price: {
      required,
      maxLength: maxLength(20),
    },
    description: {
      required,
      maxLength: maxLength(400),
    },
    category: {
      required,
      maxLength: maxLength(100),
    },
    image: {
      required,
      maxLength: maxLength(400),
    },
  }
})

const v$ = useVuelidate(rules, form)

const onSubmit = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    return
  }

  if (route.params.id) {
    form.id = route.params.id

    const response = await productsStore.updateItem(form)

    if (response.status == 200) {
      Swal.messageToast(strings.msg_alterar)
      router.go(-1)
    }
  } else {
    const response = await productsStore.createItem(form)

    if (response.status == 201) {
      Swal.messageToast(strings.msg_adicionar)
      router.go(-1)
    }
  }
}

watch(
  v$,
  (newVal) => {
    if (newVal.title.$error) {
      const errorType = newVal.title.$errors[0].$params.type
      const message = errorMessages[errorType]
      newVal.title.$errors[0].$params.message = message
    }
    if (newVal.price.$error) {
      const errorType = newVal.price.$errors[0].$params.type
      const message = errorMessages[errorType]
      newVal.price.$errors[0].$params.message = message
    }
    if (newVal.description.$error) {
      const errorType = newVal.description.$errors[0].$params.type
      const message = errorMessages[errorType]
      newVal.description.$errors[0].$params.message = message
    }
    if (newVal.category.$error) {
      const errorType = newVal.category.$errors[0].$params.type
      const message = errorMessages[errorType]
      newVal.category.$errors[0].$params.message = message
    }
    if (newVal.image.$error) {
      const errorType = newVal.image.$errors[0].$params.type
      const message = errorMessages[errorType]
      newVal.image.$errors[0].$params.message = message
    }
  },
  { deep: true },
)

watch(
  () => stateProducts.productById,
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
  <base-page-heading :title="route.params.id ? 'Editar produto' : 'Novo Produto'">
    <template #subtitle>
      <Breadcrumbs :items="breadcrumbs"></Breadcrumbs>
    </template>
  </base-page-heading>
  <form @submit.prevent="onSubmit">
    <v-card class="pa-4 mb-4 bg-grey-lighten-5 elevation-0">
      <v-row>
        <v-col cols="12" sm="12" md="9">
          <TextField
            v-model="form.title"
            :value="form.title"
            :error="v$.title.$errors.length > 0"
            :onInput="v$.title.$touch"
            :blur="v$.title.$touch"
            :errorMessages="v$.title.$errors.length ? v$.title.$errors[0].$params.message : ''"
            label="Nome"
            required
          />
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <Currency
            v-model="form.price"
            :value="form.price"
            label="Preço"
            :error="v$.price.$errors.length > 0"
            :blur="v$.price.$touch"
            :errorMessages="v$.price.$errors.length ? v$.price.$errors[0].$params.message : ''"
            required
          />
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <TextField
            v-model="form.description"
            :value="form.description"
            :error="v$.description.$errors.length > 0"
            :onInput="v$.description.$touch"
            :blur="v$.description.$touch"
            :errorMessages="
              v$.description.$errors.length ? v$.description.$errors[0].$params.message : ''
            "
            label="Descrição"
            required
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <TextField
            v-model="form.category"
            :value="form.category"
            :error="v$.category.$errors.length > 0"
            :onInput="v$.category.$touch"
            :blur="v$.category.$touch"
            :errorMessages="
              v$.category.$errors.length ? v$.category.$errors[0].$params.message : ''
            "
            label="Categoria"
            required
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <TextField
            v-model="form.image"
            :value="form.image"
            :error="v$.image.$errors.length > 0"
            :onInput="v$.image.$touch"
            :blur="v$.image.$touch"
            :errorMessages="v$.image.$errors.length ? v$.image.$errors[0].$params.message : ''"
            label="URL da Imagem"
            required
          />
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="12" sm="12" md="3">
          <TextField
            v-model="form.bairro"
            :value="form.bairro"
            :error="v$.bairro.$errors.length > 0"
            :onInput="v$.bairro.$touch"
            :blur="v$.bairro.$touch"
            :errorMessages="v$.bairro.$errors.length ? v$.bairro.$errors[0].$params.message : ''"
            label="Bairro"
            required
          />
        </v-col>
        <v-col cols="12" sm="12" md="7">
          <TextField
            v-model="form.logradouro"
            :value="form.logradouro"
            :error="v$.logradouro.$errors.length > 0"
            :onInput="v$.logradouro.$touch"
            :blur="v$.logradouro.$touch"
            :errorMessages="
              v$.logradouro.$errors.length ? v$.logradouro.$errors[0].$params.message : ''
            "
            label="Logradouro"
            required
          />
        </v-col>
        <v-col cols="12" sm="12" md="2">
          <TextField
            v-model="form.numero"
            :value="form.numero"
            :error="v$.numero.$errors.length > 0"
            :onInput="v$.numero.$touch"
            :blur="v$.numero.$touch"
            :errorMessages="v$.numero.$errors.length ? v$.numero.$errors[0].$params.message : ''"
            label="Número"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="7">
          <TextField
            v-model="form.complemento"
            :value="form.complemento"
            :error="v$.complemento.$errors.length > 0"
            :onInput="v$.complemento.$touch"
            :blur="v$.complemento.$touch"
            :errorMessages="
              v$.complemento.$errors.length ? v$.complemento.$errors[0].$params.message : ''
            "
            label="Complemento"
            required
          />
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <TextField
            v-model="form.eh_endereco_brasil"
            :value="form.eh_endereco_brasil"
            :error="v$.eh_endereco_brasil.$errors.length > 0"
            :onInput="v$.eh_endereco_brasil.$touch"
            :blur="v$.eh_endereco_brasil.$touch"
            :errorMessages="
              v$.eh_endereco_brasil.$errors.length
                ? v$.eh_endereco_brasil.$errors[0].$params.message
                : ''
            "
            label="Endereço no Brasil?"
            required
          />
        </v-col>
      </v-row> -->
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
