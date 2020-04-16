import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
// 定义事件总线对象
Vue.prototype.$car = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
