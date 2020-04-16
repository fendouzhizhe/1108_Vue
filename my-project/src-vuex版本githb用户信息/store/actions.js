// 引入axios
import axios from 'axios'
// 引入mutation的type
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-types.js'
// 间接修改状态数据方法
export default {
  // 发送异步请求修改状态数据
  async search ({ commit }, searchName) {
    // 发送异步请求
    const url = `https://api.github.com/search/users`
    // 第一次更改状态
    commit(REQUEST)
    try {
      // 根据地址和参数进行异步请求
      const response = await axios.get(url, {
        params: {
          q: searchName
        }
      })
      // 遍历数据
      console.log(response.data.items)
      const users = response.data.items.map(user => ({
        login: user.login,
        html_url: user.html_url,
        avatar_url: user.avatar_url
      }))

      // 第二次更新状态数据
      commit(REQ_SUCCESS, users)
    } catch (error) {
      // 再次更新状态数据
      commit(REQ_ERROR, error)
    }
  }
}
