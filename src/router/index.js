import HomeVista from '@/vistas/HomeVista.vue'
import LogingVista from '@/vistas/LogingVista.vue'
import RegisterVista from '@/vistas/RegisterVista.vue'
import Workspace from '@/vistas/Workspace.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/config' // Importamos auth directamente

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeVista, meta: { requiresAuth: true } },
    { path: '/tareas', component: Workspace, meta: { requiresAuth: true } },
    { path: '/login', component: LogingVista },
    { path: '/register', component: RegisterVista },
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const user = auth.currentUser 

  if (requiresAuth) {
    if (!user) {
      next('/login')
    } else if (!user.emailVerified) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router