import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    //new
    user: {
      name: "Gast",
      autehticated: false,
      role: "guest"
    },
    
    //old
    count: 0,
    
    cyProdName: null,
    cyProdQuant: null
  },
  mutations: {
    //new
    //Checks if old state can be loaded and then does so
    retrieveStore(state) {
			if(localStorage.getItem("store")) {
				this.replaceState((state, JSON.parse(localStorage.getItem("store"))));
        alert("Old state has been retrieved.");
      }
    },
    login(state) {
      state.user.autehticated = true;
    },
    logout(state) {
      state.user.autehticated = false;
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
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
  //alert("Saved to localStorage.");
});
