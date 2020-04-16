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
  // 加
  add (state) {
    state.number++
  },
  // 减
  minus (state) {
    state.number--
  }
}
// 间接修改状态数据
const actions = {
  // 加
  add (context) {
    context.commit('add')
  },
  // 减
  minus ({ commit }) {
    commit('minus')
  },
  // 奇数加
  addOdd ({ commit, state }) {
    if (state.number % 2 !== 0) {
      commit('add')
    }
  },
  // 异步加
  addAsync ({ commit }) {
    setTimeout(() => {
      commit('add')
    }, 1000);
  }
}
// 计算属性,getter方法的对象
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
