// 引入Vue
import Vue from 'vue'
// 引入APP
import App from './App.vue'
//引入路由器
import router from './router'
//引入商品分类导航组件
import TypeNav from './components/TypeNav'


Vue.config.productionTip = false
//注册全局组件
Vue.component('TypeNav',TypeNav)

new Vue({
  render: h => h(App),
  //注册路由器
  router
}).$mount('#app')
