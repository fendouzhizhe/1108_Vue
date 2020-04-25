// 引入Vue
import Vue from 'vue'
// 引入APP
import App from './App.vue'
//引入路由器
import router from './router'
//引入vuex中的store
import store from './store'
//引入mock
import './mock/mockServer'
//引入swiper样式文件
import "swiper/css/swiper.css";

//引入商品分类导航组件
import TypeNav from './components/TypeNav'

//引入轮播图组件
import Carousel from './components/Carousel'

Vue.config.productionTip = false
//注册全局组件
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
//创建实例
new Vue({
  render: h => h(App),
  //注册路由器
  router,
  //注册仓库
  store
}).$mount('#app')
