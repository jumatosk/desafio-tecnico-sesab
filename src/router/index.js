import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import productsRoutes from '../views/products/_routes/index.js'
import CartRoutes from '../views/cart/_routes/index.js'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      children: [...productsRoutes, ...CartRoutes],
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
