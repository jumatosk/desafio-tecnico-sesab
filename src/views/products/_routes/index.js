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
  {
    path: '/products/edit/:id',
    name: 'products-edit',
    component: () => import('@/views/products/_components/form.vue'),
    meta: {
      pageTitle: 'Editar produto',
    },
  },
  {
    path: '/products/view/:id',
    name: 'products-view',
    component: () => import('@/views/products/_components/show.vue'),
    meta: {
      pageTitle: 'Detalhar produto',
    },
  },
]
