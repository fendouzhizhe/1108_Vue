import {reqAddToCart} from '@/api'


const state={
  //用户信息数据
  shopcartList:[],
}
const mutations={}
const actions={
  async addToCart({commit},{skuId,skuNum}){
    const result=await reqAddToCart(skuId,skuNum)
    if(result.code===200){
      //添加成功
      // console.log('111');
      
    }else{
      //添加失败
      // console.log('222');

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