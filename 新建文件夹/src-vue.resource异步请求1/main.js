import App from './App'
import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: `<App/>`
})
