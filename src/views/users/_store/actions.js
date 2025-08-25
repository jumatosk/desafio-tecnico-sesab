import api from '../_api'

async function getIndex(params) {
  this.index = await api.getIndex(params)
}

async function createItem(params) {
  return await api.createItem(params)
}

export default {
  getIndex,
  createItem,
}
