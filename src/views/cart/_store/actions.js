async function getIndex() {
  return this.index
}

async function addItem(item) {
  this.index.push(item)
}

export default {
  getIndex,
  addItem,
}
