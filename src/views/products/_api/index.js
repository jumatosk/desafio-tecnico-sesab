import { useApiStore } from '@/services/api.js'

const apiUrl = import.meta.env.VITE_APP_URL_API

const getIndex = async (params) => {
  const result = await useApiStore().get(`${apiUrl}/products`, params)
  if (result) {
    return result.data
  }
  return false
}

export default {
  getIndex,
}
