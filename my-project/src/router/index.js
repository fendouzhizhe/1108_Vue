// 引入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入routes
import routers from './routers'
// 声明使用插件
Vue.use(VueRouter)
// 创建路由器对象,并暴露出去
export default new VueRouter({
  mode: 'history',
  routers
})
