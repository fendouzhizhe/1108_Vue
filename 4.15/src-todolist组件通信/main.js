import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
// 定义事件总线
Vue.prototype.$car = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
