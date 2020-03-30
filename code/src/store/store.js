import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 1,
    cyProdName: null,
    cyProdQuant: null
  },
  mutations: {
    increment(state) {
      state.count++;
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

//export defualt store
