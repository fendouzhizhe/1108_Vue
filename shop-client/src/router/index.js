//引入Vue
import Vue from 'vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入routes
import routes from './routes'
//使用路由
Vue.use(VueRouter)

//实例路由，暴露
export default new VueRouter({
  //路由地址模式，不带#号
  mode:'history',
  //路由组件注册数量
  routes
})