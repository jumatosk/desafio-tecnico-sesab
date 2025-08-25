import { defineStore } from 'pinia'
import actions from './actions'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogged: false,
  }),
  actions,
})
