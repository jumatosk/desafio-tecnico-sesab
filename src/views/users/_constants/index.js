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

export const constants = {
  headers,
  breadcrumbs,
}
