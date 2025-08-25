import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'
import swal from 'sweetalert2'
import NProgress from 'nprogress'
import { getToken } from './jwt'

export const useApiStore = defineStore('apiStore', {
  state: () => ({
    numberOfAjaxCallsPending: 0,
    error: null,
    router: useRouter(),
  }),

  actions: {
    init() {
      this.setupHeaders()

      axios.defaults.baseURL = import.meta.env.VITE_APP_URL_API

      axios.interceptors.response.use((response) => response, this.handleError.bind(this))
      this.addInterceptRequest()
    },

    async addInterceptRequest() {
      axios.interceptors.request.use(
        async (config) => {
          this.numberOfAjaxCallsPending++
          NProgress.start()
          return config
        },
        (error) => {
          return Promise.reject(error)
        },
      )

      axios.interceptors.response.use(
        async (response) => {
          this.numberOfAjaxCallsPending--
          if (this.numberOfAjaxCallsPending === 0) {
            NProgress.done()
          }
          return response
        },
        async (error) => {
          this.numberOfAjaxCallsPending--
          if (this.numberOfAjaxCallsPending === 0) {
            NProgress.done()
          }
          return Promise.reject(error)
        },
      )
    },

    setupHeaders() {
      axios.defaults.headers.common['Content-Type'] = 'application/json'
      axios.defaults.headers.common['Accept'] = 'application/json'
      // axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    },

    checkResponse(response) {
      if (!response) {
        return {
          data: '',
          status: 500,
          statusText: '',
        }
      }
      return response
    },

    async handleError(errRef) {
      const errorTitle = 'Erro de Conexão!'
      const errorMessage =
        'Não foi possível carregar os dados do servidor. Isso pode ser um problema temporário ou uma restrição de segurança. Por favor, tente novamente mais tarde.'

      if (!errRef.response && errRef.code === 'ERR_NETWORK') {
        return this.messageError(null, errorMessage, errorTitle, 'error')
      }
      this.error = errRef.response

      const response = this.checkResponse(errRef.response)

      const code = response.status || 0
      let errorMsg = ''
      let typeMessage = 'warning'

      if (response.data?.message) {
        errorMsg = response.data.message
      }

      switch (code) {
        case 400:
          this.messageError(response, response.data.error, 'Atenção', 'error')
          break

        case 0:
        case 401:
          if (response) {
            this.messageError(response, response.data, 'Atenção!', 'error')
          } else {
          }
          break

        case 404:
          if (response.data.error == 'Dados não encontrados') {
            return this.messageError(null, response.data.message, response.data.error, 'warning')
          } else {
            this.messageError(response.data.message, response.data.error, 'Atenção!', 'warning')
          }
          break

        case 406:
          let erros = null
          let bodyMessage = ''
          let messageTitle = 'Atenção!'

          if (!response.data.message) {
            bodyMessage = ['Falha na comunicação com o banco de dados.']
          } else {
            erros = response.data.error

            if (typeof erros === 'string') {
              bodyMessage = "<p style='text-align:center; line-height: 1.6;'>"
              bodyMessage += erros.length ? erros : response.data?.message
            } else {
              bodyMessage = "<p style='text-align:start; line-height: 1.6;'>"
              Object.keys(erros).forEach((item, index) => {
                bodyMessage += `${index + 1}º-  ${erros[item]} <br/>`
              })
            }
            bodyMessage += '</p>'
          }

          this.messageError(response, bodyMessage, messageTitle, (typeMessage = 'error'))
          break

        case 500:
          this.messageError(null, errorMessage, errorTitle, 'error')
          break

        case 504:
          if (errorMsg !== '') {
            errorMsg =
              'O servidor demorou muito para responder. Isso pode ser um problema temporário. Tente recarregar a página em alguns instantes.'
          }
          this.messageError(response, errorMsg, 'Tempo limite excedido!', 'error')
          break

        case 429:
          if (!swal.isVisible()) {
            swal.fire({
              title: 'Atenção!',
              text: 'Você fez muitas solicitações em um curto período de tempo. Por favor, aguarde um instante e tente novamente.',
              icon: 'error',
              toast: true,
              position: 'top-end',
              timer: 45000,
              showConfirmButton: false,
            })
          }
          break
      }
    },

    async messageError(
      response,
      message,
      messageTitle,
      messageType,
      iconColor = 'red',
      confirmButtonColor = 'red',
    ) {
      swal.fire({
        icon: messageType,
        title: messageTitle,
        html: message,
        iconColor,
        confirmButtonColor,
        confirmButtonText: `<div style="color: white !important;">Ok</div>`,
      })
      if (response?.status === 401) {
        localStorage.clear()
      }
    },

    async query(resource, data) {
      return axios.get(resource, { params: data })
    },

    async get(resource, slug = '') {
      return axios.get(`${resource}/${slug}`)
    },

    async post(resource, params) {
      return await axios.post(resource, params)
    },

    async put(resource, id, params) {
      const route = id ? `${resource}/${id}` : resource
      return axios.put(route, params)
    },

    patch(resource, id, params) {
      const route = id ? `${resource}/${id}` : resource
      return axios.patch(route, params)
    },

    delete(resource, id) {
      return axios.delete(`${resource}/${id}`)
    },
  },
})
