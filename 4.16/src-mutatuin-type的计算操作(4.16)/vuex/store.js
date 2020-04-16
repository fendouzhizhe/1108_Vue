// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入mutation-type
import {ADD,MINUS} from './mutation-type.js'
// 声明使用Vuex
Vue.use(Vuex)



// 状态数据的对象
const state = {
  number: 0
}
// 直接修改状态数据
const mutations = {
  [ADD] (state) {
    state.number++
  },
  // 减
  [MINUS] (state) {
    state.number--
  }
}
// 间接修改状态数据
const actions = {
  // 加
  add (context) {
    context.commit(ADD)
  },
  // 减
  minus ({ commit }) {
    commit(MINUS)
  },
  // 奇数加
  addOdd ({ commit, state }) {
    if (state.number % 2 !== 0) {
      commit(ADD)
    }
  },
  // 异步加
  addAsync ({ commit }) {
    setTimeout(() => {
      commit(ADD)
    }, 1000)
  }
}
// 计算属性的get的方法
const getters = {
  evenOrOdd (state) {
    return state.number % 2 !== 0 ? '奇数' : '偶数'
  }
}

// 实例化Vuex并暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
