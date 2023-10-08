import { createRouter, createWebHistory } from 'vue-router'
import GadoView from '../views/gado/GadoView.vue'
import AbateView from '../views/AbateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/gado',
      name: 'gado',
      component: () => GadoView
    },
    {
      path: '/abate',
      name: 'abate',
      component: () => AbateView
    }
  ]
})

export default router
