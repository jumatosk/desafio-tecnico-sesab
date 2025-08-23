import api from '../_api'

async function getIndex(params) {
  this.index = await api.getIndex(params)
}

async function createItem(params) {
  return await api.createItem(params)
}

async function getItemById(id) {
  this.productById = await api.getItemById(id)
}

async function updateItem(params) {
  return await api.updateItem(params)
}

export default {
  getIndex,
  createItem,
  getItemById,
  updateItem,
}
