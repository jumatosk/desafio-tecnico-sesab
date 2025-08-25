import { defineStore } from 'pinia'
import actions from './actions'
import getters from './getters'

export const useUsersStore = defineStore('users', {
  state: () => ({
    index: [],
    userById: {},
  }),
  getters,
  actions,
})
