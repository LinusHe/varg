import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Graph from "../views/Graph.vue";
import Database from "../views/Database.vue";
import Menu from "../views/Menu.vue";
import NewGraph from "../views/NewGraph.vue";
//import Vuex from 'vuex'
import { store } from "../store/store.js";

//var auth;
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home/login"
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    redirect: "/home/menu",
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
        meta: {
          title: "Varg - Login"
        }
      },
      {
        path: "menu",
        component: Menu,
        name: "menu",
        meta: {
          requiresAuth: true,
          title: "Varg - Hauptmenü"
        }
      },
      {
        path: "new",
        name: "newGraph",
        component: NewGraph,
        meta: {
          requiresAuth: true,
          title: "Varg - Neuer Graph"
        }
      },
      {
        path: "database",
        name: "Varg - Datenbank import",
        component: Database,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/graph",
    name: "graph",
    component: Graph,
    meta: {
      requiresAuth: true,
      requiresGraph: true,
      title: "Varg - Graph Editor"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if(store.state.user.autehticated == true) {
        //proceed to rout
        //Role management could take place here
        next();
      } else {
        //Go to Login
        next({
          path: "/home/login",
          query: {
            redirect: to.fullPath
          }
        });
      }
  } else {
    next();
  }

  // Check wether Graph is created
  if (to.matched.some(record => record.meta.requiresGraph)) {
    // Check if Graph has no Name
    if (store.getters.getCyProdName == null) {
      // Main Menu
      next({
        path: "/home/menu"
      });
    } else {
      // Proceed to route
      next();
    }
    // Guest proceed optional, maybe later?
  } else {
    // Proceed to route
    next();
  }
});

export default router;
