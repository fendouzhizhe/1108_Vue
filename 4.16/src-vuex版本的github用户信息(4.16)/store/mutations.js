// 引入mutation的type
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-types.js'
// 直接修改状态数据方法
export default {
  // 1.改变了状态数据
  [REQUEST] (state) {
    // 第一次更改状态数据
    state.firstView = false
    state.loading = true
  },
  // 2.发送请求成功,改变了状态数据
  [REQ_SUCCESS] (state, users) {
    // 第二次更新状态数据
    state.loading = false
    state.users = users
  },
  // 3.请求失败,改变了状态数据
  [REQ_ERROR] (state, error) {
    // 再次更新状态数据
    state.loading = false
    state.errorMsg = error
  }

}
