import App from './App'
import Vue from 'vue'
import router from './router'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: `<App/>`,
  // 注册路由器
  router
})
