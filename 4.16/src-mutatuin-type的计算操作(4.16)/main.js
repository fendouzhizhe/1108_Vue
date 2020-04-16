// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 引入store
import store from './vuex/store.js'
// 提示信息是否显示
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 注册仓库
  store
})
