// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 引入store
import store from './store'
// 设置提示信息是否显示
Vue.config.productionTip = false
// 实例化Vue对象
/* eslint-disable no-new */
new Vue({
  // 获取
  el: '#app',
  // 注册组件
  components: {
    App
  },
  // 使用模版
  template: '<App/>',
  // 注册仓库
  store
})
