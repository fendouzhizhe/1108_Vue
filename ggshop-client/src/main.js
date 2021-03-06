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

//引入分页组件
import Pagination from './components/Pagination'
// 引入vue表单验证的插件
import './validate'
//引入接口函数
import * as API from './api'
 
// 引入elements
import './elements'
// 引入图片懒加载的插件包
import VueLazyload from 'vue-lazyload'
// 引入图片懒加载要使用的图片
import loading from './assets/images/loading.gif'
// 声明使用该插件
Vue.use(VueLazyload, {
  loading
})
//每个组件实例都可以直接访问接口函数
Vue.prototype.$API=API
// 设置浏览器的控制台中是否显示默认提示信息
Vue.config.productionTip = false
//注册全局组件
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)

// Vue.prototype.$bus=new Vue()

//创建实例
new Vue({
  //数据初始化前
  beforeCreate () {
    Vue.prototype.$bus=this
  },
  render: h => h(App),
  //注册路由器
  router,
  //注册仓库
  store
}).$mount('#app')
