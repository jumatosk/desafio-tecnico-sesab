export default [
  {
    path: '/products',
    name: 'Products',
    component: () => import('../index.vue'),
    meta: {
      pageTitle: 'Produtos',
    },
  },
]
