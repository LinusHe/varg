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
  },
  {
    path: "/database",
    name: "Varg - Datenbank import",
    component: Database,
    meta: {
      requiresAuth: true
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
  if (to.matched.some(record => record.meta.requiresAuth) && store.state.count === 0) {
    // Check if NO logged user
    //Redirect is performed before old state is loaded
    //but old state is restored before new page is loaded
    //if (store.state.count == 0) {
      //alert("Authenticated: " + store.state.user.autehticated);
      if(store.state.user.autehticated == false) {
      // Go to login
      next({
        path: "/home/login",
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
        path: "/",
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
