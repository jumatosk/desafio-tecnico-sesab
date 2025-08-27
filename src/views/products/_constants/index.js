const breadcrumbs = [
  {
    title: 'Produtos',
    to: '/products',
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
    title: 'Produtos',
    to: '/products',
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
  title: '',
  price: '',
  description: '',
  category: '',
  image: '',
  rating: {
    rate: '',
    count: '',
  },
}

export const constants = {
  breadcrumbs,
  breadcrumbsForm,
  form,
}
