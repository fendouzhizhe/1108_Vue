// 引入Vue
import Vue from 'vue'
// 引入APP
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
