import { defineStore } from 'pinia'

export const useTemplateStore = defineStore('template', {
  state: () => ({
    app: {
      name: 'Loja Virtual',
      version: '1.0.0',
      copyright: new Date().getFullYear(),
    },
  }),
})
