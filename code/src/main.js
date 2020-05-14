/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuex from "vuex";
import { store } from "./store/store.js";
import Darkmode from 'darkmode-js';



// import VueCytoscape from "vue-cytoscape";
Vue.config.productionTip = false;

//Darkmode
new Darkmode().showWidget();

// Vue.use(VueCytoscape);

Vue.directive("click-outside", {
  bind: function(el, binding, vnode) {
    this.event = function(event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", this.event);
  },
  unbind: function(el) {
    document.body.removeEventListener("click", this.event);
  }
});

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
  //Try to retrieve store before creating new instance
  //Works, but doesn't due to asynchronity
  beforeCreate() {
    this.$store.commit("retrieveStore");
	}
}).$mount("#app");