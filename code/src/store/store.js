import Vue from "vue";
import Vuex from "vuex";
/* eslint-disable no-console */

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    status: "", // Is never used, but might be usefull
    /**
     * User object should be replaced by JWT or other encrypted token.
     * Alternatively implement HTWK login via Shiboleth.
     * Godspeed!
     */
    user: {
      name: "Gast", // User name, could be used for personalisation
      authenticated: false,
      role: "guest", // Role management for DB access control (guest: no rights, student: limited rights, admin: full rights)
      issued: Date.now() // Timestamp, used for timeout
    },

    cyProdName: null, // Name of current graph
    cyProdQuant: null, // Quantity of current graph

    graph: null, // Current graph
    wert: 0
  },
  mutations: {
    AUTH_REQUEST: state => {
      // Indicates that login attempt is in progress
      state.status = "loading";
    },
    AUTH_SUCCESS: (state, user) => {
      // Indicates successfull login and sets user object accordingly
      state.status = "success";
      state.user.authenticated = user.authenticated;
      state.user.issued = user.issued;
      state.user.name = user.name;
      state.user.role = user.role;
      state.status = "";
    },
    AUTH_ERROR: state => {
      // Indicates unsuccessfull login attempt
      state.status = "error";
    },
    retrieveStore(state) {
      // Checks if old state can be loaded and then does so
      if (localStorage.getItem("store")) {
        this.replaceState((state, JSON.parse(localStorage.getItem("store"))));
      }
    },
    saveGraph(state, graphh) {
      // Saves current graph to store
      state.graph = graphh;
    },
    // !OUTDATED!
    // Replaced by AUTH_REQUEST action
    //login(state) {
    //  state.user.authenticated = true;
    //},
    logout(state) {
      //resets user object to initial state
      state.user.authenticated = false;
      state.user.name = "Gast";
      state.user.role = "guest";
      state.graph = null;
    },
    // !OUTDATED!
    //setName(state, name) {
    //  state.user.name = name;
    //},
    //setRole(state, role) {
    //  state.user.role = role;
    //},

    // !OUTDATED!
    // But potentially usefull
    //refreshIssued(state) { //updates timestamp on user object
    //  state.user.issued = Date.now();
    //},
    resetGraph(state) {
      // Removes graph from store
      state.graph = null;
    },
    setDownload(state, wert) {
      state.wert = wert;
    },
    setCyProdName(state, newName) {
      // Sets cyProdName to current graphs name
      state.cyProdName = newName;
    },
    setCyProdQuant(state, newQuant) {
      // Sets cyProdQuant to current graphs quantity
      state.cyProdQuant = newQuant;
    }
  },
  actions: {
    /**
     * Sends post request to backend.
     * If user input is verified by backend token is saved into the store.
     * If user input cannot be verified the token will be removed from the store.
     */

    AUTH_REQUEST: ({ commit, dispatch }, data) => {
      // eslint-disable-next-line no-console
      return new Promise((resolve, reject) => {
        // The Promise used for router redirect in login
        commit("AUTH_REQUEST");
        // eslint-disable-next-line standard/object-curly-even-spacing
        // const url = "https://sam.imn.htwk-leipzig.de:7070/VarG/login";
        //url: data: user
        if (data.user === "Demo" && data.password === "123456") {
          let user = {
            name: "Demo",
            role: "admin",
            issued: Date.now(),
            authenticated: true
          };
          console.log(user)
          commit("AUTH_SUCCESS", user);
        } else {
          commit("AUTH_ERROR", "err");
        }
        //   axios
        //     .post(url, {
        //       user: data.user,
        //       password: data.password
        //     })
        //     .then(resp => {
        //       const user = resp;
        //       commit("AUTH_SUCCESS", user);
        //       resolve(resp);
        //     })
        //   .catch(err => {
        //     commit("AUTH_ERROR", err);
        //     reject(err);
        //   })
      });
    }
  },
  getters: {
    getGraphName: state => {
      // Returns current graphs name
      return state.graph.data.prodName;
    },
    getGraphQuant: state => {
      // Returns current graphs quantity
      return state.graph.data.prodQuant;
    },
    getAuth: state => {
      // Returns weather user is autehnticated
      return state.user.authenticated;
    },
    getGraph: state => {
      // Returns graph
      return state.graph;
    },
    getIssuedTime: state => {
      // Returns timestamp
      return state.user.issued;
    },
    // We have no idea if this is needed ;)
    getCyProdName: state => {
      return state.cyProdName;
    },
    getCyProdQuant: state => {
      return state.cyProdQuant;
    },
    getDownload: state => {
      return state.wert;
    }
  }
});

/**
 * Watches for chages in store and saves stores content to localStorage after every change.
 * This makes it possible to keep store persistent throughout sessions.
 */
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});
