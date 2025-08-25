import { useApiStore } from '@/services/api.js'

const apiUrl = `${import.meta.env.VITE_APP_URL_API}/users`

const getIndex = async (params) => {
  const result = await useApiStore().query(apiUrl, params)
  if (result) {
    return result.data
  }
  return false
}

export default {
  getIndex,
}
