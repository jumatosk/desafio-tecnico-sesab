async function getIndex() {
  return this.index
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

export default {
  getIndex,
  addItem,
  decreaseItem,
}
