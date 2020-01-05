import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Graph from '../views/Graph.vue'
import Database from '../views/Database.vue'
import Menu from '../views/Menu.vue'
import NewGraph from '../views/NewGraph.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/home/login'
  },
  {
    path: '/home',
    name: 'Varg - Login',
    component: Home,
    children: [
      {
        // login view will be rendered in home view
        // when /home/login is path
        path: 'login',
        component: Login
      },
      {
        path: 'menu',
        component: Menu
      },
      {
        path: 'new',
        component: NewGraph
      }
    ]
  },
  {
    path: '/graph',
    name: 'Varg - Graph Editor',
    component: Graph
  },
  {
    path: '/database',
    name: 'Varg - Datenbank import',
    component: Database
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
