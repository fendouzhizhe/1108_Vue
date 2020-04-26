//引入接口
import {reqProductList} from '@/api'

const state={
  //所搜商品数据对象
  productList:{}
}
const mutations={
  //直接修改状态数据
  RECEIVE_PRODUCT_LIST(state,productList){
    state.productList=productList
  }
}
const actions={
  async getProductList({commit},searchParams){
    //发送异步请求
    const result=await reqProductList(searchParams)
    if(result.code===200){
      commit('RECEIVE_PRODUCT_LIST',result.data)
    }
  }
}
const getters={
  //品牌列表数据
  trademarkList(state){
    return state.productList.trademarkList
  },
  //属性列表数据
  attrsList(state){
    return state.productList.attrsList
  },
  //商品列表数据
  goodsList(state){
    return state.productList.goodsList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}