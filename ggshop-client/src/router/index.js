//引入Vue
import Vue from 'vue'
//引入VueRouter
import VueRouter from 'vue-router'

//引入路由器
import routes from './routes'
// 引入store
import store from '../store'

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
const router = new VueRouter({
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

router.beforeEach((to, from, next) => {
  // 要检测的路由地址
  const checkPath = ['/trade', '/pay', '/center']
  // 目标路由地址
  const targetPath = to.path
  if (checkPath.find(path => targetPath.indexOf(path) === 0)) {
    // 判断是否登录了
    if (store.state.user.userInfo.name) {
      next()
    } else {
      next('/login?redirect=' + targetPath)
    }
  } else {
    // 正常的放行
    next()
  }

})


// 暴露
export default router