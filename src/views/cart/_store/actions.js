import api from '../_api'

async function getIndex(params) {
  this.index = await api.getIndex(params)
}

async function updateItem(params) {
  return await api.updateItem(params)
}

export default {
  getIndex,
  updateItem,
}
