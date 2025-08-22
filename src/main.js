import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import './styles/main.css'

import App from './App.vue'
import router from './router'
import TextField from './components/input/TextField.vue'
import Datatable from './components/ui/Datatable.vue'
import Currency from './components/input/Currency.vue'
import IconButton from './components/ui/IconButton.vue'
import Breadcrumb from './components/ui/Breadcrumb.vue'
import BasePageHeading from './components/ui/BasePageHeading.vue'
import money from 'v-money3'

const app = createApp(App)

const vuetify = createVuetify({
  components: {
    ...components,
    directives,
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(money)

app.component('TextField', TextField)
app.component('Datatable', Datatable)
app.component('Currency', Currency)
app.component('IconButton', IconButton)
app.component('Breadcrumb', Breadcrumb)
app.component('BasePageHeading', BasePageHeading)

app.mount('#app')
