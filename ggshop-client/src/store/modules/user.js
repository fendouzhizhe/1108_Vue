//引入UUID
import {getUUID} from '@/utils/storageUtils'
// 引入api接口函数
import { reqLogin, reqRegister, reqLogout } from '@/api'

const state = {
  // 用户信息数据对象
  userInfo:JSON.parse(localStorage.getItem('user_info_key'))|| {}, 
  // 临时用户id
  userTempId: getUUID() 
}
const mutations = {
  // 修改用户信息
  RECEIVE_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },
  // 清空用户信息
  RESET_USER_INFO (state) {
    state.userInfo = {}
  }

}
const actions = {
  // 登录操作
  async login ({ commit }, { mobile, password }) {
    const result = await reqLogin(mobile, password)
    if (result.code === 200) {
      // 用户的信息存储到localStorage中
      const userInfo =result.data
      localStorage.setItem('user_info_key',JSON.stringify(userInfo))
      // 再把用户信息更新到vuex的state状态数据对象中
      commit('RECEIVE_USER_INFO',userInfo)
    } else {
      throw new Error(result.message || '登录失败')
    }
  },
  // 注册操作
  async register ({ commit }, userInfo) {
    const result = await reqRegister(userInfo)
    if (result.code !== 200) {
      throw new Error(result.message || '注册失败')
    }
  },

  // 退出操作
  async logout ({ commit }) {
    const result = await reqLogout()
    // 成功和失败的处理
    if (result.code !== 200) {
      throw new Error(result.message || '退出失败')
    } else {
      //重置
      commit('RESET_USER_INFO')
      // 清空缓存
      localStorage.removeItem('user_info_key')
    }
  }

}
const getters={}

export default {
  state,
  mutations,
  actions,
  getters
}