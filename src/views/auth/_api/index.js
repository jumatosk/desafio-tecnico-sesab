import { useApiStore } from '@/services/api.js'

const apiUrl = `${import.meta.env.VITE_APP_URL_API}/auth`

const login = async (params) => {
  const result = await useApiStore().post(`${apiUrl}/login`, JSON.parse(JSON.stringify(params)))
  if (result) {
    return result
  }
  return false
}

export default {
  login,
}
