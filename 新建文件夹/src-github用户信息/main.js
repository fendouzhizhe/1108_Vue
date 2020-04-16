import App from './App'
import Vue from 'vue'

Vue.config.productionTip = false
// 定义一个事件总线对象
Vue.prototype.$bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: `<App/>`
})
