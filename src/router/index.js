import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: "main"},
    component: () => import('../views/Home-vue.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: "empty"},
    component: () => import('../views/Login-vue.vue')
  },
  {
    path: '/register',
    name: 'Register-vue',
    meta: {layout: "empty"},
    component: () => import('../views/Register-vue.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: "main"},
    component: () => import('../views/Categories-vue.vue')
  },
  {
    path: '/Detail-record',
    name: 'Detail-record',
    meta: {layout: "main"},
    component: () => import('../views/Detail-record.vue')
  },
  {
    path: '/History-vue',
    name: 'History-vue',
    meta: {layout: "main"},
    component: () => import('../views/History-vue.vue')
  },
 
  {
    path: '/Planing',
    name: 'Planing-vue',
    meta: {layout: "main"},
    component: () => import('../views/Planing-vue.vue')
  },
  {
    path: '/Profile',
    name: 'Profile-vue',
    meta: {layout: "main"},
    component: () => import('../views/Profile-vue.vue')
  },
  {
    path: '/New-record',
    name: 'New-record',
    meta: {layout: "main"},
    component: () => import('../views/New-record.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
