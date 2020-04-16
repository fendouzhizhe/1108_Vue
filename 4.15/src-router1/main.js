// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 引入路由器对象
import router from './router'
// 提示信息是否显示
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 注册路由器
  router
})
