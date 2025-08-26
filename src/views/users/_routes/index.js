export default [
  {
    path: '/users',
    name: 'Users',
    component: () => import('../index.vue'),
    meta: {
      pageTitle: 'Usuários',
      requiresAuth: true,
    },
  },
  {
    path: '/users/create',
    name: 'users-create',
    component: () => import('../_components/form.vue'),
    meta: {
      pageTitle: 'Criar Usuário',
      requiresAuth: true,
    },
  },
  {
    path: '/users/edit/:id',
    name: 'users-edit',
    component: () => import('../_components/form.vue'),
    meta: {
      pageTitle: 'Editar Usuário',
      requiresAuth: true,
    },
  },
  {
    path: '/users/view/:id',
    name: 'users-view',
    component: () => import('../_components/show.vue'),
    meta: {
      pageTitle: 'Detalhar Usuário',
      requiresAuth: true,
    },
  },
]
