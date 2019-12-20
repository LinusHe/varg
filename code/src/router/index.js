import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Varg - Login',
    component: Login
  },
  {
    path: '/graph',
    name: 'Varg - Graph Editor',
    component: () => import(/* webpackChunkName: "graph" */ '../views/Graph.vue')
  },
  {
    path: '/database',
    name: 'Varg - Datenbank import',
    component: () => import(/* webpackChunkName: "database" */ '../views/Database.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
