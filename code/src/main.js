import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Graph:
// import graph from './vargraph'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
