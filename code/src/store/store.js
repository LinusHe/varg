import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    getCounter: async(context) => {
          context.commit('increment');
          
    }
  },
  getter: {
    getState: state => {
        return state.count;
    }
  }
})

//export defualt store