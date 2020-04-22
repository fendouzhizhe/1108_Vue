//引入axios
import ajax from "./ajax";

//http://47.93.148.192/api/product/getBaseCategoryList
//三级分来数据信息
export const reqBaseCategoryList=()=>ajax('/product/getBaseCategoryList')
//登录接口
export const reqLogin=(mobile,password)=>ajax.post('/user/passport/login',{mobile,password})



