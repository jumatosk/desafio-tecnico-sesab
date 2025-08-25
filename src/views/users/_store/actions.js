import api from '../_api'

async function getIndex(params) {
  this.index = await api.getIndex(params)
}

export default {
  getIndex,
}
