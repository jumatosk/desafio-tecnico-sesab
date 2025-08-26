import { useApiStore } from '@/services/api.js'

const apiUrl = `${import.meta.env.VITE_APP_URL_API}/carts`

const deleteItem = async (id) => {
  const result = await useApiStore().delete(apiUrl, id)
  if (result) {
    return result
  }
  return false
}

export default {
  deleteItem,
}
