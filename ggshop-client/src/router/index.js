//引入Vue
import Vue from 'vue'
//引入VueRouter
import VueRouter from 'vue-router'

//引入路由器
import routes from './routes'


// 解决路由跳转的bug
const originPath = VueRouter.prototype.push
// 给成功的回调函数指定一个默认为空的的函数参数
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) {
  return originPath.call(this, location, onComplete, onAbort)
}
// 给失败的回调函数指定一个默认为空的函数参数
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
  return originPath.call(this, location, onComplete, onAbort)
}

//声明路由
Vue.use(VueRouter)
//暴露路由
export default new VueRouter({
  mode:'history',
  routes
})