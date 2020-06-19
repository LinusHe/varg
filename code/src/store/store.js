import axios from 'axios';
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    
    //token: localStorage.getItem('user-token') || '',
    status: '',
    //new
    //Placeholder for encrpted JWT or other alternative (Shiboleth)
    user: {
      name: "Gast",
      authenticated: false,
      role: "guest",
      //admin: false
      issued : Date.now(),
    },

    //shows wheather an atempt to load from localStorage was made
    //Probably useless
    ready: false,

    //old
    //kept for now to prevent everything from breaking
    /*
    count: 0,
    */
    cyProdName: null,
    cyProdQuant: null,
    

    graph: null
  },
  mutations: {

   AUTH_REQUEST: (state) => {
      state.status = 'loading';
    },
    AUTH_SUCCESS: (state, user) => {
      state.status = 'success';
      state.user.authenticated = user.data.authenticated;
      state.user.issued = user.data.issued;
      state.user.name = user.data.name;
      state.user.role = user.data.role;
    },
    AUTH_ERROR: (state) => {
      //state.user = null;
      state.status = 'error';
    },
    //new
    //Checks if old state can be loaded and then does so
    retrieveStore(state) {
			if(localStorage.getItem("store")) {
        //Please make this promise based, Lennart
        this.replaceState((state, JSON.parse(localStorage.getItem("store"))));
        //alert(Date.now() > (state.issued + 30000));
        //Delay is set to 30 sec for debugging purposes
        //alert("Old state has been retrieved.");
      }
      //state.ready = true;
    },

    saveGraph(state, graphh) {
      state.graph = graphh;
    },
    login(state) {
      state.user.authenticated = true;
    },
    logout(state) {
      state.user.authenticated = false;
      state.user.name = "Gast";
      state.user.role = "guest";
      state.graph =null;
    },
    setName(state, name) {
      state.user.name = name;
    },
    setRole(state, role) {
      state.user.role = role;
    },
    refreshIssued(state) {
      state.user.issued = Date.now();
    },
    ResetGraph(state){
      state.graph =null;
    },

    /*old
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },*/

    setCyProdName(state, newName) {
      state.cyProdName = newName;
    },
    setCyProdQuant(state, newQuant) {
      state.cyProdQuant = newQuant;
    }
  },
  actions: {
    getCounter: async context => {
      context.commit("increment");
    },

    /**
     * send post request to ROUTE2AUTHENTICATIONBACKEND.
     * if user input is verified by backend token is saved into the store
     * if user input cannot be verified the token will be removed from the store
     */

    AUTH_REQUEST: ({commit, dispatch}, data) => {
      // eslint-disable-next-line no-console
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit("AUTH_REQUEST");
        // eslint-disable-next-line standard/object-curly-even-spacing
        const url = 'http://192.168.99.101:1110/VarG/login';
        //url: data: user
        axios
          .post(url, {
            user: data.user,
            password: data.password
          })
          .then(resp => {
            const user = resp;
            commit("AUTH_SUCCESS", user);
            resolve(resp);
          })
        .catch(err => {
          commit("AUTH_ERROR", err);
          reject(err);
        })
      })
    }
  },
  getters: {
    /*
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    */


    getGraphName: state => {
      return state.graph.data.prodName;
    },
    getGraphQuant: state => {
      return state.graph.data.prodQuant;
    },
    getAuth: state => {
      return state.user.authenticated;
    },
    getGraph: state => {
      return state.graph;
    },

    getIssuedTime: state => {
      return state.user.issued;
    },

    getState: state => {
      return state.count;
    },
    getCyProdName: state => {
      return state.cyProdName;
    },
    getCyProdQuant: state => {
      return state.cyProdQuant;
    }
  }
});

//Saves current state to local storage after each change

//TODO: Make promisebased!

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
  //alert("Saved to localStorage.");
});
