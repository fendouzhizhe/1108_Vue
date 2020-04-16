import Vue from 'vue'
import App from './App'
// 引入vue-resource
import VueResource from 'vue-resource'
// 声明使用该组件
Vue.use(VueResource)
Vue.config.productionTip = false
// 定义事件总线
Vue.prototype.$car = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
