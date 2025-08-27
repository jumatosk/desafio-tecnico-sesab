export default [
  {
    path: '/auth/login',
    name: 'auth',
    component: () => import('../index.vue'),
    meta: {
      pageTitle: 'Login',
    },
  },
]
