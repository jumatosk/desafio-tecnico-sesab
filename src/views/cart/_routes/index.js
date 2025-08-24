export default [
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../index.vue'),
    meta: {
      pageTitle: 'Carrinho',
    },
  },
]
