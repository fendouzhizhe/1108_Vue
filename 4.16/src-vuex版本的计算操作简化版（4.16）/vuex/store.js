// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 声明使用Vuex
Vue.use(Vuex)
// 状态数据
const state = {
  number: 0
}
// 直接修改状态数据
const mutations = {

  ADD (state) {
    // 加
    state.number++
  },

  MINUS (state) {
    // 减
    state.number--
  }
}
// 间接修改状态数据
const actions = {
  // 加
  add (context) {
    context.commit('ADD')
  },
  // 减
  minus ({ commit }) {
    commit('MINUS')
  },
  // 奇数加
  addOdd ({ commit, state }) {
    if (state.number % 2 !== 0) {
      commit('ADD')
    }
  },
  // 异步加
  addAsync ({ commit }) {
    setTimeout(() => {
      commit('ADD')
    }, 1000);
  }
}
// 计算属性的getter方法的对象
const getters = {
  evenOrOdd (state) {
    return state.number % 2 !== 0 ? '奇数' : '偶数'
  }
}

// 实例化Vuex对象,并暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
