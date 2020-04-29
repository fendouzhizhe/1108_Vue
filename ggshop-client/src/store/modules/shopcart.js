import {reqAddToCart} from '@/api'


const state={
  //用户信息数据
  shopcartList:[],
}
const mutations={}
const actions={
  async addToCart({commit},{skuId,skuNum}){
    const result=await reqAddToCart(skuId,skuNum)
    return result.code===200?'':(result.message||'添加购物车失败')
  }
}
// const actions={
//   async addToCart({commit},{skuId,skuNum,callback}){
//     const result=await reqAddToCart(skuId,skuNum)
//     if(result.code===200){
//       //添加成功
//       // console.log('111');
//       callback('')
      
//     }else{
//       //添加失败
//       // console.log('222');
//       callback(result.message||'添加购物车失败了')

//     }
//   }
// }
const getters={}

export default {
  state,
  mutations,
  actions,
  getters
}