// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入MintUI
import { Button } from 'mint-ui'
// 注册成全局组件---当前的项目任意的组件中都可以直接使用按钮组件
Vue.component(Button.name, Button)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
