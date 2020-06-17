import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    /*
    token: localStorage.getItem('user-token') || '',
    status: '',*/
    //new
    //Placeholder for encrpted JWT or other alternative (Shiboleth)
    user: {
      name: "Gast",
      autehticated: false,
      role: "guest",
      admin: false
    },

    issued : Date.now(),

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


    graph: null,
    wert: 0
  },
  mutations: {

    //test


    /*
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading';
    },
    [AUTH_SUCCESS]: (state, token) => {
      state.status = 'success';
      state.token = token;
    },
    [AUTH_ERROR]: (state) => {
      state.token = null;
      state.status = 'error';
    },*/
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
      state.user.autehticated = true;
    },
    logout(state) {
      state.user.autehticated = false;
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
      state.issued = Date.now();
    },
    ResetGraph(state){
      state.graph =null;
    },
    setDownload(state ,wert){
      state.wert = wert;
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
    }

    /**
     * send post request to ROUTE2AUTHENTICATIONBACKEND.
     * if user input is verified by backend token is saved into the store
     * if user input cannot be verified the token will be removed from the store
     */

    /*
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit(AUTH_REQUEST);
        axios({url: 'ROUTE2AUTHENTICATIONBACKEND', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token;
            commit(AUTH_SUCCESS, token);
            dispatch(USER_REQUEST);
            resolve(resp):
          })
        .catch(err => {
          commit(AUTH_ERROR, err);
          reject(err);
        })
      })
    } */
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
      return state.user.autehticated;
    },
    getGraph: state => {
      return state.graph;
    },

    getIssuedTime: state => {
      return state.issued;
    },

    getState: state => {
      return state.count;
    },
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

//Saves current state to local storage after each change

//TODO: Make promisebased!

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
  //alert("Saved to localStorage.");
});
