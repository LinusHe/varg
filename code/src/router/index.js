import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Graph from '../views/Graph.vue'
import Database from '../views/Database.vue'
import Menu from '../views/Menu.vue'
import NewGraph from '../views/NewGraph.vue'
//import Vuex from 'vuex'
import {store} from '../store/store.js'

//var auth;
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
        path: 'login',
        component: Login
        
      },
      {
        path: 'menu',
        component: Menu,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'new',
        component: NewGraph,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/graph',
    name: 'Varg - Graph Editor',
    component: Graph,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/database',
    name: 'Varg - Datenbank import',
    component: Database,
    meta: {
      requiresAuth: true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (store.state.count == 0) {
      // Go to login
      next({
        path: '/home/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
    // Guest proceed optional, maybe later?
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (this.$main.auth) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});


export default router
