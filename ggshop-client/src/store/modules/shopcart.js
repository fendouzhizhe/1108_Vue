import {reqAddToCart,reqCartList,reqCheckCartItem,reqDeleteCartItem} from '@/api'


const state={
  //用户信息数据
  shopCartList:[],
}
const mutations={
  RECEIVE_SHOP_CART_LIST(state,shopCartList){
    state.shopCartList=shopCartList
  }
}
const actions={
  async addToCart({commit},{skuId,skuNum}){
    const result=await reqAddToCart(skuId,skuNum)
    return result.code===200?'':(result.message||'添加购物车失败')
  },
  //获取购物车商品数据
  async getShopCartList({commit}){
    const result=await reqCartList()
    if(result.code===200){
      commit('RECEIVE_SHOP_CART_LIST',result.data)
    }
  },
  //删除购物车的某一项
  async deleteCartItem({commit},skuId){
    const result=await reqDeleteCartItem(skuId)
    return result.code===200?'':result.message||'删除失败'
  },
  async deleteCartItem2({commit},skuId){
    const result=await reqDeleteCartItem(skuId)
    // return result.code===200?'':result.message||'删除失败'
    if(result.code!==200){
      //删除失败
      throw new Error('删除购物项失败')
      // return Promise.reject(new Error('删除购物项失败'))
    }
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
const getters={
  //计算商品总数量
  totalCount(state){
    // return state.shopCartList.reduce((pre,item)=>{
    //   if(item.isChecked===1){
    //     return pre+item.skuNum
    //   }else{
    //     return pre
    //   }
    // },0)
    return state.shopCartList.reduce((pre,item)=>{
      return item.isChecked===1?pre+item.skuNum:pre
    },0)
    
  },
  //计算商品总价格
  totalPrice(state){
    return state.shopCartList.reduce((pre,item)=>{
      return item.isChecked===1?(pre+item.skuPrice*item.skuNum):pre
    },0)
  },
  //商品是否全选
  isAllCheck(state){
    return state.shopCartList.length>0 && state.shopCartList.every(item=>item.isChecked===1)
  },
  //获取删除的购物项
  selectedCartItems(state){
    // let cartItems=[]
    // state.shopCartList.forEach(item=>{
    //   if(item.isChecked===1){
    //     cartItems.push(item)
    //   }
    // })
    // return cartItems

    // return state.shopCartList.reduce((pre,item)=>{
    //   if(item.isChecked===1){
    //     pre.push(item)
    //   }else{
    //     return pre
    //   }
    // },[])

    return state.shopCartList.filter(item=>item.isChecked===1)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}