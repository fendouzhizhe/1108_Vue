//引入axios
import ajax from "./ajax";

import mockAjax from "./mockAjax";

//http://47.93.148.192/api/product/getBaseCategoryList
//三级分来数据信息
export const reqBaseCategoryList = () =>
  ajax(
    "/product/getBaseCategoryList"
  );
//登录接口
export const reqLogin = (
  mobile,
  password
) =>
  ajax.post(
    "/user/passport/login",
    { mobile, password }
  );

//mock相关接口
export const reqBanners = () =>
  mockAjax.get("/banners");
export const reqFloors = () =>
  mockAjax.get("/floors");

//获取搜索数据的接口
export const reqProductList=(searchParams)=>ajax.post('/list',searchParams)


// 获取商品详情的接口
export const reqDetailInfo = (skuId)=>ajax.get(`/item/${skuId}`)

//添加购物车
export const reqAddToCart=(skuId,skuNum)=>ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 获取购物车数据列表接口
export const reqCartList = ()=>ajax.get(`/cart/cartList`)
// 指定购物车中商品项选中状态接口
export const reqCheckCartItem = (skuId,isChecked)=>ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
// 删除购物车商品接口
export const reqDeleteCartItem =(skuId)=>ajax.delete(`/cart/deleteCart/${skuId}`)


// 注册接口
export const reqRegister = (userInfo) => ajax.post('/user/passport/register', userInfo)
// 退出接口
export const reqLogout = () => ajax.get('/user/passport/logout')


// 获取订单页详情信息接口
export const reqTradeInfo = () => ajax.get(`/order/auth/trade`)

// 提交订单信息接口
export const reqSubmitOrder = (tradeNo, orderInfo) => ajax({
  method: 'POST',
  url: `/order/auth/submitOrder`,
  params: { tradeNo },
  data: orderInfo
})

// 获取订单支付信息接口
export const reqPayInfo = (orderId) => ajax.get(`/payment/weixin/createNative/${orderId}`)

// 查询支付订单状态接口
export const reqOrderStatus = (orderId) => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)
// 获取我的订单列表接口
export const reqMyOrders = (page, limit) => ajax.get(`/order/auth/${page}/${limit}`)

