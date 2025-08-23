import { useApiStore } from '@/services/api.js'

const apiUrl = `${import.meta.env.VITE_APP_URL_API}/products`

const getIndex = async (params) => {
  const result = await useApiStore().get(apiUrl, params)
  if (result) {
    return result.data
  }
  return false
}

const createItem = async (params) => {
  const result = await useApiStore().post(apiUrl, JSON.parse(JSON.stringify(params)))
  if (result) {
    return result
  }
  return false
}

const getItemById = async (id) => {
  const result = await useApiStore().get(`${apiUrl}/${id}`)
  if (result) {
    return result.data
  }
  return false
}

const updateItem = async (params) => {
  const id = params.id
  delete params.id
  const result = await useApiStore().put(`${apiUrl}`, id, JSON.parse(JSON.stringify(params)))
  if (result) {
    return result
  }
  return false
}

export default {
  getIndex,
  createItem,
  getItemById,
  updateItem,
}
