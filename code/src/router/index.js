import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Graph from "../views/Graph.vue";
import Database from "../views/Database.vue";
import Menu from "../views/Menu.vue";
import NewGraph from "../views/NewGraph.vue";
import { store } from "../store/store.js";
import LoadingScreen from "../views/LoadingScreen.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home/loading"
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
      },
      {
        path: "loading",
        component: LoadingScreen
      }
    ]
  },
  {
    path: "/graph",
    name: "graph",
    component: Graph,
    meta: {
      requiresAuth: true,
      // Declared for unnecessary! (for now) greetings LoginTeam ;)
      // equiresGraph: true,
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
      if(store.getters.getAuth) { // Check if user is authenticated
        next();
      } else {
        next({
          path: "/home/loading",
          query: {
            redirect: to.fullPath
          }
        });
      }
  } else {
    next();
  }

  // !OUTDATED!
  // Functionality was taken over by ../views/Loadingscreen.vue
  // Check wether Graph is created
  /*
  if (to.matched.some(record => record.meta.requiresGraph)) {
    // Check if Graph has no Name
    if (store.getters.getCyProdName === null) {
      // Main Menu
      next({
        path: "/home/menu",
      });
    } else {
      // Proceed to route
      next();
    }
    // Guest proceed optional, maybe later?
  } else {
    // Proceed to route
    next();
  }*/
}),
router.afterEach((to, from) => {
    if (from.name === "graph" && (to.name === "newGraph" || to.name === "menu")) {
        if (store.getters.getGraph != null){
        store.commit("resetGraph");
        }
        router.replace("/graph");
        location.reload();
      }

});

export default router;
