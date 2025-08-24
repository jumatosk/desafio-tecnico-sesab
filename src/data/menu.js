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
      to: 'products',
    },
  ],
}
