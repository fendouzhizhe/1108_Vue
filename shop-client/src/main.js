//引入Vue
import Vue from "vue";
//引入App
import App from "./App.vue";
//引入路由
import router from './router'

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  //注册路由
  router
}).$mount("#app");
