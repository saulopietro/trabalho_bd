import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Admin from '../pages/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
  path: '/filmes/:id',
  name: 'FilmeDetalhes',
  component: () => import('../pages/FilmeDetalhes.vue'),
  props: true
}
] 

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
