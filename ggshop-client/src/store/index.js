//引入Vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'


Vue.use(Vuex)

//引入state
import state from './state'
//引入mutations
import mutations from './mutations'
//引入actions
import actions from './actions'
//引入getters
import getters from './getters'

import modules from './modules'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})