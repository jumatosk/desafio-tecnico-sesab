import { defineStore } from 'pinia'
import actions from './actions'
import getters from './getters'

export const useCartStore = defineStore('cart', {
  state: () => ({
    index: [],
  }),
  getters,
  actions,
})
