import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    //new
    //Placeholder for encrpted JWT or other alternative (Shiboleth)
    user: {
      name: "Gast",
      autehticated: false,
      role: "guest"
    },
    issued : Date.now(),

    //shows wheather an atempt to load from localStorage was made
    //Probably useless
    ready: false,
    
    //old
    //kept for now to prevent everything from breaking
    count: 0,
    
    cyProdName: null,
    cyProdQuant: null
  },
  mutations: {
    //new
    //Checks if old state can be loaded and then does so
    retrieveStore(state) {
			if(localStorage.getItem("store")) {
        //Please make this promise based, Lennart
        this.replaceState((state, JSON.parse(localStorage.getItem("store"))));
        //alert(Date.now() > (state.issued + 30000));
        //Delay is set to 30 sec for debugging purposes
        if(Date.now() > (state.issued + 30000)) {
          localStorage.removeItem("store");
          this.commit("logout");

          this.$router.replace("/home/login");
        }
        //alert("Old state has been retrieved.");
      }
      state.ready = true;
    },
    login(state) {
      state.user.autehticated = true;
    },
    logout(state) {
      state.user.autehticated = false;
      state.user.name = "Gast";
      state.user.role = "guest";
    },
    setName(state, name) {
      state.user.name = name;
    },
    setRole(state, role) {
      state.user.role = role;
    },

    //old
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },

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
  },
  getters: {
    getAuth: state => {
      return state.user.autehticated;
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
