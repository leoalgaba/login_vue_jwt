import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/protegida',
    name: 'protegida',
    component: () => import('../views/protegida.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/registro.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const rutaEsprotegida = to.matched.some(record => record.meta.rutaProtegida)

  if (rutaEsprotegida && store.state.token === null) {
    next('/')
  } else {
    next()
  }
})

export default router
