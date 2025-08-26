import api from '../_api'

async function getIndex(params) {
  this.index = await api.getIndex(params)
}

async function addItem(item) {
  this.index.push(item)
}

async function decreaseItem(item) {
  const itemIndex = this.index.findIndex((i) => i.id === item.id)
  if (itemIndex !== -1) {
    this.index.splice(itemIndex, 1)
  }
}

async function deleteItem(id) {
  return await api.deleteItem(id)
}

export default {
  getIndex,
  addItem,
  decreaseItem,
  deleteItem,
}
