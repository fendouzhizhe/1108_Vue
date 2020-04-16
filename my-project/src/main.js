//引入Vue
import Vue from 'vue'
//引入APP
import App from './App'
//引入路由
import router from './router'

//提示信息是否显示
Vue.config.productionTip = false

new Vue({
  //获取id
  el: '#app',
  components: {App},
  template: '<App/>',
  //注册路由
  router
})
