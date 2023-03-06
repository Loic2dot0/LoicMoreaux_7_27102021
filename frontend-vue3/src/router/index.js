import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/post/view/:id_post',
      name: 'post-view',
      component: () => import('../views/SinglePostView.vue')
    },
    {
      path: '/post/create',
      name: 'post-create',
      component: () => import('../views/PostCreateView.vue')
    },
    {
      path: '/post/modify/:id_post',
      name: 'post-modify',
      component: () => import('../views/PostModifyView.vue')
    },
    {
      path: '/error/:status',
      name: 'error',
      component: () => import('../views/ErrorView.vue')
    }
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
  ]
})

export default router
