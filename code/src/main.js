/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import {store} from './store/store.js'
var auth = false;
Vue.config.productionTip = false

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    this.event = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', this.event)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', this.event)
  },
});



new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
/*
vue,
vuex
vuetify
cytoscape
jswebtoken

2-views (eine nur für den login und die anderen für den eingeloggten zustandt)







*/