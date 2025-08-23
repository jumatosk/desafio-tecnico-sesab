import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { useApiStore } from '@/services/api.js'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import './styles/main.css'
import 'nprogress/nprogress.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import App from './App.vue'
import router from './router'
import TextField from './components/input/TextField.vue'
import Datatable from './components/ui/Datatable.vue'
import Currency from './components/input/Currency.vue'
import IconButton from './components/ui/IconButton.vue'
import Breadcrumbs from './components/ui/Breadcrumb.vue'
import BasePageHeading from './components/ui/BasePageHeading.vue'
import Button from './components/ui/Button.vue'
import money from 'v-money3'
import { Strings } from '@/utils/strings'
const app = createApp(App)

const vuetify = createVuetify({
  components: {
    ...components,
    directives,
  },
})

import Swal from './mixins/swal'
window.Swal = Swal

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(money)
app.provide('strings', Strings)

useApiStore().init()

app.component('TextField', TextField)
app.component('Datatable', Datatable)
app.component('Currency', Currency)
app.component('IconButton', IconButton)
app.component('Breadcrumbs', Breadcrumbs)
app.component('BasePageHeading', BasePageHeading)
app.component('Button', Button)

app.mount('#app')
