import { useApiStore } from '@/services/api.js'

const apiUrl = `${import.meta.env.VITE_APP_URL_API}/carts`

const getIndex = async (params) => {
  const result = await useApiStore().get(apiUrl, params)
  if (result) {
    return result.data
  }
  return false
}

const deleteItem = async (id) => {
  const result = await useApiStore().delete(apiUrl, id)
  if (result) {
    return result
  }
  return false
}

export default {
  getIndex,
  deleteItem,
}
