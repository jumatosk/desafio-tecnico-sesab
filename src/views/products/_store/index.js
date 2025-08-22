import { defineStore } from 'pinia'
import actions from './actions'
import getters from './getters'

export const useProductsStore = defineStore('products', {
  state: () => ({
    index: [],
  }),
  getters,
  actions,
})
