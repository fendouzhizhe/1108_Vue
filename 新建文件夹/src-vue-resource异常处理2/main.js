// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 引入VueResource
import VueResource from 'vue-resource'
// 设置是否显示
Vue.config.productionTip = false
// 声明式插件包
Vue.use(VueResource)
// 实例化Vue对象
/* eslint-disable no-new */
new Vue({
  // 获取容器对爱那个
  el: '#app',
  // 注册组件
  components: {
    App
  },
  // 使用模版
  template: '<App/>'
})
