// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'

// 引入MintUI
// import MintUI from 'mint-ui'
import { Button } from 'mint-ui';
// 引入MintUI的样式
// import 'mint-ui/lib/style.css'

// 注册成全局组件
Vue.component(Button.name, Button);
// 声明使用
// Vue.use(MintUI)
// 是否显示
Vue.config.productionTip = false
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
