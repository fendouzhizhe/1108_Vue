// 引入接口
import { reqDetailInfo } from '@/api'
const state = {
  // 商品详情信息
  detailInfo: {}
}
const mutations = {
  // 直接修改商品信息
  RECEIVE_DETAIL_INFO (state, detailInfo) {
    state.detailInfo = detailInfo
  }
}
const actions = {
  // 发送异步请求
  async getDetailInfo ({ commit }, skuId) {
    const result = await reqDetailInfo(skuId)
    if (result.code === 200) {
      commit('RECEIVE_DETAIL_INFO', result.data)
    }
  }
}
const getters = {
  // 返回三级分类
  categoryView(state){
    const categoryView=state.detailInfo.categoryView
    return categoryView?categoryView:{}
  },
  // 返回商品sku
  skuInfo(state){
    const skuInfo=state.detailInfo.skuInfo
    return skuInfo?skuInfo:{}
  },
  // 返回商品的轮播图
  skuImageList(state){
    const skuInfo=state.detailInfo.skuInfo
    return skuInfo?skuInfo.skuImageList:[]
  },
  // 返回商品SPU
  spuSaleAttrList(state){
    const spuSaleAttrList=state.detailInfo.spuSaleAttrList
    return spuSaleAttrList?spuSaleAttrList:[]
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}