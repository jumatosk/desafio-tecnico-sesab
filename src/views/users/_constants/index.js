const headers = [
  {
    title: 'Nome',
    align: 'left',
    key: 'nome',
    value: (row) => `${row.name.firstname} ${row.name.lastname}`,
  },
  { title: 'E-mail', align: 'left', key: 'email' },
  { title: 'Nome de usuário', align: 'left', key: 'username' },
  { title: 'Telefone', align: 'left', key: 'phone' },
  { title: 'Ações', align: 'left', key: 'actions' },
]

const breadcrumbs = [
  {
    title: 'Usuários',
    to: '/users',
    disabled: false,
  },
  {
    title: 'Listar',
    to: '',
    disabled: true,
  },
]

const breadcrumbsForm = [
  {
    title: 'Usuários',
    to: '/users',
    disabled: false,
  },
  {
    title: 'Cadastrar',
    to: '',
    disabled: true,
  },
]

const form = {
  id: null,
  username: '',
  email: '',
  password: '',
  address: {
    geolocation: {
      lat: '',
      long: '',
    },
    city: '',
    street: '',
    number: null,
    zipcode: '',
  },
  name: {
    firstname: '',
    lastname: '',
  },
  phone: '',
}

export const constants = {
  headers,
  breadcrumbs,
  breadcrumbsForm,
  form,
}
