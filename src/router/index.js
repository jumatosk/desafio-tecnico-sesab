import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import BaseLayout from '@/layout/BaseLayout.vue'
import productsRoutes from '../views/products/_routes/index.js'
import CartRoutes from '../views/cart/_routes/index.js'
import UsersRoutes from '../views/users/_routes/index.js'
import AuthRoutes from '../views/auth/_routes/index.js'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [...productsRoutes, ...CartRoutes, ...UsersRoutes],
    },
    {
      path: '/auth',
      children: [...AuthRoutes],
    },
  ],
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  const defaultTitle = 'Desafio Técnico SESAB'
  document.title = to.meta.pageTitle ? `${to.meta.pageTitle} | ${defaultTitle}` : defaultTitle

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
