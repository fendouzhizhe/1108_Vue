//发送请求
import {reqBaseCategoryList,reqLogin} from '@/api'

const state={
  //所有三级分类信息数据
  baseCategoryList:[],
}
const mutations={
  //直接修改三级分类数据
  RECEIVE_BASE_CATEGORY_LIST(state,baseCategoryList){
    state.baseCategoryList=baseCategoryList
  },
}
const actions={
  async getBaseCategoryList({commit}){
    const result=await reqBaseCategoryList()
    if(result.code===200){
      commit('RECEIVE_BASE_CATEGORY_LIST',result.data)
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