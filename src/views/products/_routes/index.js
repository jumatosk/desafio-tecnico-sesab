export default [
  {
    path: '/products',
    name: 'Products',
    component: () => import('../index.vue'),
    meta: {
      pageTitle: 'Produtos',
    },
  },
  {
    path: '/products/register',
    name: 'products-register',
    component: () => import('@/views/products/_components/form.vue'),
    meta: {
      pageTitle: 'Cadastrar produto',
    },
  },
]
