import api from '../_api'

async function login(params) {
  return await api.login(params)
}

async function updateIsLogged(isLogged) {
  this.isLogged = isLogged
}

export default {
  login,
  updateIsLogged,
}
