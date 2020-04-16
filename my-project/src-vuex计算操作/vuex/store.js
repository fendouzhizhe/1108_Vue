// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 声明使用Vuex
Vue.use(Vuex)
// 包含了多个状态数据的对象
const state = {
  count: 0
}
// 直接修改状态数据
const mutations = {
  // 加的操作
  increment (state) {
    state.count++
  },
  // 减的操作
  deincrement (state) {
    state.count--
  }
}
// 包含了多个间接修改状态数据的方法的对象
const actions = {
  // 加的操作
  increment (context) {
    // 找到mutations中的INCREMENT,进行使用
    context.commit('increment')
  },
  // 减的操作
  deincrement ({ commit }) {
    commit('deincrement')
  },
  // 奇数的时候做加的操作
  incrementIfOdd ({ commit, state }) {
    if (state.count % 2 !== 0) {
      commit('increment')
    }
  },
  // 异步的加法操作
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000);
  }
}
// 包含了多个状态数据的计算属性的getter方法的对象
const getters = {
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}

// 实例化Vuex对象,并暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
