import Vue from 'vue'
import App from './App'

// 设置浏览器控制台的提示是否显示
Vue.config.productionTip = false

// 实例化
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: `<App />`
})
