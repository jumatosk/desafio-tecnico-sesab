export default {
  main: [
    {
      name: 'Início',
      icon: 'mdi-home',
      subActivePaths: ['/'],
      to: '/',
    },
    {
      name: 'Produtos',
      icon: 'mdi-shopping',
      subActivePaths: '/products',
      to: '/products',
    },
    {
      name: 'Usuários',
      icon: 'mdi-account',
      subActivePaths: '/users',
      to: '/users',
      requiresAuth: true,
    },
  ],
}
