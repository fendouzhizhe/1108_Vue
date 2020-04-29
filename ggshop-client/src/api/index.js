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

//获取购物车列表接口
export const reqCartList=()=>ajax.get(`/cart/cartList`)

//指定购物车中的商品项选中状态
export const reqCheckCartItem=()=>ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)

//删除购物车商品
export const reqDeleteCartItem=()=>ajax.delete(`/cart/deleteCart/${skuId}`)
