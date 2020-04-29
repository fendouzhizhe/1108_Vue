//引入首页组件
import Home from '@/pages/Home'
//引入注册组件
import Register from '@/pages/Register'
//引入登录组件
import Login from '@/pages/Login'
//引入搜索组件
import Search from '@/pages/Search'
//引入Detail
import Detail from '@/pages/Detail'
//引入
import AddCartSuccess from '@/pages/AddCartSuccess'

import ShopCart from '@/pages/ShopCart'

export default [
  //首页路由
  {
    path:'/',
    component:Home
  },
  //注册路由
  {
    path:'/register',
    component:Register,
    meta: {
      isHideFooter:true
    }
  },
  //登录路由
  {
    path:'/login',
    component:Login,
    meta: {
      isHideFooter:true
    }
  },
  //搜索路由
  {
    name:'search',
    path:'/search/:keyword?', 
    component:Search
  },
  //Detail路由
  {
    name:'Detail',
    path:'/Detail/:skuId', 
    component:Detail
  },
  //添加路由
  {
    path:'/addcartsuccess', 
    component:AddCartSuccess
  },
  //购物车路由
  {
    path:'/shopcart', 
    component:ShopCart
  },
  //重定向路由
  {
    path:'/',
    redirect:'/'
  }
]