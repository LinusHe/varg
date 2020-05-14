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
var options = {
  bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#eee', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: true // default: true
}

const darkmode = new Darkmode(options);
darkmode.showWidget();


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