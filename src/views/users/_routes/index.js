export default [
  {
    path: '/users',
    name: 'Users',
    component: () => import('../index.vue'),
    meta: {
      pageTitle: 'Usuários',
    },
  },
]
