//发送请求
import {reqBaseCategoryList,reqLogin,reqBanners,reqFloors} from '@/api'

const state={
  //所有三级分类信息数据
  baseCategoryList:[],
  banners:[],
  floors:[]
}
const mutations={
  //直接修改三级分类数据
  RECEIVE_BASE_CATEGORY_LIST(state,baseCategoryList){
    state.baseCategoryList=baseCategoryList.splice(0,baseCategoryList.length-1)
  },
  //修改大轮播图数据
  RECEIVE_BANNERS(state,banners){
    state.banners=banners
  },
  RECEIVE_FLOORS(state,floors){
    state.floors=floors
  },
}
const actions={
  async getBaseCategoryList({commit}){
    const result=await reqBaseCategoryList()
    if(result.code===200){
      commit('RECEIVE_BASE_CATEGORY_LIST',result.data)
    }
  },
  async getBanners({commit}){
    const result=await reqBanners()
    if(result.code===200){
      commit('RECEIVE_BANNERS',result.data)
    }
  },
  async getFloors({commit}){
    const result=await reqFloors()
    if(result.code===200){
      commit('RECEIVE_FLOORS',result.data)
    }
  },
}
const getters={}

export default {
  state,
  mutations,
  actions,
  getters
}