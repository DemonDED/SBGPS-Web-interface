import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/additional-information',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdditionalInformationView.vue'),
    beforeEnter: () => {
      if (!document.cookie || document.cookie == 'user=guest') {
        return({ name: 'Auth' })
      }
    } 
  },
  {
    path: '/settings',
    component: () => import(/* webpackChunkName: "about" */ '../views/SettingsView.vue'),
    beforeEnter: () => {
      if (!document.cookie || document.cookie == 'user=guest') {
        return({ name: 'Auth' })
      }
    } 
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthorizationView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
