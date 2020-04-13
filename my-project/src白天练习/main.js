// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 设置浏览器控制不显示提示信息
Vue.config.productionTip = false
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App />'
})
