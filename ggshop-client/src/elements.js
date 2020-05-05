// 引入Vue
import Vue from 'vue'
// 引入element ui
import { MessageBox, Message } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;