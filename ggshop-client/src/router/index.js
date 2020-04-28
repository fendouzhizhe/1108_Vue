//引入Vue
import Vue from 'vue'
//引入VueRouter
import VueRouter from 'vue-router'

//引入路由器
import routes from './routes'


// 解决路由跳转的bug
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给成功的回调函数指定一个默认为空的的函数参数
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) {
  return originPush.call(this, location, onComplete, onAbort)
}
// 给失败的回调函数指定一个默认为空的函数参数
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
  return originReplace.call(this, location, onComplete, onAbort)
}

//指定catch
// VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
//   return originReplace.call(this, location, onComplete, onAbort).catch(()=>{ })
// }

//声明路由
Vue.use(VueRouter)
//暴露路由
export default new VueRouter({
  mode:'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {
      x:0,
      y:0
    }
  }
})